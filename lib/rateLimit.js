// In-memory sliding-window rate limiter for Next.js API routes

const ipHits = new Map()

// Cleanup old entries every 5 minutes to prevent memory accumulation
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, record] of ipHits.entries()) {
      if (now > record.resetTime) {
        ipHits.delete(key)
      }
    }
  }, 5 * 60 * 1000)
}

export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const cfIp = request.headers.get('cf-connecting-ip')
  if (cfIp) return cfIp
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp
  return '127.0.0.1'
}

/**
 * Check rate limit for a request
 * @param {Request} request 
 * @param {Object} options { limit: number, windowMs: number, keyPrefix: string }
 * @returns {Object} { allowed: boolean, remaining: number, resetTime: number }
 */
export function checkRateLimit(request, options = {}) {
  const {
    limit = 10,
    windowMs = 60 * 1000, // 1 minute
    keyPrefix = 'general',
  } = options

  const ip = getClientIp(request)
  const key = `${keyPrefix}:${ip}`
  const now = Date.now()

  const current = ipHits.get(key)

  if (!current || now > current.resetTime) {
    ipHits.set(key, {
      count: 1,
      resetTime: now + windowMs,
    })
    return { allowed: true, remaining: limit - 1, resetTime: now + windowMs }
  }

  if (current.count < limit) {
    current.count += 1
    return { allowed: true, remaining: limit - current.count, resetTime: current.resetTime }
  }

  const retryAfterSec = Math.ceil((current.resetTime - now) / 1000)
  return { allowed: false, remaining: 0, retryAfterSec, resetTime: current.resetTime }
}

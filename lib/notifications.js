// Lead notification handler (SMTP / Nodemailer, Resend API, Webhooks)
import nodemailer from 'nodemailer'

/**
 * Dispatch real-time lead notification to configured email services or webhooks
 * @param {Object} lead - Sanitized lead record
 */
export async function sendLeadNotification(lead) {
  try {
    const rawEmails = process.env.NOTIFICATION_EMAIL_TO || 'prakash@ivrenergy.com, sunil@ivrenergy.com'
    const notifyEmails = rawEmails.split(',').map((e) => e.trim()).filter(Boolean)

    const rawPhone = String(lead.phone || '').replace(/[^0-9+]/g, '')
    const cleanPhoneForWa = rawPhone.startsWith('+91') ? rawPhone.slice(3) : (rawPhone.startsWith('91') && rawPhone.length > 10) ? rawPhone.slice(2) : rawPhone
    const waLink = `https://wa.me/91${cleanPhoneForWa}?text=Hello%20${encodeURIComponent(lead.name || 'Sir/Madam')}%2C%20thank%20you%20for%20contacting%20IVR%20Energy%20regarding%20your%20solar%20inquiry.`

    const title = `☀️ New Solar Lead: ${lead.name || 'Anonymous'}`
    const details = [
      `👤 Name: ${lead.name || '—'}`,
      `📞 Phone: ${lead.phone || '—'}`,
      `✉️ Email: ${lead.email || '—'}`,
      `📍 City: ${lead.city || '—'}`,
      `⚡ Interest: ${lead.interest || lead.type || 'Solar Inquiry'}`,
      lead.monthlyBill ? `💰 Monthly Bill: ₹${Number(lead.monthlyBill).toLocaleString('en-IN')}` : null,
      lead.systemSize ? `🔋 System Size: ${lead.systemSize} kW` : null,
      lead.roofArea ? `🏠 Roof Area: ${lead.roofArea} sq.ft.` : null,
      lead.message ? `💬 Message: ${lead.message}` : null,
      `⏰ Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
    ].filter(Boolean).join('\n')

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Solar Lead Alert</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="max-width: 620px; margin: 24px auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
          
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, #111111 0%, #1f1f23 60%, #D71920 100%); padding: 32px 28px; text-align: center; color: #ffffff;">
            <div style="display: inline-block; padding: 6px 16px; background: rgba(215,25,32,0.25); border: 1px solid rgba(215,25,32,0.5); border-radius: 100px; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #ff6b6b; margin-bottom: 12px;">
              ⚡ NEW WEBSITE INQUIRY
            </div>
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
              IVR Energy Lead Alert
            </h1>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #d1d5db;">
              Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })} (IST)
            </p>
          </div>

          <!-- Main Content Body -->
          <div style="padding: 28px;">

            <!-- Customer Quick Action Card -->
            <div style="background: #fafafa; border: 1px solid #eaeaea; border-left: 5px solid #D71920; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <div style="font-size: 11px; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 1px;">Customer Contact</div>
              <div style="font-size: 20px; font-weight: 800; color: #111827; margin-top: 4px;">
                ${lead.name || 'Anonymous Customer'}
              </div>
              <div style="margin-top: 14px; display: flex; flex-wrap: wrap; gap: 10px;">
                <a href="tel:${lead.phone}" style="display: inline-block; background-color: #D71920; color: #ffffff; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 13px; text-decoration: none; margin-right: 8px; margin-bottom: 8px;">
                  📞 Call: ${lead.phone}
                </a>
                <a href="${waLink}" style="display: inline-block; background-color: #25D366; color: #ffffff; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 13px; text-decoration: none; margin-bottom: 8px;">
                  💬 WhatsApp
                </a>
              </div>
            </div>

            <!-- Detailed Specifications Table -->
            <table style="width: 100%; border-collapse: separate; border-spacing: 0; border: 1px solid #edf0f2; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
              <tr style="background-color: #f8fafc;">
                <th colspan="2" style="padding: 12px 18px; text-align: left; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; color: #475569; border-bottom: 1px solid #edf0f2;">
                  Lead Specification & Details
                </th>
              </tr>
              <tr>
                <td style="padding: 14px 18px; font-size: 13px; color: #64748b; font-weight: 600; width: 38%; border-bottom: 1px solid #edf0f2;">
                  Phone Number
                </td>
                <td style="padding: 14px 18px; font-size: 14px; color: #111827; font-weight: 700; border-bottom: 1px solid #edf0f2;">
                  <a href="tel:${lead.phone}" style="color: #D71920; text-decoration: none;">${lead.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 14px 18px; font-size: 13px; color: #64748b; font-weight: 600; border-bottom: 1px solid #edf0f2;">
                  Email Address
                </td>
                <td style="padding: 14px 18px; font-size: 14px; color: #111827; border-bottom: 1px solid #edf0f2;">
                  ${lead.email ? `<a href="mailto:${lead.email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${lead.email}</a>` : '<span style="color: #9ca3af;">Not provided</span>'}
                </td>
              </tr>
              <tr>
                <td style="padding: 14px 18px; font-size: 13px; color: #64748b; font-weight: 600; border-bottom: 1px solid #edf0f2;">
                  City / Location
                </td>
                <td style="padding: 14px 18px; font-size: 14px; color: #111827; font-weight: 700; border-bottom: 1px solid #edf0f2;">
                  📍 ${lead.city || 'Tamil Nadu'}
                </td>
              </tr>
              <tr>
                <td style="padding: 14px 18px; font-size: 13px; color: #64748b; font-weight: 600; border-bottom: 1px solid #edf0f2;">
                  Solar Interest
                </td>
                <td style="padding: 14px 18px; font-size: 14px; color: #D71920; font-weight: 700; border-bottom: 1px solid #edf0f2;">
                  ⚡ ${lead.interest || lead.type || 'General Solar Inquiry'}
                </td>
              </tr>
              ${lead.monthlyBill ? `
              <tr>
                <td style="padding: 14px 18px; font-size: 13px; color: #64748b; font-weight: 600; border-bottom: 1px solid #edf0f2;">
                  Monthly EB Bill
                </td>
                <td style="padding: 14px 18px; font-size: 14px; color: #059669; font-weight: 800; border-bottom: 1px solid #edf0f2;">
                  ₹${Number(lead.monthlyBill).toLocaleString('en-IN')} / month
                </td>
              </tr>` : ''}
              ${lead.systemSize ? `
              <tr>
                <td style="padding: 14px 18px; font-size: 13px; color: #64748b; font-weight: 600; border-bottom: 1px solid #edf0f2;">
                  System Capacity
                </td>
                <td style="padding: 14px 18px; font-size: 14px; color: #111827; font-weight: 700; border-bottom: 1px solid #edf0f2;">
                  🔋 ${lead.systemSize} kW
                </td>
              </tr>` : ''}
              ${lead.roofArea ? `
              <tr>
                <td style="padding: 14px 18px; font-size: 13px; color: #64748b; font-weight: 600; border-bottom: 1px solid #edf0f2;">
                  Roof Area
                </td>
                <td style="padding: 14px 18px; font-size: 14px; color: #111827; font-weight: 600; border-bottom: 1px solid #edf0f2;">
                  🏠 ${lead.roofArea} sq.ft.
                </td>
              </tr>` : ''}
              <tr>
                <td style="padding: 14px 18px; font-size: 13px; color: #64748b; font-weight: 600; vertical-align: top;">
                  Inquiry Note / Message
                </td>
                <td style="padding: 14px 18px; font-size: 13.5px; color: #334155; line-height: 1.5; font-style: italic;">
                  "${lead.message || 'No additional message provided.'}"
                </td>
              </tr>
            </table>

            <!-- Admin Access Footer Callout -->
            <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 18px; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 12.5px; color: #64748b; font-weight: 600;">
                This inquiry has been saved to your central CRM database.
              </p>
              <a href="https://ivrenergy.com/adminivr" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 10px 20px; border-radius: 8px; font-size: 12.5px; font-weight: 700; text-decoration: none;">
                🛡️ Open Admin CRM Dashboard
              </a>
            </div>

          </div>

          <!-- Email Footer -->
          <div style="background-color: #111827; padding: 22px 28px; text-align: center; color: #9ca3af; font-size: 12px; line-height: 1.6;">
            <div style="font-weight: 700; color: #ffffff; font-size: 13px; margin-bottom: 4px;">
              IVR ENERGY SOLAR EPC SOLUTIONS
            </div>
            <div>Engineering, Procurement & Commissioning • Tamil Nadu, India</div>
            <div style="margin-top: 8px; color: #6b7280; font-size: 11px;">
              Confidential notification for authorized recipients (${notifyEmails.join(', ')}).
            </div>
          </div>

        </div>
      </body>
      </html>
    `

    // 1. Send via SMTP (Nodemailer) if SMTP credentials are provided
    const smtpHost = process.env.SMTP_HOST
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpPort = Number(process.env.SMTP_PORT) || 465

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        })

        await transporter.sendMail({
          from: `"IVR Energy Lead Alerts" <${smtpUser}>`,
          to: notifyEmails.join(', '),
          subject: `☀️ New Solar Lead: ${lead.name || 'Website Inquiry'} (${lead.city || 'Tamil Nadu'})`,
          text: details,
          html: htmlTemplate,
        })
        console.log(`✅ SMTP Email dispatched successfully to: ${notifyEmails.join(', ')}`)
      } catch (smtpErr) {
        console.error('❌ SMTP Email sending error:', smtpErr.message)
      }
    }

    // 2. Send via Resend API (if RESEND_API_KEY is provided)
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey && notifyEmails.length > 0) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'IVR Energy <onboarding@resend.dev>',
            to: notifyEmails,
            subject: `☀️ New Solar Lead: ${lead.name || 'Website Inquiry'} (${lead.city || 'Tamil Nadu'})`,
            html: htmlTemplate,
          }),
        })
        if (!resendRes.ok) {
          const errData = await resendRes.json()
          console.error('❌ Resend API response error:', errData)
        } else {
          console.log(`✅ Resend API Email dispatched to: ${notifyEmails.join(', ')}`)
        }
      } catch (resendErr) {
        console.error('❌ Resend Email error:', resendErr.message)
      }
    }

    // 3. Send via Webhook (Discord / Slack / CRM)
    const webhookUrl = process.env.LEAD_NOTIFICATION_WEBHOOK || process.env.DISCORD_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL
    if (webhookUrl) {
      const isDiscord = webhookUrl.includes('discord.com')
      let payload = { text: `${title}\n\n${details}` }

      if (isDiscord) {
        payload = {
          content: `🚨 **NEW SOLAR LEAD RECEIVED** 🚨\n${details}`,
          embeds: [
            {
              title: `${lead.name} — ${lead.interest || 'Solar Lead'}`,
              color: 0xd71920,
              fields: [
                { name: 'Phone', value: lead.phone || '—', inline: true },
                { name: 'City', value: lead.city || '—', inline: true },
                { name: 'Monthly Bill', value: lead.monthlyBill ? `₹${lead.monthlyBill}` : '—', inline: true },
                { name: 'Message', value: lead.message || '—', inline: false },
              ],
              footer: { text: 'IVR Energy Lead Alert' },
              timestamp: new Date().toISOString(),
            },
          ],
        }
      }

      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((err) => console.error('Webhook dispatch error:', err.message))
    }
  } catch (err) {
    console.error('sendLeadNotification top-level error:', err)
  }
}

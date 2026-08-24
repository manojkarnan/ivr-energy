'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sun, Zap, ArrowRight, Phone, Calculator, Smartphone, ShieldCheck,
  IndianRupee, Ruler, Clock, Leaf, TreePine, TrendingUp, Sparkles,
  ChevronRight, PhoneCall, BarChart3, ArrowDown, Award, CheckCircle2,
  HelpCircle, RefreshCw, Layers, BatteryCharging, Factory, Building2, Home
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedHero from '@/components/ui/animated-hero'

/* ─── Constants & Rates ─── */
const COST_PER_KW = {
  residential: 58000,
  commercial: 48000,
  industrial: 42000,
}

const PROPERTY_TYPES = [
  {
    id: 'residential',
    title: 'Residential',
    desc: 'Villas, Apartments, Homes',
    icon: Home,
    badge: 'PM Surya Ghar Subsidy Eligible',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'commercial',
    title: 'Commercial',
    desc: 'Offices, Hospitals, Schools',
    icon: Building2,
    badge: '40% Accelerated Depreciation',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'industrial',
    title: 'Industrial',
    desc: 'Factories, Warehouses, Mills',
    icon: Factory,
    badge: 'Maximum Unit Savings',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
]

const BILL_PRESETS = [
  { label: '₹2,500', value: 2500 },
  { label: '₹5,000', value: 5000 },
  { label: '₹10,000', value: 10000 },
  { label: '₹25,000', value: 25000 },
  { label: '₹50,000+', value: 50000 },
]

const FEATURES = [
  {
    icon: Calculator,
    title: 'Accurate Tier-1 Modeling',
    desc: 'Calibrated specifically for South Indian irradiation curves, temperature coefficients, and high-efficiency Mono PERC modules.',
    color: 'bg-red-50 text-[#D71920]',
  },
  {
    icon: Zap,
    title: 'PM Surya Ghar Scheme',
    desc: 'Integrated national subsidy formulas offering up to ₹78,000 direct bank transfer assistance for homeowners.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: ShieldCheck,
    title: '25-Year Life Expectancy',
    desc: 'Performance-backed warranty guaranteeing >80% power yield at Year 25 with micro-inverter & string inverter options.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Smartphone,
    title: 'Instant WhatsApp Quote',
    desc: 'Transfer your system size & savings directly to our engineering team for site shadow survey and 3D CAD design.',
    color: 'bg-blue-50 text-blue-600',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Input Consumption',
    desc: 'Enter your monthly electricity bill, roof area, and select your property category.',
  },
  {
    num: '02',
    title: 'Instant ROI & Sizing',
    desc: 'Get precise kW sizing, estimated subsidy deduction, monthly savings, and payback timeline.',
  },
  {
    num: '03',
    title: 'Free Site Survey',
    desc: 'Our certified solar engineers visit your premises for structural roof audit and DISCOM liaison.',
  },
]

/* ─── Currency Formatter ─── */
function formatCurrency(val) {
  if (val == null || isNaN(val)) return '₹0'
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`
  return `₹${Math.round(val).toLocaleString('en-IN')}`
}

export default function SolarCalculator() {
  const [content, setContent] = useState(null)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const resultsRef = useRef(null)

  /* ─── Inputs ─── */
  const [monthlyBill, setMonthlyBill] = useState(4500)
  const [propertyType, setPropertyType] = useState('residential')
  const [electricityRate, setElectricityRate] = useState([8.5])
  const [roofArea, setRoofArea] = useState(500)
  const [sunlightHours, setSunlightHours] = useState([5.2])
  const [activeTab, setActiveTab] = useState('financials')

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch('/api/content')
      .then((r) => r.json())
      .then((j) => setContent(j.content))
      .catch(() => {})

    const handleScroll = () => {
      const y = window.scrollY
      if (y > lastScrollY.current && y > 80) setVisible(false)
      else setVisible(true)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const phoneDisplay = content?.contact?.phone || '+91 90477 77936'
  const phoneRaw = content?.contact?.phoneRaw || '919047777936'

  /* ─── Calculation Logic ─── */
  const calcData = useMemo(() => {
    const bill = Number(monthlyBill) || 0
    const roof = Number(roofArea) || 100
    const rate = electricityRate[0] || 8
    const sun = sunlightHours[0] || 5

    if (bill <= 0) return null

    const monthlyUnits = bill / rate
    const dailyUnits = monthlyUnits / 30
    let neededKW = dailyUnits / (sun * 0.82)

    // Max capacity by roof (approx 80-100 sq.ft per kW)
    const maxRoofKW = roof / 90
    let systemKW = Math.min(neededKW, maxRoofKW)
    systemKW = Math.max(systemKW, 1)
    systemKW = Math.round(systemKW * 10) / 10

    // Panel count (assuming 550W Mono-PERC panels)
    const panelWattage = 550
    const panelCount = Math.ceil((systemKW * 1000) / panelWattage)

    // Gross Cost
    const costPerKW = COST_PER_KW[propertyType] || 55000
    const grossCost = Math.round(systemKW * costPerKW)

    // PM Surya Ghar Central Government Subsidy (Residential Only)
    let subsidy = 0
    if (propertyType === 'residential') {
      if (systemKW <= 1) {
        subsidy = 30000
      } else if (systemKW <= 2) {
        subsidy = 60000
      } else {
        subsidy = 78000
      }
      subsidy = Math.min(subsidy, grossCost * 0.5)
    }

    const netCost = Math.max(grossCost - subsidy, 0)
    
    // Monthly & Annual Savings (accounting for 85-90% bill elimination)
    const monthlyGenUnits = systemKW * sun * 30 * 0.82
    const monthlySavings = Math.round(Math.min(monthlyGenUnits * rate, bill * 0.92))
    const annualSavings = monthlySavings * 12

    // Payback
    const paybackYears = annualSavings > 0 ? (netCost / annualSavings).toFixed(1) : '3.5'

    // 25-Year Cumulative Savings (with 3% yearly grid tariff escalation)
    let savings25 = 0
    let currentAnnual = annualSavings
    for (let yr = 1; yr <= 25; yr++) {
      savings25 += currentAnnual
      currentAnnual *= 1.03 // 3% annual inflation in grid tariff
    }
    savings25 = Math.round(savings25)

    // Environmental offsets
    const annualUnitsGenerated = systemKW * sun * 365 * 0.82
    const co2TonnesPerYear = ((annualUnitsGenerated * 0.82) / 1000).toFixed(1)
    const treesEquivalent = Math.round(co2TonnesPerYear * 16)
    const coalSavedKg = Math.round(annualUnitsGenerated * 0.4)

    return {
      systemKW,
      panelCount,
      grossCost,
      subsidy,
      netCost,
      monthlySavings,
      annualSavings,
      paybackYears,
      savings25,
      co2TonnesPerYear,
      treesEquivalent,
      coalSavedKg,
      monthlyUnits: Math.round(monthlyUnits),
    }
  }, [monthlyBill, propertyType, electricityRate, roofArea, sunlightHours])

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="min-h-screen bg-[#fafafa] font-sans antialiased text-neutral-900 selection:bg-[#D71920] selection:text-white">
      <Navbar content={content} />

      {/* ═══════════════ 21ST.DEV ANIMATED HERO ═══════════════ */}
      <AnimatedHero
        badgeText="Next-Gen Solar Intelligence • Instant Free Estimate"
        title="Solar Savings"
        highlightText="Calculator"
        description="Estimate your rooftop solar system size, PM Surya Ghar subsidy, monthly savings, and 25-year financial returns in real time."
        ctaTarget="#calculator-tool"
        ctaText="Calculate My Savings"
      />

      {/* ═══════════════ MAIN CALCULATOR TOOL ═══════════════ */}
      <section
        id="calculator-tool"
        aria-label="Solar Savings Calculation Studio"
        className="relative py-12 md:py-20 -mt-8 z-20"
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          
          {/* Main Studio Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ── Left Column: Configurator Form ── */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-neutral-200/80">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-6 mb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#D71920] text-xs font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="h-3.5 w-3.5" /> Step 1 of 2
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-heading">
                      Configure Your Setup
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setMonthlyBill(4500)
                      setPropertyType('residential')
                      setElectricityRate([8.5])
                      setRoofArea(500)
                      setSunlightHours([5.2])
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-[#D71920] transition-colors p-2 rounded-xl hover:bg-neutral-50"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Reset
                  </button>
                </div>

                <div className="space-y-8">
                  {/* 1. Property Type Selector */}
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-neutral-800 flex items-center justify-between">
                      <span>1. Property Category</span>
                      <span className="text-xs font-medium text-neutral-400">Select installation type</span>
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {PROPERTY_TYPES.map((type) => {
                        const Icon = type.icon
                        const isSelected = propertyType === type.id
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setPropertyType(type.id)}
                            className={`flex flex-col text-left p-4 rounded-2xl border-2 transition-all duration-200 relative overflow-hidden ${
                              isSelected
                                ? 'border-[#D71920] bg-red-50/20 shadow-md ring-2 ring-[#D71920]/10'
                                : 'border-neutral-200/80 bg-white hover:border-neutral-300 hover:bg-neutral-50/50'
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute top-2 right-2">
                                <CheckCircle2 className="h-4 w-4 text-[#D71920]" />
                              </div>
                            )}
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${isSelected ? 'bg-[#D71920] text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="font-bold text-neutral-900 text-sm">{type.title}</span>
                            <span className="text-[11px] text-neutral-500 mt-0.5 leading-tight">{type.desc}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* 2. Monthly Electricity Bill */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="monthly-bill-input" className="text-sm font-bold text-neutral-800 flex items-center gap-2">
                        <span>2. Average Monthly Electricity Bill</span>
                      </Label>
                      <span className="text-base font-extrabold text-[#D71920] bg-red-50 px-3 py-1 rounded-full border border-red-100">
                        ₹{Number(monthlyBill).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold text-lg">₹</span>
                      <Input
                        id="monthly-bill-input"
                        type="number"
                        min="500"
                        step="500"
                        value={monthlyBill}
                        onChange={(e) => setMonthlyBill(Math.max(0, Number(e.target.value)))}
                        className="pl-9 h-14 rounded-2xl border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-[#D71920] focus:ring-[#D71920]/20 text-lg font-bold text-neutral-900"
                      />
                    </div>

                    {/* Quick Presets */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs text-neutral-400 font-medium mr-1">Quick Select:</span>
                      {BILL_PRESETS.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setMonthlyBill(preset.value)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                            monthlyBill === preset.value
                              ? 'bg-neutral-900 text-white border-neutral-900'
                              : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Roof Area & Rate Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    
                    {/* Available Roof Area */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="roof-input" className="text-sm font-bold text-neutral-800 flex items-center gap-1.5">
                          <Ruler className="h-4 w-4 text-emerald-600" />
                          <span>3. Roof Area</span>
                        </Label>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                          {roofArea} sq ft
                        </span>
                      </div>
                      <div className="relative">
                        <Input
                          id="roof-input"
                          type="number"
                          min="50"
                          step="50"
                          value={roofArea}
                          onChange={(e) => setRoofArea(Math.max(50, Number(e.target.value)))}
                          className="h-12 rounded-2xl border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-emerald-600 font-semibold pr-16"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400">sq. ft.</span>
                      </div>
                      <p className="text-[11px] text-neutral-400">Approx. 90-100 sq.ft required per 1kW solar capacity.</p>
                    </div>

                    {/* Electricity Tariff */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-bold text-neutral-800 flex items-center gap-1.5">
                          <Zap className="h-4 w-4 text-blue-600" />
                          <span>4. Tariff Rate</span>
                        </Label>
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                          ₹{electricityRate[0]}/unit
                        </span>
                      </div>
                      <div className="pt-3">
                        <Slider
                          value={electricityRate}
                          onValueChange={setElectricityRate}
                          min={4}
                          max={16}
                          step={0.5}
                          className="py-1"
                        />
                        <div className="flex justify-between text-[11px] text-neutral-400 font-medium mt-1">
                          <span>₹4/unit</span>
                          <span>DISCOM Avg: ₹8.5</span>
                          <span>₹16/unit</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* 5. Daily Sunlight Hours */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-bold text-neutral-800 flex items-center gap-1.5">
                        <Sun className="h-4 w-4 text-amber-500" />
                        <span>5. Peak Sunlight Exposure</span>
                      </Label>
                      <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
                        {sunlightHours[0]} Hours / Day
                      </span>
                    </div>
                    <Slider
                      value={sunlightHours}
                      onValueChange={setSunlightHours}
                      min={3}
                      max={7}
                      step={0.1}
                      className="py-1"
                    />
                    <div className="flex justify-between text-[11px] text-neutral-400 font-medium">
                      <span>3.0 hrs (Low)</span>
                      <span>5.2 hrs (Tamil Nadu & South Avg)</span>
                      <span>7.0 hrs (High)</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Subsidies & Incentives Banner */}
              {propertyType === 'residential' && (
                <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-3xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 text-emerald-400">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base sm:text-lg">PM Surya Ghar: Muft Bijli Yojana</h4>
                      <p className="text-xs text-emerald-200 mt-0.5">
                        Eligible for up to <strong className="text-white">₹78,000 direct DBT subsidy</strong> deposited straight to your bank account.
                      </p>
                    </div>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-400/20 px-4 py-2 rounded-xl text-center flex-shrink-0">
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">Deducted Automatically</span>
                    <span className="text-lg font-extrabold text-white">₹{calcData?.subsidy?.toLocaleString('en-IN') || 0}</span>
                  </div>
                </div>
              )}

            </div>

            {/* ── Right Column: Dynamic Live ROI Intelligence Card ── */}
            <div className="lg:col-span-5 sticky top-28 space-y-6">
              
              {calcData ? (
                <div
                  ref={resultsRef}
                  className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-neutral-800 relative overflow-hidden"
                >
                  {/* Subtle Background Red & Amber Orbs */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#D71920]/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Header Title */}
                  <div className="relative z-10 flex items-center justify-between pb-5 border-b border-neutral-800">
                    <div>
                      <span className="text-xs font-semibold text-[#ff6b6b] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#D71920] animate-ping" /> Live Simulation Results
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading mt-1">
                        Recommended System
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-extrabold text-gradient-red">{calcData.systemKW} kW</span>
                      <span className="text-[11px] text-neutral-400 block mt-0.5">~{calcData.panelCount} Solar Panels</span>
                    </div>
                  </div>

                  {/* Key Financial Matrix */}
                  <div className="relative z-10 grid grid-cols-2 gap-3 my-6">
                    
                    {/* Monthly Savings */}
                    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] transition-colors">
                      <div className="flex items-center gap-2 text-neutral-400 text-xs font-medium mb-1">
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Monthly Savings</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">
                        {formatCurrency(calcData.monthlySavings)}
                      </div>
                      <span className="text-[10px] text-neutral-400 mt-1 block">~90% bill reduction</span>
                    </div>

                    {/* Annual Savings */}
                    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] transition-colors">
                      <div className="flex items-center gap-2 text-neutral-400 text-xs font-medium mb-1">
                        <IndianRupee className="h-3.5 w-3.5 text-amber-400" />
                        <span>Annual Savings</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-extrabold text-amber-400">
                        {formatCurrency(calcData.annualSavings)}
                      </div>
                      <span className="text-[10px] text-neutral-400 mt-1 block">Every year directly saved</span>
                    </div>

                    {/* Net Investment */}
                    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] transition-colors">
                      <div className="flex items-center gap-2 text-neutral-400 text-xs font-medium mb-1">
                        <Layers className="h-3.5 w-3.5 text-blue-400" />
                        <span>Net Investment</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-extrabold text-white">
                        {formatCurrency(calcData.netCost)}
                      </div>
                      {calcData.subsidy > 0 && (
                        <span className="text-[10px] text-emerald-400 mt-1 block">Includes ₹{calcData.subsidy.toLocaleString('en-IN')} subsidy</span>
                      )}
                    </div>

                    {/* Payback Period */}
                    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] transition-colors">
                      <div className="flex items-center gap-2 text-neutral-400 text-xs font-medium mb-1">
                        <Clock className="h-3.5 w-3.5 text-purple-400" />
                        <span>ROI Payback</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-extrabold text-purple-400">
                        {calcData.paybackYears} Years
                      </div>
                      <span className="text-[10px] text-neutral-400 mt-1 block">Free power for next 20+ yrs</span>
                    </div>

                  </div>

                  {/* 25-Year Wealth Impact Box */}
                  <div className="relative z-10 p-4 rounded-2xl bg-gradient-to-r from-[#D71920]/20 to-orange-600/10 border border-[#D71920]/30 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff8080]">25-Year Total Return</span>
                        <h4 className="text-2xl font-black text-white mt-0.5">{formatCurrency(calcData.savings25)}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                          +15x ROI
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Environmental Metrics Pills */}
                  <div className="relative z-10 grid grid-cols-3 gap-2 mb-6 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <Leaf className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                      <span className="font-bold text-white block">{calcData.co2TonnesPerYear} T</span>
                      <span className="text-[10px] text-neutral-400">CO₂ Avoided/yr</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <TreePine className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                      <span className="font-bold text-white block">{calcData.treesEquivalent}</span>
                      <span className="text-[10px] text-neutral-400">Trees Equivalent</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <BatteryCharging className="h-4 w-4 text-amber-400 mx-auto mb-1" />
                      <span className="font-bold text-white block">{calcData.coalSavedKg} kg</span>
                      <span className="text-[10px] text-neutral-400">Coal Conserved</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="relative z-10 space-y-3 pt-2">
                    <Button
                      asChild
                      className="w-full h-14 bg-[#D71920] hover:bg-[#b01319] text-white rounded-2xl text-base font-bold shadow-[0_0_30px_rgba(215,25,32,0.4)] transition-all hover:scale-[1.02]"
                    >
                      <Link href="/#contact">
                        Lock This Quote & Get Site Survey <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full h-12 rounded-2xl border-white/20 text-white bg-white/5 hover:bg-white/10 hover:text-white text-sm font-semibold transition-all"
                    >
                      <a
                        href={`https://wa.me/${phoneRaw}?text=Hi%20IVR%20Energy%2C%20I%20used%20your%20interactive%20solar%20calculator.%20My%20details%3A%0A-%20Monthly%20Bill%3A%20%E2%82%B9${monthlyBill}%0A-%20Recommended%20System%3A%20${calcData.systemKW}kW%0A-%20Net%20Estimated%20Cost%3A%20%E2%82%B9${calcData.netCost}%0A-%20Expected%20Annual%20Savings%3A%20%E2%82%B9${calcData.annualSavings}%0APlease%20provide%20a%20formal%20quote.`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Share via WhatsApp to Engineer
                      </a>
                    </Button>
                  </div>

                  <p className="relative z-10 text-[10px] text-neutral-500 text-center mt-4 leading-normal">
                    * Indicative calculation based on MNRE norms and standard 550W Mono PERC modules. Final capacity determined after physical shadow analysis.
                  </p>

                </div>
              ) : null}

            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════ WHY USE OUR CALCULATOR ═══════════════ */}
      <section
        id="calculator-features"
        aria-label="Calculator features"
        className="py-16 md:py-24 bg-white border-t border-neutral-200/60"
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-[#D71920] text-xs font-bold uppercase tracking-wider mb-3">
              Engineering Accuracy
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-neutral-900">
              Why Homeowners & Businesses Trust <span className="text-gradient-red">IVR Energy</span>
            </h2>
            <p className="mt-4 text-neutral-500 text-base sm:text-lg leading-relaxed">
              We design, procure, and install end-to-end solar solutions with Tier-1 components, DISCOM net-metering approvals, and complete government subsidy processing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <Card className="h-full rounded-3xl border-neutral-200/80 bg-neutral-50/50 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all">
                  <CardContent className="p-7">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${f.color} mb-5`}>
                      <f.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900">{f.title}</h3>
                    <p className="mt-2.5 text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section
        id="how-it-works"
        aria-label="How the calculator works"
        className="py-16 md:py-24 bg-[#f8f9fa] border-t border-neutral-200/60"
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-neutral-900">
              Three Easy Steps to <span className="text-gradient-red">Solar Freedom</span>
            </h2>
            <p className="mt-4 text-neutral-500 text-base">
              From estimating your savings to switching on your green power plant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.num} className="relative">
                <Card className="h-full rounded-3xl border-neutral-200/80 bg-white p-7 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 rounded-2xl bg-[#D71920] text-white font-extrabold text-base flex items-center justify-center mb-5 shadow-lg shadow-red-500/20">
                      {s.num}
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900">{s.title}</h3>
                    <p className="mt-2.5 text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section aria-label="Call to action" className="container mx-auto px-4 sm:px-6 py-16 md:py-24 max-w-6xl">
        <div className="bg-gradient-to-br from-neutral-950 via-[#180505] to-neutral-900 rounded-[2.5rem] p-8 sm:p-12 md:p-16 text-white text-center relative overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D71920]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-amber-400" /> Free Technical Assessment
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight">
              Ready to Cut Your Electricity Bill to <span className="text-gradient-red">₹0</span>?
            </h2>
            <p className="mt-5 text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Schedule a free site survey with IVR Energy’s certified solar engineers. We will analyze your rooftop shadow profile, inspect structural feasibility, and provide a 3D CAD design proposal.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild className="w-full sm:w-auto bg-[#D71920] hover:bg-[#b01319] text-white rounded-full px-9 h-14 text-base font-bold shadow-[0_0_30px_rgba(215,25,32,0.5)] transition-all hover:scale-105">
                <Link href="/#contact">Get Your Free Proposal</Link>
              </Button>
              <a
                href={`tel:+${phoneRaw}`}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-neutral-300 hover:text-white px-6 py-3 rounded-full hover:bg-white/5 transition-colors"
              >
                <PhoneCall className="h-4 w-4 text-[#ff5c5c]" /> Direct Call: {phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer content={content} />

      {/* ═══════════════ STICKY BOTTOM CTA (Mobile) ═══════════════ */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={visible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="fixed bottom-0 inset-x-0 z-40 pointer-events-none lg:hidden"
      >
        <div className="mx-auto max-w-md px-4 pb-4 pointer-events-auto">
          <div className="flex items-center justify-between gap-3 bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl">
            <div className="min-w-0 pl-2">
              <span className="text-xs text-neutral-400 block">Calculated System</span>
              <span className="text-sm font-extrabold text-white">{calcData ? `${calcData.systemKW} kW (${formatCurrency(calcData.monthlySavings)}/mo)` : 'Custom Sizing'}</span>
            </div>
            <Button
              asChild
              className="flex-shrink-0 bg-[#D71920] hover:bg-[#b01319] text-white rounded-xl px-5 h-11 text-xs font-bold shadow-glow-red"
            >
              <Link href="/#contact">
                Get Quote <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

    </main>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Introduction() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }

  const handleLogin = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background select-none">
      {/* LEFT HALF - Deep Forest Green Hero (Exact Medora Theme) */}
      <div className="w-full lg:w-1/2 bg-forest relative overflow-hidden flex flex-col justify-between p-8 sm:p-12 lg:p-14 min-h-[440px] lg:min-h-screen text-surface">
        {/* Exact Medora Topographic SVG Pattern */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.09] pointer-events-none"
          viewBox="0 0 800 800"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path d="M0 620 C 150 560, 250 680, 400 600 S 650 480, 800 560" stroke="#FCFBF8" strokeWidth="1.5" fill="none" />
          <path d="M0 700 C 150 640, 280 760, 420 680 S 680 560, 800 640" stroke="#FCFBF8" strokeWidth="1" fill="none" />
          <path d="M0 150 C 200 100, 300 220, 480 140 S 700 60, 800 130" stroke="#FCFBF8" strokeWidth="1" fill="none" />
          <circle cx="620" cy="180" r="120" stroke="#FCFBF8" strokeWidth="0.75" fill="none" />
          <circle cx="620" cy="180" r="180" stroke="#FCFBF8" strokeWidth="0.5" fill="none" />
        </svg>

        {/* Top Header: Logo + Clinical Intelligence Sub-Brand */}
        <div className="relative z-10">
          <Logo size={38} variant="light" />
          <div className="text-surface font-serif text-2xl -mt-1 ml-[42px] opacity-90">
            Clinical Intelligence
          </div>
        </div>

        {/* Center / Middle Content: Welcome Title & Clinical Intelligence Copy */}
        <div className="relative z-10 max-w-md my-auto py-10 lg:py-0">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] text-surface leading-tight mb-4">
            Welcome to <br />
            Medora
          </h1>

          <p className="text-sage text-[14.5px] leading-relaxed">
            MEDORA assists clinicians by analyzing medical imaging, retrieving relevant evidence, and verifying
            AI-generated findings — every draft report awaits your review before it becomes final.
          </p>
        </div>

        {/* Bottom Footer Label */}
        <div className="relative z-10 text-sage/70 text-[12.5px]">
          © 2026 MEDORA. Clinical Intelligence Platform.
        </div>
      </div>

      {/* RIGHT HALF - Soft Linen Warm Background with Subtle Dotted Grid */}
      <div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16 min-h-[500px] lg:min-h-screen relative bg-background"
        style={{
          backgroundImage: 'radial-gradient(#DCDDD6 1.75px, transparent 1.75px)',
          backgroundSize: '28px 28px',
        }}
      >
        <div className="w-full max-w-md text-center flex flex-col items-center justify-center space-y-7 z-10">
          {/* Main Headline & Subtitle */}
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[2.85rem] text-charcoal tracking-tight leading-tight">
              Clinical Intelligence
            </h2>
            <p className="text-muted text-[14.5px] font-sans mt-2">
              Evidence-grounded imaging analysis you can trust
            </p>
          </div>

          {/* Quote / Motto */}
          <div className="pt-2">
            <p className="text-forest font-mono text-[16.5px] sm:text-[18px] tracking-wide">
              &ldquo;Analyze. Ground. Verify.&rdquo;
            </p>
          </div>

          {/* Key Action Words */}
          <div className="flex items-center justify-center gap-3.5 sm:gap-4 text-forest font-serif font-semibold text-[15.5px] sm:text-[16.5px] tracking-wide">
            <span>Detect</span>
            <span className="text-champagne font-bold">•</span>
            <span>Localize</span>
            <span className="text-champagne font-bold">•</span>
            <span>Report</span>
          </div>

          {/* Primary Action Button (Matches Medora Forest Button) */}
          <div className="w-full max-w-xs pt-4">
            <button
              onClick={handleGetStarted}
              className="w-full flex items-center justify-center gap-2.5 bg-forest hover:bg-forest/90 text-surface font-medium py-3.5 px-6 rounded-sm shadow-sm transition-all hover:shadow hover:-translate-y-0.5 cursor-pointer text-[15px]"
            >
              <span>Get Started</span>
              <span className="text-lg leading-none">→</span>
            </button>
          </div>

          {/* Sign In Link */}
          <div className="pt-6 text-[13.5px] text-muted">
            <span>Ready to sign in? </span>
            <button
              onClick={handleLogin}
              className="text-forest font-medium hover:underline ml-1 cursor-pointer"
            >
              Sign In
            </button>
          </div>

          {/* Bottom Subtext */}
          <div className="text-[12px] text-muted/80 pt-1">
            MEDORA — Evidence-grounded clinical intelligence
          </div>
        </div>
      </div>
    </div>
  )
}

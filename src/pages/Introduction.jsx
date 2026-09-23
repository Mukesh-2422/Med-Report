import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Introduction() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      navigate('/login?mode=signup')
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
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FAFCFF] overflow-x-hidden select-none">
      {/* LEFT HALF - Deep Navy Brand Hero with Subtle Waves */}
      <div className="w-full lg:w-1/2 bg-[#0B2545] relative overflow-hidden flex flex-col justify-between p-8 sm:p-12 lg:p-16 min-h-[420px] lg:min-h-screen text-[#FFFFFF]">
        {/* Subtle Decorative Wave Vectors */}
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none opacity-20"
          viewBox="0 0 700 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M -50 520 C 120 480, 240 560, 420 500 C 560 460, 650 510, 750 490"
            stroke="#63B3ED"
            strokeWidth="1.75"
            fill="none"
          />
          <path
            d="M -50 570 C 140 530, 260 610, 440 550 C 580 500, 670 560, 750 540"
            stroke="#90CDF4"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M -50 620 C 160 580, 280 660, 460 600 C 600 550, 690 610, 750 590"
            stroke="#63B3ED"
            strokeWidth="1.25"
            fill="none"
          />
          <path
            d="M -50 670 C 180 630, 300 710, 480 650 C 620 600, 710 660, 750 640"
            stroke="#90CDF4"
            strokeWidth="1"
            fill="none"
          />
        </svg>

        {/* Top Header: Logo + Brand Name */}
        <div className="relative z-10 flex items-center gap-3">
          <Logo size={36} variant="light" />
        </div>

        {/* Center / Middle Content: Welcome Title & Description */}
        <div className="relative z-10 max-w-lg my-auto py-12 lg:py-0">
          <h1 className="font-sans font-bold text-4xl sm:text-5xl lg:text-[3.25rem] text-white tracking-tight leading-[1.18] mb-6">
            Welcome to <br />
            Medora
          </h1>

          <p className="text-[#C8D9ED] text-[15px] sm:text-[16px] leading-relaxed font-normal max-w-md">
            A private space designed for clinical intelligence, radiological analysis, and evidence grounding.
            Begin your journey to a sharper, more precise diagnostic workflow.
          </p>
        </div>

        {/* Bottom spacer / subtle label */}
        <div className="relative z-10 text-[#7196C2] text-[12.5px] font-medium tracking-wide">
          © 2026 MEDORA. Clinical Intelligence Platform.
        </div>
      </div>

      {/* RIGHT HALF - Dotted Grid Pattern Background + Centered Card */}
      <div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16 min-h-[500px] lg:min-h-screen relative"
        style={{
          backgroundColor: '#FFFFFF',
          backgroundImage: 'radial-gradient(#CBD5E1 1.6px, transparent 1.6px)',
          backgroundSize: '28px 28px',
        }}
      >
        <div className="w-full max-w-md text-center flex flex-col items-center justify-center space-y-7 z-10">
          {/* Main Headline */}
          <div>
            <h2 className="text-[#0F172A] font-bold text-3xl sm:text-4xl lg:text-[2.6rem] tracking-tight leading-tight">
              Your Second Brain
            </h2>
            <p className="text-[#64748B] text-[14px] sm:text-[15px] font-mono mt-2 tracking-wide">
              A friend that never forgets
            </p>
          </div>

          {/* Quote / Motto */}
          <div className="pt-2">
            <p className="text-[#334155] font-mono text-[16px] sm:text-[17.5px] tracking-wide">
              &ldquo;Talk. Remember. Recall.&rdquo;
            </p>
          </div>

          {/* Key Action Words */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-[#0B2545] font-semibold text-[14.5px] sm:text-[15.5px] tracking-wide">
            <span>Organize</span>
            <span className="text-[#94A3B8] font-bold">•</span>
            <span>Revisit</span>
            <span className="text-[#94A3B8] font-bold">•</span>
            <span>Share</span>
          </div>

          {/* Primary Action Button */}
          <div className="w-full max-w-xs pt-4">
            <button
              onClick={handleGetStarted}
              className="w-full flex items-center justify-center gap-2.5 bg-[#0B2545] hover:bg-[#081B33] text-white font-semibold py-3.5 px-6 rounded-xl shadow-[0_10px_25px_-5px_rgba(11,37,69,0.35)] hover:shadow-[0_14px_30px_-5px_rgba(11,37,69,0.45)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-[15.5px]"
            >
              <span>Get Started</span>
              <span className="text-lg leading-none">→</span>
            </button>
          </div>

          {/* Sign In Link */}
          <div className="pt-8 text-[14px] text-[#64748B]">
            <span>Ready to sign in? </span>
            <button
              onClick={handleLogin}
              className="text-[#0B2545] font-bold hover:underline ml-1 cursor-pointer"
            >
              Log In
            </button>
          </div>

          {/* Bottom Space Subtext */}
          <div className="text-[12px] font-mono text-[#94A3B8] pt-1">
            Medora — Your personal clinical memory space
          </div>
        </div>
      </div>
    </div>
  )
}

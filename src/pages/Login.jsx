import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, UserPlus, LogIn } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import Input from '../components/Input.jsx'
import Select from '../components/Select.jsx'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)

  // Form states
  const [name, setName] = useState('')
  const [specialty, setSpecialty] = useState('Radiology & Imaging')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [remember, setRemember] = useState(true)

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')

  const switchMode = (signUpMode) => {
    setIsSignUp(signUpMode)
    setErrors({})
    setFormError('')
  }

  const validate = () => {
    const next = {}
    if (isSignUp) {
      if (!name.trim()) next.name = 'Full name is required.'
      if (!email.trim()) next.email = 'Email is required.'
      else if (!/\S+@\S+\.\S+/.test(email)) next.email = 'Enter a valid email address.'
      if (!password) next.password = 'Password is required.'
      else if (password.length < 6) next.password = 'Password must be at least 6 characters.'
      if (password !== confirmPassword) next.confirmPassword = 'Passwords do not match.'
      if (!agreeTerms) next.terms = 'Please accept the terms to continue.'
    } else {
      if (!email.trim()) next.email = 'Email is required.'
      else if (!/\S+@\S+\.\S+/.test(email)) next.email = 'Enter a valid email address.'
      if (!password) next.password = 'Password is required.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!validate()) return
    setLoading(true)
    try {
      if (isSignUp) {
        await register({
          name: name.trim(),
          email: email.trim(),
          password,
          specialty,
        })
      } else {
        await login(email, password, remember)
      }
      navigate('/dashboard')
    } catch (err) {
      setFormError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex lg:w-1/2 bg-forest relative overflow-hidden flex-col justify-between p-14">
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.09]"
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
        <div className="relative">
          <Logo size={38} variant="light" />
          <div className="text-surface font-serif text-2xl -mt-1 ml-[42px] opacity-90">Clinical Intelligence</div>
        </div>
        <div className="relative max-w-md">
          <p className="font-serif text-3xl text-surface leading-snug mb-4">
            Evidence-grounded clinical intelligence.
          </p>
          <p className="text-sage text-[14.5px] leading-relaxed">
            MEDORA assists clinicians by analyzing medical imaging, retrieving relevant evidence, and verifying
            AI-generated findings — every draft report awaits your review before it becomes final.
          </p>
        </div>
        <div className="relative text-sage/70 text-[12.5px]">© 2026 MEDORA. For clinical research demonstration.</div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <Logo size={30} />
          </div>

          {/* Toggle switcher */}
          <div className="flex bg-surface border border-border rounded-sm p-1 mb-8">
            <button
              type="button"
              onClick={() => switchMode(false)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] font-medium rounded-xs transition-colors ${
                !isSignUp ? 'bg-forest text-surface shadow-xs' : 'text-muted hover:text-charcoal'
              }`}
            >
              <LogIn size={14} />
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode(true)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] font-medium rounded-xs transition-colors ${
                isSignUp ? 'bg-forest text-surface shadow-xs' : 'text-muted hover:text-charcoal'
              }`}
            >
              <UserPlus size={14} />
              Create Account
            </button>
          </div>

          <h1 className="font-serif text-3xl text-charcoal mb-1.5">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-[14.5px] text-muted mb-6">
            {isSignUp
              ? 'Join MEDORA to access clinical intelligence'
              : 'Sign in to your clinical workspace'}
          </p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {isSignUp && (
              <>
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Dr. Mukesh Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                  required
                  autoComplete="name"
                />
                <Select
                  label="Medical Specialty"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  required
                >
                  <option value="Radiology & Imaging">Radiology & Imaging</option>
                  <option value="Pulmonology & Respiratory">Pulmonology & Respiratory</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Internal Medicine">Internal Medicine</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="General Clinical Practice">General Clinical Practice</option>
                </Select>
              </>
            )}

            <Input
              label="Email"
              type="email"
              placeholder={isSignUp ? "doctor@hospital.org" : "name@hospital.org"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
              autoComplete={isSignUp ? "new-password" : "current-password"}
            />

            {isSignUp && (
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                required
                autoComplete="new-password"
              />
            )}

            {formError && (
              <p role="alert" className="text-[13px] text-warning bg-warning/10 border border-warning/30 rounded-sm px-3.5 py-2.5">
                {formError}
              </p>
            )}

            {isSignUp ? (
              <div className="flex flex-col gap-1">
                <label className="flex items-start gap-2 text-charcoal/80 text-[13px] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="h-4 w-4 mt-0.5 accent-forest"
                  />
                  <span>
                    I agree to the MEDORA clinical usage terms and data verification standards.
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-[12px] text-warning mt-0.5 ml-6">{errors.terms}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between text-[13.5px]">
                <label className="flex items-center gap-2 text-charcoal/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 accent-forest"
                  />
                  Remember me
                </label>
                <button type="button" className="text-forest hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <Button type="submit" className="w-full mt-1" loading={loading}>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          {/* Switch mode footer */}
          <div className="mt-5 text-center text-[13.5px] text-muted">
            {isSignUp ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode(false)}
                  className="text-forest font-medium hover:underline"
                >
                  Sign in
                </button>
              </span>
            ) : (
              <span>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode(true)}
                  className="text-forest font-medium hover:underline"
                >
                  Create an account
                </button>
              </span>
            )}
          </div>

          <p className="mt-6 flex items-center gap-1.5 text-[12.5px] text-muted">
            <ShieldCheck size={14} />
            Secure clinical workspace
          </p>
        </div>
      </div>
    </div>
  )
}

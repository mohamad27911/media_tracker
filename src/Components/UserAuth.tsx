"use client"

import type React from "react"
import { useState } from "react"
import { Eye, Mail, Lock, User, Play, ArrowRight, Check } from "lucide-react"
import { Link } from "react-router-dom"

// Define props for the child components to receive the switch function
interface AuthFormProps {
  onSwitchView: () => void
}

// --- Login Component Definition ---
function Login({ onSwitchView }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Login attempt:", formData)
    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  return (
    <div className="w-full max-w-md">

        <Link to='/'>
                            <button className="text-[#29b093] dark:text-[#e0f11f] hover:underline cursor-pointer font-semibold">Back Home</button>

        </Link>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#29b093] to-[#1f67f1] dark:from-[#e0f11f] dark:to-[#b8d900] rounded-2xl mb-4 shadow-lg">
          <Play className="w-8 h-8 text-white dark:text-[#121212]" />
        </div>

        <h1 className="text-3xl font-bold text-[#121212] dark:text-white mb-2">Welcome Back</h1>
        <p className="text-[#121212]/70 dark:text-white/70">Sign in to continue tracking your media</p>
      </div>
      <div className="bg-white dark:bg-[#121212] rounded-3xl shadow-2xl border border-[#121212]/10 dark:border-[#e0f11f]/20 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email-login" className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-[#121212]/50 dark:text-white/50" />
              </div>
              <input type="email" id="email-login" name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border-2 border-[#121212]/20 dark:border-[#e0f11f]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white placeholder-[#121212]/50 dark:placeholder-white/50 transition-all" placeholder="Enter your email" required />
            </div>
          </div>
          <div>
            <label htmlFor="password-login" className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-[#121212]/50 dark:text-white/50" />
              </div>
              <input type={showPassword ? "text" : "password"} id="password-login" name="password" value={formData.password} onChange={handleInputChange} className="w-full pl-12 pr-12 py-3 border-2 border-[#121212]/20 dark:border-[#e0f11f]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white placeholder-[#121212]/50 dark:placeholder-white/50 transition-all" placeholder="Enter your password" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#121212]/50 dark:text-white/50 hover:text-[#29b093] dark:hover:text-[#e0f11f] transition-colors"><Eye className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} className="w-4 h-4 text-[#29b093] dark:text-[#e0f11f] bg-white dark:bg-[#121212] border-[#121212]/30 dark:border-[#e0f11f]/30 rounded focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:ring-2" />
              <span className="ml-2 text-sm text-[#121212] dark:text-white">Remember me</span>
            </label>
            <button type="button" className="text-sm text-[#29b093] dark:text-[#e0f11f] hover:underline font-medium">Forgot password?</button>
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-[#29b093] to-[#1f67f1] dark:from-[#e0f11f] dark:to-[#b8d900] text-white dark:text-[#121212] py-3 px-6 rounded-xl font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#121212] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Sign In <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-[#121212]/70 dark:text-white/70">
            Don't have an account?{" "}
            <button onClick={onSwitchView} className="text-[#29b093] dark:text-[#e0f11f] hover:underline font-semibold">Sign up</button>
          </p>
        </div>
      </div>
    </div>
  )
}

// --- SignUp Component Definition ---
function SignUp({ onSwitchView }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", agreeToTerms: false })
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const calculatePasswordStrength = (password: string) => {
    let strength = 0; if (password.length >= 8) strength++; if (/[A-Z]/.test(password)) strength++; if (/[a-z]/.test(password)) strength++; if (/[0-9]/.test(password)) strength++; if (/[^A-Za-z0-9]/.test(password)) strength++; return strength
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setIsLoading(true); await new Promise((resolve) => setTimeout(resolve, 2000)); console.log("Sign up attempt:", formData); setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target; setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value })); if (name === "password") { setPasswordStrength(calculatePasswordStrength(value)) }
  }

  const getStrengthColor = (strength: number) => { if (strength <= 2) return "#ef4444"; if (strength <= 3) return "#f59e0b"; return "#22c55e" }
  const getStrengthText = (strength: number) => { if (strength <= 2) return "Weak"; if (strength <= 3) return "Medium"; return "Strong" }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#29b093] to-[#1f67f1] dark:from-[#e0f11f] dark:to-[#b8d900] rounded-2xl mb-4 shadow-lg">
          <Play className="w-8 h-8 text-white dark:text-[#121212]" />
        </div>
        <h1 className="text-3xl font-bold text-[#121212] dark:text-white mb-2">Create Account</h1>
        <p className="text-[#121212]/70 dark:text-white/70">Join us and start tracking your media journey</p>
      </div>
      <div className="bg-white dark:bg-[#121212] rounded-3xl shadow-2xl border border-[#121212]/10 dark:border-[#e0f11f]/20 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">First Name</label>
              <div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User className="w-5 h-5 text-[#121212]/50 dark:text-white/50" /></div><input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border-2 border-[#121212]/20 dark:border-[#e0f11f]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white placeholder-[#121212]/50 dark:placeholder-white/50 transition-all" placeholder="John" required /></div>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-[#121212]/20 dark:border-[#e0f11f]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white placeholder-[#121212]/50 dark:placeholder-white/50 transition-all" placeholder="Doe" required />
            </div>
          </div>
          <div>
            <label htmlFor="email-signup" className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">Email Address</label>
            <div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Mail className="w-5 h-5 text-[#121212]/50 dark:text-white/50" /></div><input type="email" id="email-signup" name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 border-2 border-[#121212]/20 dark:border-[#e0f11f]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white placeholder-[#121212]/50 dark:placeholder-white/50 transition-all" placeholder="john@example.com" required /></div>
          </div>
          <div>
            <label htmlFor="password-signup" className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">Password</label>
            <div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Lock className="w-5 h-5 text-[#121212]/50 dark:text-white/50" /></div><input type={showPassword ? "text" : "password"} id="password-signup" name="password" value={formData.password} onChange={handleInputChange} className="w-full pl-12 pr-12 py-3 border-2 border-[#121212]/20 dark:border-[#e0f11f]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white placeholder-[#121212]/50 dark:placeholder-white/50 transition-all" placeholder="Create a strong password" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#121212]/50 dark:text-white/50 hover:text-[#29b093] dark:hover:text-[#e0f11f] transition-colors"><Eye className="w-5 h-5" /></button></div>
            {formData.password && <div className="mt-2"><div className="flex items-center gap-2"><div className="flex-1 bg-[#121212]/10 dark:bg-white/10 rounded-full h-2"><div className="h-2 rounded-full transition-all duration-300" style={{ width: `${(passwordStrength / 5) * 100}%`, backgroundColor: getStrengthColor(passwordStrength) }} /></div><span className="text-xs font-medium" style={{ color: getStrengthColor(passwordStrength) }}>{getStrengthText(passwordStrength)}</span></div></div>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">Confirm Password</label>
            <div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Lock className="w-5 h-5 text-[#121212]/50 dark:text-white/50" /></div><input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="w-full pl-12 pr-12 py-3 border-2 border-[#121212]/20 dark:border-[#e0f11f]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white placeholder-[#121212]/50 dark:placeholder-white/50 transition-all" placeholder="Confirm your password" required /><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#121212]/50 dark:text-white/50 hover:text-[#29b093] dark:hover:text-[#e0f11f] transition-colors"><Eye className="w-5 h-5" /></button></div>
            {formData.confirmPassword && <div className="mt-2 flex items-center gap-2">{formData.password === formData.confirmPassword ? <><Check className="w-4 h-4 text-green-600" /><span className="text-xs text-green-600">Passwords match</span></> : <span className="text-xs text-red-600">Passwords don't match</span>}</div>}
          </div>
          <div className="space-y-3">
            <label className="flex items-start gap-3"><input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleInputChange} className="w-4 h-4 mt-0.5 text-[#29b093] dark:text-[#e0f11f] bg-white dark:bg-[#121212] border-[#121212]/30 dark:border-[#e0f11f]/30 rounded focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:ring-2" required /><span className="text-sm text-[#121212] dark:text-white">I agree to the <a href="/terms" className="text-[#29b093] dark:text-[#e0f11f] hover:underline">Terms of Service</a> and <a href="/privacy" className="text-[#29b093] dark:text-[#e0f11f] hover:underline">Privacy Policy</a></span></label>
          </div>
          <button type="submit" disabled={isLoading || !formData.agreeToTerms || formData.password !== formData.confirmPassword} className="w-full bg-gradient-to-r from-[#29b093] to-[#1f67f1] dark:from-[#e0f11f] dark:to-[#b8d900] text-white dark:text-[#121212] py-3 px-6 rounded-xl font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#121212] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-[#121212]/70 dark:text-white/70">
            Already have an account?{" "}
            <button onClick={onSwitchView} className="text-[#29b093] dark:text-[#e0f11f] hover:underline font-semibold">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  )
}

// --- Main UserAuth Component ---
export default function UserAuth() {
  const [view, setView] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-[#121212] dark:to-[#0a0a0a] flex items-center justify-center p-4">
      {view === 'login' ? (
        <Login onSwitchView={() => setView('signup')} />
      ) : (
        <SignUp onSwitchView={() => setView('login')} />
      )}
    </div>
  );
}
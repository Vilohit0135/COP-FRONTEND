'use client'

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { callApi } from "@/lib/apiClient"

function SetPasswordInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    const qpEmail = searchParams?.get?.("email") || ""
    const qpToken = searchParams?.get?.("token") || ""
    const timeoutId = setTimeout(() => {
      setEmail(qpEmail)
      setToken(qpToken)
    }, 0)
    return () => clearTimeout(timeoutId)
  }, [searchParams])

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!password || !confirm) return setError("Please fill in all fields")
    if (password !== confirm) return setError("Passwords do not match")
    if (password.length < 8) return setError("Password must be at least 8 characters")

    setLoading(true)
    try {
      const res = await callApi("/api/auth/set-password", {
        method: "POST",
        body: { email, token, password },
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || "Failed to set password")
        setLoading(false)
        return
      }
      setSuccess(true)
      setTimeout(() => router.replace("/admin/login"), 2000)
    } catch {
      setError("Network error. Please try again.")
      setLoading(false)
    }
  }

  const inp =
    "w-full border border-border bg-background px-10 py-3 rounded-xl text-sm text-foreground " +
    "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary " +
    "placeholder:text-muted-foreground/60 transition-all duration-200"

  return (
    <div className="fixed inset-0 z-50 flex">

      {/* ── Left panel — gradient banner ── */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 40%, #2d2d2d 70%, #f5f5f5 100%)",
        }}
      >
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

        {/* Grid texture overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />

        {/* Brand */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">COP CMS</span>
          </div>
        </div>

        {/* Quote */}
        <div className="relative z-10">
          <div className="w-12 h-1 bg-primary mb-8 rounded-full" />
          <p className="text-white text-4xl font-semibold leading-tight mb-6">
            Secure your<br />
            admin access.
          </p>
          <p className="text-white/50 text-base max-w-xs font-light leading-relaxed">
            Create a strong password to ensure your account remains protected.
          </p>
        </div>

        {/* Bottom dots */}
        <div className="relative z-10 flex gap-3">
          <div className="w-8 h-1.5 rounded-full bg-primary" />
          <div className="w-2 h-1.5 rounded-full bg-white/20" />
          <div className="w-2 h-1.5 rounded-full bg-white/20" />
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex items-center justify-center bg-muted/30 px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile brand */}
          <div className="flex items-center gap-3 mb-10 lg:hidden justify-center">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-foreground font-bold text-xl tracking-tight">COP CMS</span>
          </div>

          {/* Card */}
          <div className="bg-card rounded-[2rem] border border-border/50 shadow-2xl shadow-primary/5 overflow-hidden">

            {/* Card header */}
            <div className="px-8 pt-8 pb-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Set New Password</h2>
              <p className="text-muted-foreground text-sm mt-2">Please enter your new credentials below</p>
            </div>

            <div className="px-8 pb-10">
              {success ? (
                <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Success!</h3>
                  <p className="text-muted-foreground">Your password has been updated.</p>
                  <div className="mt-8 flex justify-center">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground/80 uppercase tracking-widest ml-1">
                      Registered Email
                    </label>
                    <div className="relative group">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inp + " bg-muted/50 cursor-not-allowed border-transparent"}
                        required
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground/80 uppercase tracking-widest ml-1">
                      New Password
                    </label>
                    <div className="relative group">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 8 characters"
                        className={inp}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-primary transition-colors rounded-lg"
                      >
                        {showPassword ? (
                          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                          </svg>
                        ) : (
                          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground/80 uppercase tracking-widest ml-1">
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <input
                        type={showConfirm ? "text" : "password"}
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Repeat your password"
                        className={inp}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-primary transition-colors rounded-lg"
                      >
                        {showConfirm ? (
                          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                          </svg>
                        ) : (
                          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                      <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="text-xs text-rose-600 font-medium leading-relaxed">{error}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-primary-foreground rounded-2xl px-4 py-4 text-sm font-bold shadow-lg shadow-primary/10 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Set Password</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Having trouble? Contact your admin.
          </p>
        </div>
      </div>

    </div>
  )
}

export default function SetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-muted flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    }>
      <SetPasswordInner />
    </Suspense>
  )
}

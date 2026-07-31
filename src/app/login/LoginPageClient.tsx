'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, Globe, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AppLogo from '@/components/ui/AppLogo';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const DEMO_CREDENTIALS = {
  email: 'dawit.bekele@jobmate.et',
  password: 'JobMate@2026',
};

export default function LoginPageClient() {
  const [lang, setLang] = useState<'en' | 'am'>('en');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');
  const router = useRouter();

  const t = {
    en: {
      tagline: 'Your AI-powered career assistant',
      subtitle: 'Upload your CV, get matched to remote jobs, and practice for interviews — all in one place.',
      step1: 'Upload your CV',
      step2: 'Get AI optimization',
      step3: 'See your job matches',
      trusted: 'Trusted by 12,000+ African professionals',
      heading: 'Welcome back',
      subheading: 'Sign in to your JobMate account',
      emailLabel: 'Email address',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Your password',
      remember: 'Remember me for 30 days',
      forgot: 'Forgot password?',
      submit: 'Sign in',
      submitting: 'Signing in...',
      noAccount: "Don\'t have an account?",
      signupLink: 'Create one free',
      demoTitle: 'Demo credentials',
      demoHint: 'Click to autofill',
      invalidCreds: 'Invalid credentials — use the demo account below',
      emailRequired: 'Email address is required',
      emailInvalid: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      passwordMin: 'Password must be at least 8 characters',
      backHome: 'Back to home',
      langSwitch: 'አማርኛ',
    },
    am: {
      tagline: 'የሰራተኛ ድጋፍ AI ረዳትዎ',
      subtitle: 'ሲቪዎን ይጫኑ፣ ከሩቅ ሥራዎች ጋር ይዛመዱ፣ ለቃለ-መጠይቅ ይዘጋጁ።',
      step1: 'ሲቪዎን ይጫኑ',
      step2: 'AI ማሻሻያ ያግኙ',
      step3: 'ሥራ ዝርዝሮችን ይመልከቱ',
      trusted: 'በ12,000+ አፍሪካ ሙያተኞች የታመነ',
      heading: 'እንኳን ደህና መጡ',
      subheading: 'ወደ JobMate መለያዎ ይግቡ',
      emailLabel: 'ኢሜይል አድራሻ',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'የይለፍ ቃል',
      passwordPlaceholder: 'የይለፍ ቃልዎን ያስገቡ',
      remember: 'ለ30 ቀናት አስታውስ',
      forgot: 'የይለፍ ቃል ረሳህ?',
      submit: 'ግባ',
      submitting: 'እየገባ ነው...',
      noAccount: 'መለያ የለህም?',
      signupLink: 'ነፃ ፍጠር',
      demoTitle: 'የሙከራ መለያ',
      demoHint: 'ለመሙላት ጠቅ ያድርጉ',
      invalidCreds: 'የተሳሳተ መለያ — ከዚህ በታች ያሉትን ይጠቀሙ',
      emailRequired: 'ኢሜይል አድራሻ ያስፈልጋል',
      emailInvalid: 'ትክክለኛ ኢሜይል አድራሻ ያስገቡ',
      passwordRequired: 'የይለፍ ቃል ያስፈልጋል',
      passwordMin: 'የይለፍ ቃሉ ቢያንስ 8 ቁምፊዎች ሊኖሩት ይገባል',
      backHome: 'ወደ ቤት ይመለሱ',
      langSwitch: 'English',
    },
  };

  const strings = t[lang];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({ defaultValues: { remember: true } });

  const autofillDemo = () => {
    setValue('email', DEMO_CREDENTIALS.email);
    setValue('password', DEMO_CREDENTIALS.password);
    setAuthError('');
    toast.success('Demo credentials filled — click Sign in');
  };

  const onSubmit = async (data: LoginFormData) => {
    setAuthError('');
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    if (data.email === DEMO_CREDENTIALS.email && data.password === DEMO_CREDENTIALS.password) {
      toast.success('Signed in successfully — welcome back, Dawit!');
      router.push('/cv-upload-optimization');
    } else {
      setAuthError(strings.invalidCreds);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] bg-primary flex-col justify-between p-10 xl:p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 bg-white translate-x-20 -translate-y-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 bg-white -translate-x-16 translate-y-16" />
        <div className="absolute top-1/2 right-8 w-32 h-32 rounded-full opacity-5 bg-white" />

        <div className="flex items-center gap-3 relative z-10">
          <AppLogo size={40} />
          <span className="text-2xl font-bold text-white tracking-tight">JobMate</span>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight text-balance">
              {strings.tagline}
            </h1>
            <p className="mt-3 text-base text-white/70 leading-relaxed">{strings.subtitle}</p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'step-1', num: '01', label: strings.step1 },
              { id: 'step-2', num: '02', label: strings.step2 },
              { id: 'step-3', num: '03', label: strings.step3 },
            ].map((step) => (
              <div key={step.id} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">{step.num}</span>
                </div>
                <p className="text-sm font-semibold text-white">{step.label}</p>
                <CheckCircle2 size={16} className="text-accent ml-auto flex-shrink-0" />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              {['#F59E0B', '#10B981', '#8B5CF6', '#EC4899'].map((color, i) => (
                <div
                  key={`av-${i}`}
                  className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {['DG', 'SA', 'BK', 'TF'][i]}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/70">{strings.trusted}</p>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-white/50">Aggregates jobs from RemoteOK · Indeed · Upwork</p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between p-4 lg:hidden border-b border-border">
          <div className="flex items-center gap-2">
            <AppLogo size={28} />
            <span className="font-bold text-base text-foreground">JobMate</span>
          </div>
          <button
            onClick={() => setLang((l) => (l === 'en' ? 'am' : 'en'))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-muted text-sm font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Globe size={14} />
            {strings.langSwitch}
          </button>
        </div>

        {/* Desktop top actions */}
        <div className="hidden lg:flex items-center justify-between p-6 pb-0">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={15} />
            {strings.backHome}
          </Link>
          <button
            onClick={() => setLang((l) => (l === 'en' ? 'am' : 'en'))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-muted text-sm font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-all active:scale-95"
          >
            <Globe size={14} />
            {strings.langSwitch}
          </button>
        </div>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-md animate-fade-in">
            <div className="mb-7">
              <h2 className={`text-2xl font-bold text-foreground ${lang === 'am' ? 'lang-am' : ''}`}>
                {strings.heading}
              </h2>
              <p className={`text-sm text-muted-foreground mt-1 ${lang === 'am' ? 'lang-am' : ''}`}>
                {strings.subheading}
              </p>
            </div>

            {authError && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-error-light border border-error/20 mb-5 animate-slide-up">
                <AlertCircle size={15} className="text-error flex-shrink-0 mt-0.5" />
                <p className="text-sm text-error">{authError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className={`block text-sm font-semibold text-foreground mb-1.5 ${lang === 'am' ? 'lang-am' : ''}`}>
                  {strings.emailLabel}
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    placeholder={strings.emailPlaceholder}
                    autoComplete="email"
                    {...register('email', {
                      required: strings.emailRequired,
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: strings.emailInvalid },
                    })}
                    className={`input-field pl-9 ${errors.email ? 'border-error focus:border-error' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-error flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className={`text-sm font-semibold text-foreground ${lang === 'am' ? 'lang-am' : ''}`}>
                    {strings.passwordLabel}
                  </label>
                  <button type="button" className="text-xs text-primary font-semibold hover:underline">
                    {strings.forgot}
                  </button>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={strings.passwordPlaceholder}
                    autoComplete="current-password"
                    {...register('password', {
                      required: strings.passwordRequired,
                      minLength: { value: 8, message: strings.passwordMin },
                    })}
                    className={`input-field pl-9 pr-10 ${errors.password ? 'border-error focus:border-error' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-error flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember */}
              <div className="flex items-center gap-2.5">
                <input
                  id="remember"
                  type="checkbox"
                  {...register('remember')}
                  className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                />
                <label htmlFor="remember" className={`text-sm text-muted-foreground cursor-pointer ${lang === 'am' ? 'lang-am' : ''}`}>
                  {strings.remember}
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full text-sm py-3"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    {strings.submitting}
                  </>
                ) : (
                  strings.submit
                )}
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-5">
              <span className={lang === 'am' ? 'lang-am' : ''}>{strings.noAccount}</span>{' '}
              <Link href="/sign-up-login-screen" className={`text-primary font-semibold hover:underline ${lang === 'am' ? 'lang-am' : ''}`}>
                {strings.signupLink}
              </Link>
            </p>

            {/* Demo credentials */}
            <div className="mt-6 p-4 rounded-2xl bg-muted border border-border">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-foreground uppercase tracking-wide">{strings.demoTitle}</p>
                <button
                  onClick={autofillDemo}
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  {strings.demoHint}
                </button>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between p-2 rounded-lg bg-card border border-border">
                  <span className="text-xs text-muted-foreground">Email</span>
                  <span className="text-xs font-mono font-semibold text-foreground">{DEMO_CREDENTIALS.email}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-card border border-border">
                  <span className="text-xs text-muted-foreground">Password</span>
                  <span className="text-xs font-mono font-semibold text-foreground">{DEMO_CREDENTIALS.password}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

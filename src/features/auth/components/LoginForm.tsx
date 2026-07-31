'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, Copy, Check, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginFormProps {
  lang: 'en' | 'am';
  onSwitchToSignup: () => void;
}

// Mock credentials for demo
const DEMO_CREDENTIALS = {
  email: 'dawit.bekele@jobmate.et',
  password: 'JobMate@2026',
};

const t = {
  en: {
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
    signupLink: 'Create one',
    demoTitle: 'Demo credentials',
    demoHint: 'Click to autofill',
    invalidCreds: 'Invalid credentials — use the demo accounts below to sign in',
    emailRequired: 'Email address is required',
    emailInvalid: 'Please enter a valid email address',
    passwordRequired: 'Password is required',
    passwordMin: 'Password must be at least 8 characters',
  },
  am: {
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
    signupLink: 'ፍጠር',
    demoTitle: 'የሙከራ መለያ',
    demoHint: 'ለመሙላት ጠቅ ያድርጉ',
    invalidCreds: 'የተሳሳተ መለያ — ለመግባት ከዚህ በታች ያሉትን የሙከራ መለያዎች ይጠቀሙ',
    emailRequired: 'ኢሜይል አድራሻ ያስፈልጋል',
    emailInvalid: 'ትክክለኛ ኢሜይል አድራሻ ያስገቡ',
    passwordRequired: 'የይለፍ ቃል ያስፈልጋል',
    passwordMin: 'የይለፍ ቃሉ ቢያንስ 8 ቁምፊዎች ሊኖሩት ይገባል',
  },
};

export default function LoginForm({ lang, onSwitchToSignup }: LoginFormProps) {
  const strings = t[lang];
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');
  const [copiedField, setCopiedField] = useState<'email' | 'password' | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { remember: true },
  });

  const copyField = async (field: 'email' | 'password') => {
    const val = field === 'email' ? DEMO_CREDENTIALS.email : DEMO_CREDENTIALS.password;
    await navigator.clipboard.writeText(val).catch(() => {});
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const autofillDemo = () => {
    setValue('email', DEMO_CREDENTIALS.email);
    setValue('password', DEMO_CREDENTIALS.password);
    setAuthError('');
    toast.success('Demo credentials filled — click Sign in');
  };

  const onSubmit = async (data: LoginFormData) => {
    setAuthError('');
    setSubmitting(true);
    // BACKEND INTEGRATION: POST /api/auth/login with { email, password }
    await new Promise((r) => setTimeout(r, 1400));
    if (
      data.email === DEMO_CREDENTIALS.email &&
      data.password === DEMO_CREDENTIALS.password
    ) {
      toast.success('Signed in successfully — welcome back, Dawit!');
      router.push('/cv-upload-optimization');
    } else {
      setAuthError(strings.invalidCreds);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
        <button
          type="button"
          onClick={() => router.push('/login')}
          className="flex-1 py-2 text-sm font-semibold rounded-xl bg-white text-slate-900 shadow-sm transition-all"
        >
          {lang === 'am' ? 'ግባ' : 'Sign in'}
        </button>
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="flex-1 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-all"
        >
          {lang === 'am' ? 'መለያ ፍጠር' : 'Create account'}
        </button>
      </div>
      <div className="mb-7">
        <h2 className={`text-2xl font-bold text-foreground ${lang === 'am' ? 'lang-am' : ''}`}>
          {strings.heading}
        </h2>
        <p className={`text-sm text-muted-foreground mt-1 ${lang === 'am' ? 'lang-am' : ''}`}>
          {strings.subheading}
        </p>
      </div>

      {/* Auth error */}
      {authError && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-error-light border border-error/20 mb-5 animate-slide-up">
          <AlertCircle size={15} className="text-error flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error">{authError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="login-email" className={`block text-sm font-semibold text-foreground mb-1.5 ${lang === 'am' ? 'lang-am' : ''}`}>
            {strings.emailLabel}
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="login-email"
              type="email"
              placeholder={strings.emailPlaceholder}
              autoComplete="email"
              {...register('email', {
                required: strings.emailRequired,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: strings.emailInvalid,
                },
              })}
              className={`input-field pl-9 ${errors.email ? 'border-error focus:border-error focus:ring-error/30' : ''}`}
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs text-error flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className={`text-sm font-semibold text-foreground ${lang === 'am' ? 'lang-am' : ''}`}>
              {strings.passwordLabel}
            </label>
            <button type="button" className="text-xs text-primary font-semibold hover:underline">
              {strings.forgot}
            </button>
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder={strings.passwordPlaceholder}
              autoComplete="current-password"
              {...register('password', {
                required: strings.passwordRequired,
                minLength: { value: 8, message: strings.passwordMin },
              })}
              className={`input-field pl-9 pr-10 ${errors.password ? 'border-error focus:border-error focus:ring-error/30' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-error flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2.5">
          <input
            id="login-remember"
            type="checkbox"
            {...register('remember')}
            className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
          />
          <label htmlFor="login-remember" className={`text-sm text-muted-foreground cursor-pointer ${lang === 'am' ? 'lang-am' : ''}`}>
            {strings.remember}
          </label>
        </div>

        {/* Submit */}
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

      {/* Switch to signup */}
      <p className="text-center text-sm text-muted-foreground mt-5">
        <span className={lang === 'am' ? 'lang-am' : ''}>{strings.noAccount}</span>{' '}
        <button
          onClick={onSwitchToSignup}
          className={`text-primary font-semibold hover:underline ${lang === 'am' ? 'lang-am' : ''}`}
        >
          {strings.signupLink}
        </button>
      </p>

      {/* Demo credentials box */}
      <div className="mt-6 p-4 rounded-2xl bg-muted border border-border">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-foreground uppercase tracking-wider">{strings.demoTitle}</p>
          <button
            onClick={autofillDemo}
            className="text-xs text-primary font-semibold hover:underline"
          >
            {strings.demoHint}
          </button>
        </div>
        <div className="space-y-2">
          {[
            { id: 'demo-email', label: 'Email', value: DEMO_CREDENTIALS.email, field: 'email' as const },
            { id: 'demo-password', label: 'Password', value: DEMO_CREDENTIALS.password, field: 'password' as const },
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-2 p-2 rounded-xl bg-card border border-border">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                <p className="text-xs font-mono text-foreground truncate mt-0.5">{item.value}</p>
              </div>
              <button
                onClick={() => copyField(item.field)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted transition-colors flex-shrink-0"
                aria-label={`Copy ${item.label}`}
              >
                {copiedField === item.field ? (
                  <Check size={13} className="text-accent" />
                ) : (
                  <Copy size={13} className="text-muted-foreground" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

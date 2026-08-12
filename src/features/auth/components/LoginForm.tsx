'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { loginUser } from '@/features/auth/api';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginFormProps {
  lang: 'en' | 'am';
  onSwitchToSignup: () => void;
}

const t = {
  en: {
    heading: 'Welcome back',
    subheading: 'Sign in to your MeriJobs account',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@example.com',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Your password',
    remember: 'Remember me for 30 days',
    forgot: 'Forgot password?',
    submit: 'Sign in',
    submitting: 'Signing in...',
    noAccount: "Don't have an account?",
    signupLink: 'Create one',
    or: 'Or continue with',
    googleSignin: 'Sign in with Google',
    invalidCreds: 'Invalid credentials — please check your email and password',
    emailRequired: 'Email address is required',
    emailInvalid: 'Please enter a valid email address',
    passwordRequired: 'Password is required',
    passwordMin: 'Password must be at least 8 characters',
  },
  am: {
    heading: 'እንኳን ደህና መጡ',
    subheading: 'ወደ MeriJobs መለያዎ ይግቡ',
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
    or: 'ወይም በ',
    googleSignin: 'በGoogle መለያ ግባ',
    invalidCreds: 'የተሳሳተ መለያ — እባክዎ ኢሜይል እና የይለፍ ቃል ያስተካክሉ',
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { remember: true },
  });

  
  const onSubmit = async (data: LoginFormData) => {
    setAuthError('');
    setSubmitting(true);
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      toast.success('Signed in successfully — welcome back!');
      router.push('/cv-upload-optimization');
    } catch (err: any) {
      setAuthError(err.message || strings.invalidCreds);
    } finally {
      setSubmitting(false);
    }
  };

  
  const handleGoogleLogin = () => {
    toast.info('Google authentication will be integrated soon.');
    // window.location.href = 'http://localhost:8080/oauth2/authorization/google';
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
          className="btn-primary w-full text-sm py-3 flex items-center justify-center gap-2"
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

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className={`bg-background px-2 text-muted-foreground ${lang === 'am' ? 'lang-am' : ''}`}>
            {strings.or}
          </span>
        </div>
      </div>

      {/* Google Sign-in Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full py-3 px-4 border border-border rounded-xl font-medium text-sm text-foreground flex items-center justify-center gap-3 hover:bg-muted/50 transition-all shadow-sm"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span className={lang === 'am' ? 'lang-am' : ''}>{strings.googleSignin}</span>
      </button>

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
    </div>
  );
}
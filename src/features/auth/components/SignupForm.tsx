'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, User, Globe, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signupUser } from '@/features/auth/api';

interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  language: 'en' | 'am';
  terms: boolean;
}

interface SignUpFormProps {
  lang: 'en' | 'am';
  onSwitchToLogin: () => void;
}

const t = {
  en: {
    heading: 'Create your account',
    subheading: 'Start your job search journey today',
    nameLabel: 'Full name',
    namePlaceholder: 'Dawit Bekele',
    nameHelper: 'This will appear on your profile and CV',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@example.com',
    passwordLabel: 'Create password',
    passwordPlaceholder: 'At least 8 characters',
    passwordHelper: 'Use a mix of letters, numbers, and symbols',
    confirmLabel: 'Confirm password',
    confirmPlaceholder: 'Repeat your password',
    langLabel: 'Preferred language',
    terms: 'I agree to the',
    termsLink: 'Terms of Service',
    and: 'and',
    privacyLink: 'Privacy Policy',
    submit: 'Create account',
    submitting: 'Creating account...',
    hasAccount: 'Already have an account?',
    loginLink: 'Sign in',
    nameRequired: 'Full name is required',
    nameMin: 'Name must be at least 2 characters',
    emailRequired: 'Email address is required',
    emailInvalid: 'Please enter a valid email address',
    passwordRequired: 'Password is required',
    passwordMin: 'Password must be at least 8 characters',
    confirmRequired: 'Please confirm your password',
    confirmMismatch: 'Passwords do not match',
    termsRequired: 'You must accept the terms to continue',
    strengthWeak: 'Weak',
    strengthFair: 'Fair',
    strengthStrong: 'Strong',
  },
  am: {
    heading: 'መለያ ፍጠሩ',
    subheading: 'ዛሬ የስራ ፍለጋ ጉዞዎን ይጀምሩ',
    nameLabel: 'ሙሉ ስም',
    namePlaceholder: 'ዳዊት በቀለ',
    nameHelper: 'ይህ በፕሮፋይልዎ እና ሲቪዎ ላይ ይታያል',
    emailLabel: 'ኢሜይል አድራሻ',
    emailPlaceholder: 'you@example.com',
    passwordLabel: 'የይለፍ ቃል ፍጠሩ',
    passwordPlaceholder: 'ቢያንስ 8 ቁምፊዎች',
    passwordHelper: 'ፊደሎች፣ ቁጥሮች እና ምልክቶችን ይጠቀሙ',
    confirmLabel: 'የይለፍ ቃሉን ያረጋግጡ',
    confirmPlaceholder: 'የይለፍ ቃሉን ይድገሙ',
    langLabel: 'ተመራጭ ቋንቋ',
    terms: 'ምቀበለዋለሁ',
    termsLink: 'የአገልግሎት ውሎችን',
    and: 'እና',
    privacyLink: 'የግላዊነት ፖሊሲን',
    submit: 'መለያ ፍጠሩ',
    submitting: 'እየተፈጠረ ነው...',
    hasAccount: 'መለያ አለዎት?',
    loginLink: 'ይግቡ',
    nameRequired: 'ሙሉ ስም ያስፈልጋል',
    nameMin: 'ስሙ ቢያንስ 2 ቁምፊዎች ሊኖሩት ይገባል',
    emailRequired: 'ኢሜይል አድራሻ ያስፈልጋል',
    emailInvalid: 'ትክክለኛ ኢሜይል አድራሻ ያስገቡ',
    passwordRequired: 'የይለፍ ቃል ያስፈልጋል',
    passwordMin: 'የይለፍ ቃሉ ቢያንስ 8 ቁምፊዎች ሊኖሩት ይገባል',
    confirmRequired: 'የይለፍ ቃሉን ያረጋግጡ',
    confirmMismatch: 'የይለፍ ቃሎቹ አይዛመዱም',
    termsRequired: 'ለመቀጠል ውሎቹን ማቀባበል አለቦት',
    strengthWeak: 'ደካማ',
    strengthFair: 'መካከለኛ',
    strengthStrong: 'ጠንካራ',
  },
};

function getPasswordStrength(password: string): { score: number; label: string } {
  if (!password) return { score: 0, label: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return {
    score,
    label: score <= 2 ? 'weak' : score <= 3 ? 'fair' : 'strong',
  };
}

export default function SignUpForm({ lang, onSwitchToLogin }: SignUpFormProps) {
  const strings = t[lang];
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: { language: lang },
  });

  const watchedPassword = watch('password', '');
  const strength = getPasswordStrength(watchedPassword);

  const strengthColors = {
    weak: 'bg-error',
    fair: 'bg-warning',
    strong: 'bg-accent',
  };
  const strengthLabels = {
    weak: strings.strengthWeak,
    fair: strings.strengthFair,
    strong: strings.strengthStrong,
  };

  const onSubmit = async (data: SignUpFormData) => {
    setSubmitting(true);
    setAuthError(null);
    try {
      await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        language: data.language,
      });
      toast.success(`Account created! Welcome to JobMate, ${data.fullName.split(' ')[0]}!`);
      router.push('/cv-upload-optimization');
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error.message || 'Failed to create account. Please try again.';
      setAuthError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* 1. Auth Switch Navigation Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
        {/* Sign in Button */}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="flex-1 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
        >
          {lang === 'am' ? 'ግባ' : 'Sign in'}
        </button>

        {/* Create account Button (Active) */}
        <button
          type="button"
          className="flex-1 py-2 text-sm font-semibold rounded-xl bg-white text-slate-900 shadow-sm transition-all"
        >
          {lang === 'am' ? 'መለያ ፍጠር' : 'Create account'}
        </button>
      </div>

      <div className="mb-6">
        <h2 className={`text-2xl font-bold text-foreground ${lang === 'am' ? 'lang-am' : ''}`}>
          {strings.heading}
        </h2>
        <p className={`text-sm text-muted-foreground mt-1 ${lang === 'am' ? 'lang-am' : ''}`}>
          {strings.subheading}
        </p>
      </div>

      {authError && (
        <div className="mb-4 p-3 rounded-xl bg-error/10 border border-error/20 flex items-center gap-2 text-error text-sm">
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Full name */}
        <div>
          <label htmlFor="signup-name" className={`block text-sm font-semibold text-foreground mb-1.5 ${lang === 'am' ? 'lang-am' : ''}`}>
            {strings.nameLabel}
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="signup-name"
              type="text"
              placeholder={strings.namePlaceholder}
              autoComplete="name"
              {...register('fullName', {
                required: strings.nameRequired,
                minLength: { value: 2, message: strings.nameMin },
              })}
              className={`input-field pl-9 ${errors.fullName ? 'border-error focus:border-error focus:ring-error/30' : ''}`}
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{strings.nameHelper}</p>
          {errors.fullName && (
            <p className="mt-1 text-xs text-error flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="signup-email" className={`block text-sm font-semibold text-foreground mb-1.5 ${lang === 'am' ? 'lang-am' : ''}`}>
            {strings.emailLabel}
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="signup-email"
              type="email"
              placeholder={strings.emailPlaceholder}
              autoComplete="email"
              {...register('email', {
                required: strings.emailRequired,
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: strings.emailInvalid },
              })}
              className={`input-field pl-9 ${errors.email ? 'border-error focus:border-error focus:ring-error/30' : ''}`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-error flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="signup-password" className={`block text-sm font-semibold text-foreground mb-1.5 ${lang === 'am' ? 'lang-am' : ''}`}>
            {strings.passwordLabel}
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              placeholder={strings.passwordPlaceholder}
              autoComplete="new-password"
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

          {/* Password strength indicator */}
          {watchedPassword && (
            <div className="mt-2 space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={`strength-bar-${i}`}
                    className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                      i <= strength.score
                        ? strengthColors[strength.label as keyof typeof strengthColors] ?? 'bg-muted'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <p className={`text-xs font-medium ${
                strength.label === 'strong' ? 'text-accent' : strength.label === 'fair' ? 'text-warning' : 'text-error'
              }`}>
                {strengthLabels[strength.label as keyof typeof strengthLabels]}
              </p>
            </div>
          )}

          <p className="mt-1 text-xs text-muted-foreground">{strings.passwordHelper}</p>
          {errors.password && (
            <p className="mt-1 text-xs text-error flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm password */}
        <div>
          <label htmlFor="signup-confirm" className={`block text-sm font-semibold text-foreground mb-1.5 ${lang === 'am' ? 'lang-am' : ''}`}>
            {strings.confirmLabel}
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="signup-confirm"
              type={showConfirm ? 'text' : 'password'}
              placeholder={strings.confirmPlaceholder}
              autoComplete="new-password"
              {...register('confirmPassword', {
                required: strings.confirmRequired,
                validate: (value) => value === watchedPassword || strings.confirmMismatch,
              })}
              className={`input-field pl-9 pr-10 ${errors.confirmPassword ? 'border-error focus:border-error focus:ring-error/30' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-error flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Language preference */}
        <div>
          <label htmlFor="signup-lang" className={`block text-sm font-semibold text-foreground mb-1.5 ${lang === 'am' ? 'lang-am' : ''}`}>
            <Globe size={14} className="inline mr-1.5 text-muted-foreground" />
            {strings.langLabel}
          </label>
          <select
            id="signup-lang"
            {...register('language')}
            className="input-field text-sm"
          >
            <option value="en">English</option>
            <option value="am">አማርኛ (Amharic)</option>
          </select>
        </div>

        {/* Terms */}
        <div>
          <div className="flex items-start gap-2.5">
            <input
              id="signup-terms"
              type="checkbox"
              {...register('terms', { required: strings.termsRequired })}
              className="w-4 h-4 mt-0.5 rounded border-border accent-primary cursor-pointer flex-shrink-0"
            />
            <label htmlFor="signup-terms" className={`text-sm text-muted-foreground cursor-pointer leading-relaxed ${lang === 'am' ? 'lang-am' : ''}`}>
              {strings.terms}{' '}
              <span className="text-primary font-semibold hover:underline cursor-pointer">{strings.termsLink}</span>
              {' '}{strings.and}{' '}
              <span className="text-primary font-semibold hover:underline cursor-pointer">{strings.privacyLink}</span>
            </label>
          </div>
          {errors.terms && (
            <p className="mt-1 text-xs text-error flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.terms.message}
            </p>
          )}
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

      {/* Switch to login */}
      <p className="text-center text-sm text-muted-foreground mt-5">
        <span className={lang === 'am' ? 'lang-am' : ''}>{strings.hasAccount}</span>{' '}
        <button
          onClick={onSwitchToLogin}
          className={`text-primary font-semibold hover:underline ${lang === 'am' ? 'lang-am' : ''}`}
        >
          {strings.loginLink}
        </button>
      </p>
    </div>
  );
}
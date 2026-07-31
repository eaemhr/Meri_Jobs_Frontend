'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Phone, Briefcase, MapPin, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

export interface ProfileBasicsFormData {
  fullName: string;
  phone: string;
  currentRole: string;
  targetRole: string;
  location: string;
  experienceLevel: 'entry' | 'mid' | 'senior';
}

interface ProfileBasicsStepProps {
  lang: 'en' | 'am';
  initialData?: Partial<ProfileBasicsFormData>;
  onNext: (data: ProfileBasicsFormData) => void;
  onBack: () => void;
}

const t = {
  en: {
    heading: 'Basic Information',
    subheading: 'Tell us a bit about yourself so we can match you with relevant jobs.',
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'Dawit Bekele',
    fullNameError: 'Please enter a valid full name (at least 3 letters, numbers not allowed)',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '+251 91 234 5678',
    phoneError: 'Phone must start with +251, 09, or 07 and contain numbers only',
    currentRoleLabel: 'Current Job Title / Status',
    currentRolePlaceholder: 'e.g., Junior Software Engineer or Student',
    currentRoleError: 'Please enter a valid status/role (letters only)',
    targetRoleLabel: 'Target Job Title',
    targetRolePlaceholder: 'e.g., Full Stack Developer',
    targetRoleError: 'Please enter a valid target role (letters only)',
    locationLabel: 'City / Location',
    locationPlaceholder: 'e.g., Addis Ababa, Ethiopia',
    locationError: 'Please enter a valid location (letters only)',
    expLabel: 'Experience Level',
    expEntry: 'Entry Level (0-2 yrs)',
    expMid: 'Mid Level (2-5 yrs)',
    expSenior: 'Senior Level (5+ yrs)',
    backBtn: 'Back',
    nextBtn: 'Continue',
    requiredErr: 'This field is required',
  },
  am: {
    heading: 'መሠረታዊ መረጃዎች',
    subheading: 'ትክክለኛ ስራዎችን እንድንፈልግልዎ ስለ እርስዎ ጥቂት መረጃዎችን ያጋሩን።',
    fullNameLabel: 'ሙሉ ስም',
    fullNamePlaceholder: 'ዳዊት በቀለ',
    fullNameError: 'እባክዎ ትክክለኛ ሙሉ ስም ያስገቡ (ቢያንስ 3 ፊደላት፣ ቁጥር አይፈቀድም)',
    phoneLabel: 'ስልክ ቁጥር',
    phonePlaceholder: '+251 91 234 5678',
    phoneError: 'ስልክ ቁጥሩ በ +251፣ 09 ወይም 07 መጀመር አለበት እና ቁጥር ብቻ መያዝ አለበት',
    currentRoleLabel: 'የአሁኑ የስራ መደብ / ሁኔታ',
    currentRolePlaceholder: 'ምሳሌ፦ ጁኒየር ሶፍትዌር ኢንጂነር ወይም ተማሪ',
    currentRoleError: 'እባክዎ ትክክለኛ የስራ መደብ ያስገቡ (ቁጥር አይፈቀድም)',
    targetRoleLabel: 'የሚፈልጉት የስራ መደብ',
    targetRolePlaceholder: 'ምሳሌ፦ ፉል ስታክ ዲቨሎፐር',
    targetRoleError: 'እባክዎ ትክክለኛ የስራ መደብ ያስገቡ (ቁጥር አይፈቀድም)',
    locationLabel: 'ከተማ / አድራሻ',
    locationPlaceholder: 'ምሳሌ፦ አዲስ አበባ፣ ኢትዮጵያ',
    locationError: 'እባክዎ ትክክለኛ አድራሻ ያስገቡ (ቁጥር አይፈቀድም)',
    expLabel: 'የስራ ልምድ ደረጃ',
    expEntry: 'ጀማሪ (0-2 ዓመት)',
    expMid: 'መካከለኛ (2-5 ዓመት)',
    expSenior: 'ከፍተኛ (5+ ዓመት)',
    backBtn: 'ተመለስ',
    nextBtn: 'ቀጥል',
    requiredErr: 'ይህ ቦታ መሞላት አለበት',
  },
};

export default function ProfileBasicsStep({
  lang,
  initialData,
  onNext,
  onBack,
}: ProfileBasicsStepProps) {
  const strings = t[lang];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileBasicsFormData>({
    defaultValues: {
      fullName: initialData?.fullName || '',
      phone: initialData?.phone || '',
      currentRole: initialData?.currentRole || '',
      targetRole: initialData?.targetRole || '',
      location: initialData?.location || 'Addis Ababa',
      experienceLevel: initialData?.experienceLevel || 'entry',
    },
  });

  const onSubmit = (data: ProfileBasicsFormData) => {
    onNext(data);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-foreground mb-1">{strings.heading}</h2>
        <p className="text-sm text-muted-foreground">{strings.subheading}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            {strings.fullNameLabel}
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={strings.fullNamePlaceholder}
              {...register('fullName', {
                required: strings.requiredErr,
                minLength: { value: 3, message: strings.fullNameError },
                validate: {
                  noNumbers: (value) => !/\d/.test(value) || strings.fullNameError,
                },
              })}
              className={`input-field pl-9 ${errors.fullName ? 'border-error' : ''}`}
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-xs text-error flex items-center gap-1">
              <AlertCircle size={12} /> {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">
            {strings.phoneLabel}
          </label>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="tel"
              placeholder={strings.phonePlaceholder}
              maxLength={13}
              {...register('phone', {
                required: strings.requiredErr,
                validate: {
                  validFormat: (value) =>
                    /^(\+251|09|07)\d{8}$/.test(value) || strings.phoneError,
                },
              })}
              className={`input-field pl-9 ${errors.phone ? 'border-error' : ''}`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-error flex items-center gap-1">
              <AlertCircle size={12} /> {errors.phone.message}
            </p>
          )}
        </div>

        {/* Current & Target Role (2 Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              {strings.currentRoleLabel}
            </label>
            <div className="relative">
              <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={strings.currentRolePlaceholder}
                {...register('currentRole', {
                  required: strings.requiredErr,
                  validate: {
                    noNumbers: (value) => !/\d/.test(value) || strings.currentRoleError,
                  },
                })}
                className={`input-field pl-9 ${errors.currentRole ? 'border-error' : ''}`}
              />
            </div>
            {errors.currentRole && (
              <p className="mt-1 text-xs text-error flex items-center gap-1">
                <AlertCircle size={12} /> {errors.currentRole.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              {strings.targetRoleLabel}
            </label>
            <div className="relative">
              <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={strings.targetRolePlaceholder}
                {...register('targetRole', {
                  required: strings.requiredErr,
                  validate: {
                    noNumbers: (value) => !/\d/.test(value) || strings.targetRoleError,
                  },
                })}
                className={`input-field pl-9 ${errors.targetRole ? 'border-error' : ''}`}
              />
            </div>
            {errors.targetRole && (
              <p className="mt-1 text-xs text-error flex items-center gap-1">
                <AlertCircle size={12} /> {errors.targetRole.message}
              </p>
            )}
          </div>
        </div>

        {/* Location & Experience Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              {strings.locationLabel}
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={strings.locationPlaceholder}
                {...register('location', {
                  required: strings.requiredErr,
                  validate: {
                    noNumbers: (value) => !/\d/.test(value) || strings.locationError,
                  },
                })}
                className={`input-field pl-9 ${errors.location ? 'border-error' : ''}`}
              />
            </div>
            {errors.location && (
              <p className="mt-1 text-xs text-error flex items-center gap-1">
                <AlertCircle size={12} /> {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              {strings.expLabel}
            </label>
            <select {...register('experienceLevel')} className="input-field text-sm">
              <option value="entry">{strings.expEntry}</option>
              <option value="mid">{strings.expMid}</option>
              <option value="senior">{strings.expSenior}</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary px-5 py-2.5 text-sm flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>{strings.backBtn}</span>
          </button>

          <button
            type="submit"
            className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2 cursor-pointer"
          >
            <span>{strings.nextBtn}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingProgress from '@/features/onboarding/components/OnboardingProgress';
import WelcomeStep from '@/features/onboarding/components/WelcomeStep';
import ProfileBasicsStep, { ProfileBasicsFormData } from '@/features/onboarding/components/ProfileBasicsStep';
import CvUploadStep from '@/features/onboarding/components/CvUploadStep';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { updateProfileDetail } from '@/features/auth/api'; 

const STEPS = [
  { id: 1, titleEn: 'Welcome', titleAm: 'እንኳን መጡ' },
  { id: 2, titleEn: 'Profile Basics', titleAm: 'መሠረታዊ መረጃ' },
  { id: 3, titleEn: 'Upload CV', titleAm: 'ሲቪ መጫኛ' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [lang] = useState<'en' | 'am'>('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [userName, setUserName] = useState<string>(''); // የተጠቃሚውን ስም ለመያዝ
  const [formData, setFormData] = useState<Partial<ProfileBasicsFormData>>({});
  const [showNotification, setShowNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ገጹ ሲከፈት የተጠቃሚውን ስም ከሎጊን ወይም ከሰርቨር ማምጣት
  useEffect(() => {
    // እንደ አፕሊኬሽኑ አሰራር ከተጠቃሚው ሎጊን መረጃ (Session/Storage/API) ስሙን መቀበል ይቻላል
    // ለምሳሌ ከ localStorage ወይም ከሲስተሙ የሚገኝ ከሆነ፦
    const storedUser = localStorage.getItem('user_name');
    if (storedUser) {
      setUserName(storedUser);
    }
  }, []);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleProfileBasicsSubmit = (data: ProfileBasicsFormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    handleNextStep();
  };

  const handleComplete = async (cvData?: any) => {
    const finalData: any = { ...formData, cvData };
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await updateProfileDetail({
        full_name: finalData.full_name || finalData.fullName,
        phone: finalData.phone,
        location: finalData.location,
        bio: finalData.bio,
      });

      setShowNotification(true);

      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 relative">
      
      {showNotification && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top duration-300 border border-slate-800">
          <div className="text-emerald-400">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-sm font-semibold">Profile completed successfully!</p>
            <p className="text-xs text-slate-400">Redirecting to your dashboard...</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="max-w-2xl mx-auto mb-4 bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-200 flex items-center gap-2 text-sm">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="w-full max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
        {/* Step Indicator */}
        <OnboardingProgress currentStep={currentStep} steps={STEPS} lang={lang} />

        {/* Step 1: Welcome */}
        {currentStep === 1 && (
          <WelcomeStep lang={lang} userName={userName} onNext={handleNextStep} />
        )}

        {/* Step 2: Profile Basics */}
        {currentStep === 2 && (
          <ProfileBasicsStep
            lang={lang}
            initialData={formData}
            onNext={handleProfileBasicsSubmit}
            onBack={handlePrevStep}
          />
        )}

        {/* Step 3: CV Upload */}
        {currentStep === 3 && (
          <CvUploadStep
            key="step-3"
            lang={lang}
            onNext={handleComplete}
            onBack={handlePrevStep}
            onSkip={handleComplete}
          />
        )}

        {isLoading && (
          <div className="text-center mt-4 text-sm text-slate-500">
            Saving profile details...
          </div>
        )}
      </div>
    </main>
  );
}
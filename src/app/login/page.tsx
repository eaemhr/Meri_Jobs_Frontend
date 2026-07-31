'use client';

import React, { useState } from 'react';
import LoginForm from '@/features/auth/components/LoginForm'; 
import SignUpForm from '@/features/auth/components/SignupForm'; 

export default function LoginPage() {
  const [lang, setLang] = useState<'en' | 'am'>('en');
  const [isLogin, setIsLogin] = useState(true); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        {}
        {isLogin ? (
          <LoginForm 
            lang={lang} 
            onSwitchToSignup={() => setIsLogin(false)} 
          />
        ) : (
          <SignUpForm 
            lang={lang} 
            onSwitchToLogin={() => setIsLogin(true)} 
          />
        )}
      </div>
    </div>
  );
}
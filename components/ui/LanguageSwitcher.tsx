'use client';

import { useState } from 'react';
import { useTypedTranslation, SUPPORTED_LANGUAGES, LANGUAGE_NAMES } from '@/lib/i18n';
import { Button } from './Button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTypedTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = i18n.language as keyof typeof LANGUAGE_NAMES;
  
  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Globe className="h-4 w-4" />
        <span>{currentLanguage && LANGUAGE_NAMES[currentLanguage]}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-40 overflow-hidden rounded-lg border border-white/20 bg-slate-900/95 shadow-xl backdrop-blur">
          {SUPPORTED_LANGUAGES.map((lng) => (
            <button
              key={lng}
              onClick={() => handleLanguageChange(lng)}
              className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-white/10 ${
                i18n.language === lng ? 'bg-white/10 text-blue-400' : 'text-slate-200'
              }`}
            >
              {LANGUAGE_NAMES[lng]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

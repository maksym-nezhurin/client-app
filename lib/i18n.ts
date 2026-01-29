'use client';

// import i18n from '@reelo/i18n';

// export { useTypedTranslation } from '@reelo/i18n';
// export type { TranslationKey, TranslationOptions, SupportedLanguage } from '@reelo/i18n';

// export default i18n;

// export default function t(key: string) {
//   return key;
// }

const t = (key: string) => key;
const i18n = {
    resolvedLanguage: 'en',
    language: 'en',
    changeLanguage: async (language: string) => {
        console.log('Changing language to:', language);
        // TODO: Implement language change logic
    },
};
const useTypedTranslation = () => ({ t, i18n });

export { t, useTypedTranslation };

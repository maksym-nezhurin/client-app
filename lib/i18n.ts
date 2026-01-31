export type SupportedLanguage = 'en' | 'pl' | 'sk' | 'uk';

const t = (key: string) => key;
const i18n = {
    resolvedLanguage: 'en' as SupportedLanguage,
    language: 'en' as SupportedLanguage,
    changeLanguage: async (language: SupportedLanguage) => {
        console.log('Changing language to:', language);
        // TODO: Implement language change logic
    },
};
const useTypedTranslation = () => ({ t, i18n });

export { t, useTypedTranslation };
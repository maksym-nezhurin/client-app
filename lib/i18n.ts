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
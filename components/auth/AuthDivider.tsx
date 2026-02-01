import { useTypedTranslation } from '@/lib/i18n';

export function AuthDivider({ text }: { text?: string }) {
  const { t } = useTypedTranslation('client');
  const dividerText = text || t('auth.divider.or');
  
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border/50" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">{dividerText}</span>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';
import { useTypedTranslation } from '@/lib/i18n';

export default function AccountNotFound() {
  const { t } = useTypedTranslation('client');

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-muted bg-white p-8 text-center shadow">
      <div className="mb-4 text-6xl font-bold text-muted-foreground">404</div>
      <h1 className="mb-2 text-2xl font-semibold text-text-primary">
        {t('account_menu.not_found_title') || 'Page Not Found'}
      </h1>
      <p className="mb-6 text-muted-foreground">
        {t('account_menu.not_found_description') || 
          'The account page you\'re looking for doesn\'t exist or has been moved.'}
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href={ROUTES.ACCOUNT}>
            {t('account_menu.back_to_dashboard') || 'Back to Dashboard'}
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={ROUTES.HOME}>
            {t('account_menu.back_to_home') || 'Back to Home'}
          </Link>
        </Button>
      </div>
    </div>
  );
}

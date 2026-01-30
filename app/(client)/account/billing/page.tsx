'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useTypedTranslation } from '@/lib/i18n';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$9 / month',
    description: 'For getting started with listings.',
    features: ['Up to 3 listings', 'Basic analytics', 'Email support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29 / month',
    description: 'For active sellers with growing inventory.',
    features: ['Up to 15 listings', 'Advanced analytics', 'Priority support'],
  },
  {
    id: 'business',
    name: 'Business',
    price: '$79 / month',
    description: 'Best for dealerships and teams.',
    features: ['Unlimited listings', 'Team access', 'Dedicated manager'],
  },
];

export default function AccountBillingPage() {
  const { t } = useTypedTranslation();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleCheckout = async (planId: string) => {
    setError('');
    setLoadingPlan(planId);

    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ planId }),
      });

      const data = (await res.json().catch(() => ({}))) as { url?: string; message?: string };

      if (!res.ok || !data.url) {
        setError(data.message ?? 'Unable to start Stripe checkout.');
        setLoadingPlan(null);
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error('Error in handleCheckout:', err);
      setError(t('client.account_billing.checkout_error'));
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-muted bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold">{t('client.account_billing.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('client.account_billing.subtitle')}</p>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.id} className="flex flex-col rounded-lg border border-muted bg-white p-6 shadow">
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
              <p className="mt-4 text-2xl font-semibold">{plan.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </div>
            <Button
              className="mt-6"
              onClick={() => handleCheckout(plan.id)}
              disabled={loadingPlan === plan.id}
            >
              {loadingPlan === plan.id
                ? t('client.account_billing.redirecting')
                : t('client.account_billing.pay_with_stripe')}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

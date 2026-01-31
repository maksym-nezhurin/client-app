'use client';

import { CreditCard, Calendar, Download, Plus, Check } from 'lucide-react';
import { useTypedTranslation } from '@/lib/i18n';

export default function BillingSettingsPage() {
  const { t } = useTypedTranslation();

  const paymentMethods = [
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true,
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '5555',
      expiryMonth: '08',
      expiryYear: '2026',
      isDefault: false,
    },
  ];

  const billingHistory = [
    {
      id: '1',
      date: '2025-01-15',
      description: 'Premium Listing - BMW X5',
      amount: 29.99,
      status: 'paid',
    },
    {
      id: '2',
      date: '2025-01-01',
      description: 'Featured Listing - Audi A4',
      amount: 19.99,
      status: 'paid',
    },
    {
      id: '3',
      date: '2024-12-20',
      description: 'Premium Listing - Mercedes C-Class',
      amount: 29.99,
      status: 'paid',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('settings.billing.title') || 'Billing & Payment'}
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {t('settings.billing.description') || 'Manage your payment methods and billing history'}
            </p>
          </div>
        </div>
      </div>

      {/* Current Plan */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">Current Plan</h2>
        
        <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-primary/10 via-purple-50 to-blue-50 p-6 dark:border-slate-800 dark:from-primary/20 dark:via-purple-950/30 dark:to-blue-950/30">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Free Plan</h3>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950/50 dark:text-green-400">
                  Active
                </span>
              </div>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Basic features for individual sellers
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-500" />
                  Up to 3 active listings
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-500" />
                  Basic search visibility
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-500" />
                  Standard support
                </li>
              </ul>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">$0</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">per month</div>
            </div>
          </div>
          <button className="mt-6 w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg">
            Upgrade to Premium
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Payment Methods</h2>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Add Card
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-white p-3 dark:bg-slate-800">
                  <CreditCard className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium capitalize text-slate-900 dark:text-white">
                      {method.type}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      •••• {method.last4}
                    </span>
                    {method.isDefault && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                    <Calendar className="h-3 w-3" />
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <button className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800">
                    Set as Default
                  </button>
                )}
                <button className="rounded-lg px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-950/30">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 backdrop-blur-xl dark:bg-slate-900/80">
        <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">Billing History</h2>

        <div className="space-y-3">
          {billingHistory.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/30"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-white p-3 dark:bg-slate-800">
                  <Calendar className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    {invoice.description}
                  </div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {new Date(invoice.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    ${invoice.amount.toFixed(2)}
                  </div>
                  <div className="text-sm capitalize text-green-600 dark:text-green-500">
                    {invoice.status}
                  </div>
                </div>
                <button className="rounded-lg bg-slate-200 p-2 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700">
                  <Download className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

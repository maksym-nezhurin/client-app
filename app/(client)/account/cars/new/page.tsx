'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTypedTranslation } from '@/lib/i18n';

export default function NewCarPage() {
  const { t } = useTypedTranslation();
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [forSale, setForSale] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-muted bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold">{t('client.account_car_new.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('client.account_car_new.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-muted bg-white p-6 shadow">
        <Input
          id="title"
          label={t('client.account_car_new.listing_title')}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Tesla Model 3 Long Range"
          required
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            id="brand"
            label={t('client.account_car_new.brand')}
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            required
          />
          <Input
            id="model"
            label={t('client.account_car_new.model')}
            value={model}
            onChange={(event) => setModel(event.target.value)}
            required
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            id="year"
            label={t('client.account_car_new.year')}
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
          <Input
            id="price"
            label={t('client.account_car_new.price')}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="$18,900"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
            {t('client.account_car_new.description')}
          </label>
          <textarea
            id="description"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-400 dark:focus:border-blue-400"
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={forSale}
            onChange={(event) => setForSale(event.target.checked)}
          />
          {t('client.account_car_new.mark_for_sale')}
        </label>

        <Button type="submit" disabled={saving}>
          {saving ? t('client.account_car_new.saving') : t('client.account_car_new.save_listing')}
        </Button>
      </form>
    </div>
  );
}

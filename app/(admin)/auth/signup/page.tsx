'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AuthFormContainer } from '@/components/auth/AuthFormContainer';
import { FormField } from '@/components/auth/FormField';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useTypedTranslation } from '@/lib/i18n';
import { ROUTES } from '@/lib/routes';
import { cn } from '@/lib/utils';

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

function getPasswordStrength(password: string): PasswordStrength {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { score, label: 'auth.signup.password_strength.weak', color: 'bg-destructive' };
  if (score <= 3) return { score, label: 'auth.signup.password_strength.fair', color: 'bg-orange-500' };
  if (score <= 4) return { score, label: 'auth.signup.password_strength.good', color: 'bg-yellow-500' };
  return { score, label: 'auth.signup.password_strength.strong', color: 'bg-green-500' };
}

function SignupForm() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { t } = useTypedTranslation('client');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(ROUTES.ACCOUNT);
    }
  }, [isLoading, user, router]);

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('auth.signup.errors.first_name_required');
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = t('auth.signup.errors.first_name_min_length');
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('auth.signup.errors.last_name_required');
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = t('auth.signup.errors.last_name_min_length');
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = t('auth.signup.errors.username_required');
    } else if (formData.username.length < 3) {
      newErrors.username = t('auth.signup.errors.username_min_length');
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = t('auth.signup.errors.username_invalid');
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('auth.signup.errors.email_required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('auth.signup.errors.email_invalid');
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = t('auth.signup.errors.password_required');
    } else if (formData.password.length < 8) {
      newErrors.password = t('auth.signup.errors.password_min_length');
    } else if (passwordStrength.score < 3) {
      newErrors.password = t('auth.signup.errors.password_weak');
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.signup.errors.confirm_password_required');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.signup.errors.passwords_not_match');
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = t('auth.signup.errors.terms_required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.message ?? t('auth.signup.errors.registration_failed') });
        return;
      }

      // Redirect to login with success message
      router.push(`${ROUTES.AUTH.LOGIN}?registered=true`);
    } catch (error) {
      setErrors({ submit: t('auth.signup.errors.unexpected_error') });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <AuthFormContainer
      title={t('auth.signup.title')}
      subtitle={t('auth.signup.subtitle')}
      footer={{
        text: t('auth.signup.has_account'),
        linkText: t('auth.signup.sign_in_link'),
        linkHref: ROUTES.AUTH.LOGIN,
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="firstName"
            type="text"
            label={t('auth.signup.first_name_label')}
            placeholder={t('auth.signup.first_name_placeholder')}
            autoComplete="given-name"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            error={errors.firstName}
            icon={<User size={18} />}
            required
          />
          <FormField
            id="lastName"
            type="text"
            label={t('auth.signup.last_name_label')}
            placeholder={t('auth.signup.last_name_placeholder')}
            autoComplete="family-name"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            error={errors.lastName}
            icon={<User size={18} />}
            required
          />
        </div>

        <FormField
          id="username"
          type="text"
          label={t('auth.signup.username_label')}
          placeholder={t('auth.signup.username_placeholder')}
          autoComplete="username"
          value={formData.username}
          onChange={handleChange('username')}
          error={errors.username}
          icon={<User size={18} />}
          helperText={t('auth.signup.username_helper')}
          required
        />

        <FormField
          id="email"
          type="email"
          label={t('auth.signup.email_label')}
          placeholder={t('auth.signup.email_placeholder')}
          autoComplete="email"
          value={formData.email}
          onChange={handleChange('email')}
          error={errors.email}
          icon={<Mail size={18} />}
          required
        />

        <div>
          <FormField
            id="password"
            type="password"
            label={t('auth.signup.password_label')}
            placeholder={t('auth.signup.password_placeholder')}
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange('password')}
            onFocus={() => setShowPasswordStrength(true)}
            error={errors.password}
            icon={<Lock size={18} />}
            required
          />
          {showPasswordStrength && formData.password && (
            <div className="mt-2 space-y-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-1 flex-1 rounded-full bg-muted transition-all',
                      i < passwordStrength.score && passwordStrength.color
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {t('auth.signup.password_strength.label')} <span className="font-medium">{t(passwordStrength.label)}</span>
              </p>
            </div>
          )}
        </div>

        <FormField
          id="confirmPassword"
          type="password"
          label={t('auth.signup.confirm_password_label')}
          placeholder={t('auth.signup.confirm_password_placeholder')}
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={errors.confirmPassword}
          icon={
            formData.confirmPassword && formData.password === formData.confirmPassword ? (
              <CheckCircle2 size={18} className="text-green-500" />
            ) : formData.confirmPassword ? (
              <XCircle size={18} className="text-destructive" />
            ) : (
              <Lock size={18} />
            )
          }
          required
        />

        <div className="space-y-2">
          <label className="flex items-start space-x-2 text-sm">
            <input
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, agreeToTerms: e.target.checked }));
                if (errors.agreeToTerms) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.agreeToTerms;
                    return newErrors;
                  });
                }
              }}
              className={cn(
                'mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-primary/20',
                errors.agreeToTerms && 'border-destructive'
              )}
            />
            <span className="text-muted-foreground">
              {t('auth.signup.agree_terms')}{' '}
              <a href="/terms" className="text-primary hover:underline">
                {t('auth.signup.terms_of_service')}
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary hover:underline">
                {t('auth.signup.privacy_policy')}
              </a>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-xs font-medium text-destructive">{errors.agreeToTerms}</p>
          )}
        </div>

        {errors.submit && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {errors.submit}
          </div>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('auth.signup.creating_account')}
            </>
          ) : (
            t('auth.signup.create_account_button')
          )}
        </Button>
      </form>
    </AuthFormContainer>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}

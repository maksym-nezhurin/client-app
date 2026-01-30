'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AuthFormContainer } from '@/components/auth/AuthFormContainer';
import { FormField } from '@/components/auth/FormField';
import { useAuth } from '@/contexts/auth/AuthContext';
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

  if (score <= 2) return { score, label: 'Weak', color: 'bg-destructive' };
  if (score <= 3) return { score, label: 'Fair', color: 'bg-orange-500' };
  if (score <= 4) return { score, label: 'Good', color: 'bg-yellow-500' };
  return { score, label: 'Strong', color: 'bg-green-500' };
}

function SignupForm() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

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
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength.score < 3) {
      newErrors.password = 'Please choose a stronger password';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
        setErrors({ submit: data.message ?? 'Registration failed. Please try again.' });
        return;
      }

      // Redirect to login with success message
      router.push(`${ROUTES.AUTH.LOGIN}?registered=true`);
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
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
      title="Create an account"
      subtitle="Join us to start buying and selling cars"
      footer={{
        text: 'Already have an account?',
        linkText: 'Sign in',
        linkHref: ROUTES.AUTH.LOGIN,
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="firstName"
            type="text"
            label="First Name"
            placeholder="John"
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
            label="Last Name"
            placeholder="Doe"
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
          label="Username"
          placeholder="Choose a username"
          autoComplete="username"
          value={formData.username}
          onChange={handleChange('username')}
          error={errors.username}
          icon={<User size={18} />}
          helperText="3-20 characters, letters, numbers, and underscores only"
          required
        />

        <FormField
          id="email"
          type="email"
          label="Email"
          placeholder="your.email@example.com"
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
            label="Password"
            placeholder="Create a strong password"
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
                Password strength: <span className="font-medium">{passwordStrength.label}</span>
              </p>
            </div>
          )}
        </div>

        <FormField
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Repeat your password"
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
              I agree to the{' '}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
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
              Creating account...
            </>
          ) : (
            'Create account'
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

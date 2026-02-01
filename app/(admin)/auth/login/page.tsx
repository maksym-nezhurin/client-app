'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AuthFormContainer } from '@/components/auth/AuthFormContainer';
import { FormField } from '@/components/auth/FormField';
import { useAuth } from '@/contexts/auth/AuthContext';
import { ROUTES } from '@/lib/routes';
import { AuthDivider } from '@/components/auth/AuthDivider';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? searchParams.get('returnTo') ?? ROUTES.ACCOUNT;
  const { login, user, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(redirectTo);
    }
  }, [isLoading, user, redirectTo, router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username or email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      const result = await login({
        username: formData.username,
        password: formData.password,
      });

      if (!result.ok) {
        setErrors({ submit: result.error ?? 'Unable to login. Please try again.' });
        return;
      }

      router.replace(redirectTo);
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
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      footer={{
        text: "Don't have an account?",
        linkText: 'Sign up',
        linkHref: ROUTES.AUTH.SIGNUP,
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField
          id="username"
          type="text"
          label="Username or Email"
          placeholder="Enter your username or email"
          autoComplete="username"
          value={formData.username}
          onChange={handleChange('username')}
          error={errors.username}
          icon={<Mail size={18} />}
          required
        />

        <FormField
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange('password')}
          error={errors.password}
          icon={<Lock size={18} />}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }))
              }
              className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-muted-foreground">Remember me</span>
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {errors.submit && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
            {errors.submit}
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>

      {/* Future: Uncomment when social auth is ready */}
      <AuthDivider />
      <SocialLoginButtons 
        onGoogleLogin={() => console.log('Google login')}
        isLoading={isSubmitting}
      />
     
    </AuthFormContainer>
  );
}

export default function LoginPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

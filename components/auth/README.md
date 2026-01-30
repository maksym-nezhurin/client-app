# Authentication Components

Modern, reusable authentication components built with React, Next.js, and Tailwind CSS.

## Components

### AuthFormContainer
A beautiful, glassmorphic container for authentication forms.

**Props:**
- `title` (string): Main heading
- `subtitle` (string, optional): Subheading text
- `footer` (object, optional): Footer with link
  - `text`: Footer text
  - `linkText`: Link text
  - `linkHref`: Link URL
- `className` (string, optional): Additional CSS classes

**Example:**
```tsx
<AuthFormContainer
  title="Welcome back"
  subtitle="Sign in to your account"
  footer={{
    text: "Don't have an account?",
    linkText: 'Sign up',
    linkHref: '/auth/signup',
  }}
>
  {/* Your form content */}
</AuthFormContainer>
```

### FormField
Enhanced input field with built-in password visibility toggle, icons, and error handling.

**Props:**
- All standard HTML input props
- `label` (string): Field label
- `error` (string, optional): Error message
- `helperText` (string, optional): Helper text
- `icon` (ReactNode, optional): Icon to display

**Features:**
- Automatic password visibility toggle for `type="password"`
- Icon support with proper positioning
- Error state styling
- Hover and focus states
- Accessible labels

**Example:**
```tsx
<FormField
  id="email"
  type="email"
  label="Email"
  placeholder="your.email@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  icon={<Mail size={18} />}
  required
/>
```

### AuthDivider
Visual divider for separating form sections (e.g., "or continue with").

**Props:**
- `text` (string, optional): Divider text (default: "or")

**Example:**
```tsx
<AuthDivider text="or continue with" />
```

### SocialLoginButtons
Ready-to-use social login buttons (Google, GitHub).

**Props:**
- `onGoogleLogin` (function, optional): Google login handler
- `onGithubLogin` (function, optional): GitHub login handler
- `isLoading` (boolean, optional): Loading state

**Example:**
```tsx
<SocialLoginButtons 
  onGoogleLogin={() => handleSocialLogin('google')}
  onGithubLogin={() => handleSocialLogin('github')}
  isLoading={isSubmitting}
/>
```

## Design Features

- **Glassmorphism**: Modern glass effect with backdrop blur
- **Dark mode support**: Automatic theme switching
- **Responsive**: Mobile-first design
- **Accessible**: WCAG compliant with proper ARIA labels
- **Animations**: Smooth transitions and hover effects
- **Password strength indicator**: Visual feedback for password quality
- **Real-time validation**: Instant feedback on form errors

## Theme Integration

Components use Tailwind CSS design tokens and automatically adapt to:
- Light/dark mode
- Project color scheme
- Custom radius settings
- Typography scale

## Best Practices

1. **Form Validation**: Always validate on both client and server
2. **Error Handling**: Show specific, actionable error messages
3. **Loading States**: Disable buttons and show loading indicators during submission
4. **Accessibility**: Use proper labels, ARIA attributes, and keyboard navigation
5. **Security**: Never store passwords in state longer than necessary
6. **UX**: Clear passwords on successful submission, preserve username on errors

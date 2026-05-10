'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, LogIn, Copy, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface DemoCredential {
  role: string;
  email: string;
  password: string;
  badge: string;
  badgeColor: string;
}

const demoCredentials: DemoCredential[] = [
  {
    role: 'Administrador',
    email: 'admin@invencontrol.co',
    password: 'Admin@2026',
    badge: 'Admin',
    badgeColor: 'bg-gray-200 text-gray-800',
  },
  {
    role: 'Encargado de Bodega',
    email: 'bodega@invencontrol.co',
    password: 'Bodega@2026',
    badge: 'Bodega',
    badgeColor: 'bg-gray-200 text-gray-800',
  },
  {
    role: 'Emerson Capote',
    email: 'emerson.capote@invencontrol.co',
    password: 'Emerson@2026',
    badge: 'Usuario',
    badgeColor: 'bg-gray-200 text-gray-800',
  },
  {
    role: 'Carlos Alberto Muños',
    email: 'carlos.munos@invencontrol.co',
    password: 'Carlos@2026',
    badge: 'Usuario',
    badgeColor: 'bg-gray-200 text-gray-800',
  },
];

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '', remember: false },
  });

  const handleCopy = (value: string, key: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedField(key);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const handleAutofill = (cred: DemoCredential) => {
    setValue('email', cred.email, { shouldValidate: true });
    setValue('password', cred.password, { shouldValidate: true });
    setLoginError('');
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError('');

    // BACKEND INTEGRATION POINT: POST /api/auth/login
    await new Promise((r) => setTimeout(r, 1200));

    const isValid = demoCredentials.some(
      (c) => c.email === data.email && c.password === data.password
    );

    if (isValid) {
      setLoginSuccess(true);
      setTimeout(() => {
        window.location.href = '/inventory-dashboard';
      }, 800);
    } else {
      setLoginError(
        'Credenciales inválidas — usa las cuentas demo de abajo para ingresar.'
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 blob-green opacity-30" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <AppLogo size={44} />
            <span className="font-bold text-2xl text-white tracking-tight">
              InvenControl
            </span>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white leading-tight">
              Control total de tu
              <br />
              inventario
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-sm">
              Gestiona productos, registra entradas y salidas, y recibe alertas
              de stock en tiempo real desde un solo panel.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4">
            {[
              { value: '2,400+', label: 'Productos gestionados' },
              { value: '98%', label: 'Precisión de inventario' },
              { value: '0', label: 'Pérdidas por descontrol' },
              { value: '24/7', label: 'Alertas automáticas' },
            ].map((stat) => (
              <div
                key={`stat-${stat.label}`}
                className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
              >
                <p className="text-2xl font-bold text-white tabular-nums">
                  {stat.value}
                </p>
                <p className="text-white/70 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-white/60 text-xs">
          © 2026 InvenControl — Todos los derechos reservados
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <AppLogo size={36} />
            <span className="font-bold text-xl text-foreground">
              InvenControl
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Iniciar sesión
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Ingresa tus credenciales para acceder al sistema.
            </p>
          </div>

          {/* Success state */}
          {loginSuccess && (
            <div className="flex items-center gap-3 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 mb-6 fade-in">
              <CheckCircle2 size={18} className="text-gray-800 flex-shrink-0" />
              <p className="text-sm text-gray-800 font-medium">
                Acceso correcto. Redirigiendo…
              </p>
            </div>
          )}

          {/* Error state */}
          {loginError && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 fade-in">
              <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{loginError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="email" className="label-text">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="usuario@tienda.co"
                className={`input-field ${
                  errors.email ? 'border-red-400 focus:ring-red-400' : ''
                }`}
                {...register('email', {
                  required: 'El correo es obligatorio.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Ingresa un correo válido.',
                  },
                })}
              />
              {errors.email && (
                <p className="error-text">
                  <AlertCircle size={12} />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="label-text mb-0">
                  Contraseña
                </label>
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`input-field pr-10 ${
                    errors.password ? 'border-red-400 focus:ring-red-400' : ''
                  }`}
                  {...register('password', {
                    required: 'La contraseña es obligatoria.',
                    minLength: {
                      value: 6,
                      message: 'Mínimo 6 caracteres.',
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="error-text">
                  <AlertCircle size={12} />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-input accent-primary"
                {...register('remember')}
              />
              <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                Mantener sesión iniciada
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || loginSuccess}
              className="btn-primary w-full py-3"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Verificando…
                </span>
              ) : (
                <>
                  <LogIn size={16} />
                  Ingresar al sistema
                </>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
              <ShieldCheck size={15} className="text-muted-foreground" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Cuentas de demostración
              </p>
            </div>
            <div className="divide-y divide-border">
              {demoCredentials.map((cred) => (
                <div
                  key={`demo-${cred.email}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors"
                >
                  <span className={`badge ${cred.badgeColor} flex-shrink-0`}>
                    {cred.badge}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {cred.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {cred.password}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="tooltip-wrapper">
                      <button
                        type="button"
                        onClick={() => handleCopy(cred.email, `email-${cred.email}`)}
                        className="btn-ghost p-1.5"
                        aria-label="Copiar correo"
                      >
                        {copiedField === `email-${cred.email}` ? (
                          <CheckCircle2 size={14} className="text-primary" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                      <span className="tooltip-label">Copiar correo</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAutofill(cred)}
                      className="text-xs font-medium text-primary hover:text-black px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      Usar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            ¿No tienes cuenta?{' '}
            <Link
              href="/sign-up-login-screen"
              className="text-primary font-medium hover:underline"
            >
              Solicitar acceso
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
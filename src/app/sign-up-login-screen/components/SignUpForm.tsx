'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';

interface SignUpFormData {
  fullName: string;
  storeName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  terms: boolean;
}

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const passwordValue = watch('password', '');

  const onSubmit = async (_data: SignUpFormData) => {
    setIsLoading(true);
    // BACKEND INTEGRATION POINT: POST /api/auth/register
    await new Promise((r) => setTimeout(r, 1400));
    setIsLoading(false);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-primary flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 blob-green opacity-30" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <AppLogo size={44} />
            <span className="font-bold text-2xl text-white tracking-tight">
              InvenControl
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white leading-tight mb-4">
            Comienza a controlar tu inventario hoy
          </h1>
          <p className="text-white/80 leading-relaxed">
            Únete a cientos de tiendas que ya gestionan su stock de forma eficiente y sin errores.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              'Alertas automáticas de stock bajo',
              'Registro de entradas y salidas',
              'Reportes exportables a Excel',
              'Acceso desde cualquier navegador',
            ].map((feat) => (
              <li key={`feat-${feat}`} className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle2 size={16} className="text-white/60 flex-shrink-0" />
                {feat}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative z-10 text-white/60 text-xs">
          © 2026 InvenControl
        </p>
      </div>

      {/* Right form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-background overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <AppLogo size={36} />
            <span className="font-bold text-xl text-foreground">InvenControl</span>
          </div>

          {success ? (
            <div className="text-center space-y-4 fade-in">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                ¡Solicitud enviada!
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Tu solicitud de acceso fue recibida. El administrador la revisará y te notificará por correo.
              </p>
              <Link href="/" className="btn-primary inline-flex mt-4">
                Ir al inicio de sesión
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  Solicitar acceso
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Completa el formulario y el administrador activará tu cuenta.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                {/* Full name */}
                <div>
                  <label htmlFor="fullName" className="label-text">
                    Nombre completo
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Ej. Carlos Andrés Pérez"
                    className={`input-field ${errors.fullName ? 'border-red-400' : ''}`}
                    {...register('fullName', {
                      required: 'El nombre es obligatorio.',
                      minLength: { value: 3, message: 'Mínimo 3 caracteres.' },
                    })}
                  />
                  {errors.fullName && (
                    <p className="error-text">
                      <AlertCircle size={12} />
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Store name */}
                <div>
                  <label htmlFor="storeName" className="label-text">
                    Nombre del negocio
                  </label>
                  <input
                    id="storeName"
                    type="text"
                    placeholder="Ej. Supermercado La Esperanza"
                    className={`input-field ${errors.storeName ? 'border-red-400' : ''}`}
                    {...register('storeName', {
                      required: 'El nombre del negocio es obligatorio.',
                    })}
                  />
                  {errors.storeName && (
                    <p className="error-text">
                      <AlertCircle size={12} />
                      {errors.storeName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="reg-email" className="label-text">
                    Correo electrónico
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    placeholder="correo@negocio.co"
                    className={`input-field ${errors.email ? 'border-red-400' : ''}`}
                    {...register('email', {
                      required: 'El correo es obligatorio.',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Correo inválido.',
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

                {/* Role */}
                <div>
                  <label htmlFor="role" className="label-text">
                    Rol solicitado
                  </label>
                  <select
                    id="role"
                    className={`input-field ${errors.role ? 'border-red-400' : ''}`}
                    {...register('role', { required: 'Selecciona un rol.' })}
                  >
                    <option value="">Seleccionar rol…</option>
                    <option value="admin">Administrador</option>
                    <option value="bodega">Encargado de Bodega</option>
                    <option value="cajero">Cajero</option>
                  </select>
                  {errors.role && (
                    <p className="error-text">
                      <AlertCircle size={12} />
                      {errors.role.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="reg-password" className="label-text">
                    Contraseña
                  </label>
                  <p className="helper-text mb-1">
                    Mínimo 8 caracteres, una mayúscula y un número.
                  </p>
                  <div className="relative">
                    <input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={`input-field pr-10 ${errors.password ? 'border-red-400' : ''}`}
                      {...register('password', {
                        required: 'La contraseña es obligatoria.',
                        minLength: { value: 8, message: 'Mínimo 8 caracteres.' },
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*\d).+$/,
                          message: 'Debe incluir una mayúscula y un número.',
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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

                {/* Confirm password */}
                <div>
                  <label htmlFor="confirmPassword" className="label-text">
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={`input-field pr-10 ${errors.confirmPassword ? 'border-red-400' : ''}`}
                      {...register('confirmPassword', {
                        required: 'Confirma tu contraseña.',
                        validate: (v) =>
                          v === passwordValue || 'Las contraseñas no coinciden.',
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="error-text">
                      <AlertCircle size={12} />
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 mt-0.5 rounded border-input accent-primary"
                    {...register('terms', {
                      required: 'Debes aceptar los términos.',
                    })}
                  />
                  <div>
                    <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      Acepto los{' '}
                      <span className="text-primary hover:underline cursor-pointer">
                        Términos de Servicio
                      </span>{' '}
                      y la{' '}
                      <span className="text-primary hover:underline cursor-pointer">
                        Política de Privacidad
                      </span>
                    </label>
                    {errors.terms && (
                      <p className="error-text mt-0.5">
                        <AlertCircle size={12} />
                        {errors.terms.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full py-3"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Enviando solicitud…
                    </span>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      Solicitar acceso
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-muted-foreground mt-6">
                ¿Ya tienes cuenta?{' '}
                <Link href="/" className="text-primary font-medium hover:underline">
                  Iniciar sesión
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
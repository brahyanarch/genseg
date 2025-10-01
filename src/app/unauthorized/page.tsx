"use client";

import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/authContext';

const UnauthorizedPage = () => {
  const router = useRouter();
  const { authState } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md text-center">
        <svg 
          className="mx-auto h-16 w-16 text-red-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
        
        <h1 className="mt-4 text-xl font-bold text-gray-900">Acceso No Autorizado</h1>
        
        <p className="mt-2 text-gray-600">
          No tienes los permisos necesarios para acceder a esta página.
        </p>
        
        {authState.isAuthenticated && (
          <div className="mt-4 text-sm text-gray-500">
            <p>Usuario: {authState.datosUsuario?.nombre}</p>
            <p>Rol: {authState.rol?.n_rol}</p>
          </div>
        )}
        
        <div className="mt-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;

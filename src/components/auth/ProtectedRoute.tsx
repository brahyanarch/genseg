"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/authContext';

const ProtectedRoute = ({ 
  children, 
  requiredPermissions = [] 
}: {
  children: React.ReactNode;
  requiredPermissions?: string[];
}) => {
  const { authState, hasPermission } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    // Si está cargando, no hacer nada aún
    if (authState.loading) {
      return; 
    }

    // Si no está autenticado, redirigir al login
    if (!authState.isAuthenticated) {
      router.push('/login');
      return;
    }

    // Verificar permisos requeridos
    if (requiredPermissions.length > 0) {
      const hasAllRequiredPermissions = requiredPermissions.every(permission => 
        hasPermission(permission)
      );

      if (!hasAllRequiredPermissions) {
        router.push('/unauthorized');
      }
    }
  }, [authState.isAuthenticated, authState.loading, hasPermission, requiredPermissions, router]);

  // Mostrar nada mientras se verifica la autenticación
  if (authState.loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  // Si no está autenticado o no tiene los permisos, no mostrar nada (la redirección ocurrirá en el useEffect)
  if (!authState.isAuthenticated) {
    return null;
  }

  // Verificar permisos
  if (requiredPermissions.length > 0) {
    const hasAllRequiredPermissions = requiredPermissions.every(permission => 
      hasPermission(permission)
    );

    if (!hasAllRequiredPermissions) {
      return null;
    }
  }

  // Si está autenticado y tiene los permisos necesarios, mostrar los hijos
  return <>{children}</>;
};

export default ProtectedRoute;

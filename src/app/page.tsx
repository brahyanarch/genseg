"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/auth/authContext';

export default function Home() {
  const { authState } = useAuth();

  return (
    
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Sistema de Gestión con Control de Permisos</h1>
        
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-4">
            Este sistema demuestra la implementación de control de permisos basado en roles (RBAC) 
            según el esquema de base de datos proporcionado.
          </p>
          
          {authState.isAuthenticated ? (
            <div className="bg-green-50 p-4 rounded-md mb-6">
              <p className="text-green-700 font-medium">
                Sesión iniciada como: {authState.datosUsuario?.nombre} {authState.datosUsuario?.APaterno}
              </p>
              <p className="text-green-600">
                Rol: {authState.rol?.n_rol} | Subunidad: {authState.subunidad?.n_subuni}
              </p>
              <Link 
                href="/dashboard" 
                className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Ir al Dashboard
              </Link>
            </div>
          ) : (
            <div className="bg-blue-50 p-4 rounded-md mb-6">
              <p className="text-blue-700 mb-2">No has iniciado sesión</p>
              <Link 
                href="/login" 
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Iniciar Sesión
              </Link>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-3">Características Implementadas</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Autenticación de usuarios</li>
              <li>• Control de acceso basado en roles (RBAC)</li>
              <li>• Renderizado condicional según permisos</li>
              <li>• Protección de rutas</li>
              <li>• Gestión de sesiones</li>
              <li>• Interfaz adaptada a la estructura de la base de datos</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-3">Usuarios de Prueba</h2>
            <p className="text-gray-600 mb-3">
              Para probar diferentes niveles de permisos, puedes usar:
            </p>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="font-medium">Administrador</p>
                <p className="text-sm text-gray-600">Usuario: <span className="font-mono">admin</span></p>
                <p className="text-sm text-gray-600">Contraseña: <span className="font-mono">cualquiera</span></p>
                <p className="text-xs text-gray-500 mt-1">Acceso completo a todos los módulos</p>
              </div>
              
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="font-medium">Editor</p>
                <p className="text-sm text-gray-600">Usuario: <span className="font-mono">editor</span></p>
                <p className="text-sm text-gray-600">Contraseña: <span className="font-mono">cualquiera</span></p>
                <p className="text-xs text-gray-500 mt-1">Acceso a formularios, actividades y contenido</p>
              </div>
              
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="font-medium">Visualizador</p>
                <p className="text-sm text-gray-600">Usuario: <span className="font-mono">viewer</span></p>
                <p className="text-sm text-gray-600">Contraseña: <span className="font-mono">cualquiera</span></p>
                <p className="text-xs text-gray-500 mt-1">Acceso limitado solo a visualización</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

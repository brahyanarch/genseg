"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/auth/authContext";
import { useRouter } from "next/navigation";

// Componente para mostrar condicionalmente elementos según permisos
const PermissionGuard = ({
  requiredPermission,
  children,
}: {
  requiredPermission: string;
  children: React.ReactNode;
}) => {
  const { hasPermission } = useAuth();

  if (!hasPermission(requiredPermission)) {
    return null;
  }

  return <>{children}</>;
};

const DashboardPage = () => {
  const { authState, logout } = useAuth();
  const router = useRouter();

  if (!authState.isAuthenticated) {
    return null; // Esto no debería ocurrir si usamos ProtectedRoute
  }

  const handleLogout = () => {
    logout(); // limpia sesión
    router.push("/"); // redirige al login
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra superior */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            Panel de Administración
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Bienvenido, {authState.datosUsuario?.nombre}{" "}
              {authState.datosUsuario?.APaterno}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Barra lateral */}
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <nav className="mt-5 px-2">
            <div className="mb-4 px-4 py-2 text-xs font-semibold text-gray-600 uppercase">
              {authState.rol?.n_rol} - {authState.subunidad?.n_subuni}
            </div>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md font-medium"
                >
                  Dashboard
                </Link>
              </li>

              <PermissionGuard requiredPermission="VER_USUARIO">
                <li>
                  <Link
                    href="/dashboard/usuarios"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md"
                  >
                    Usuarios
                  </Link>
                </li>
              </PermissionGuard>

              <PermissionGuard requiredPermission="GESTIONAR_ROLES">
                <li>
                  <Link
                    href="/dashboard/roles"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md"
                  >
                    Roles y Permisos
                  </Link>
                </li>
              </PermissionGuard>

              <PermissionGuard requiredPermission="GESTIONAR_FORMULARIOS">
                <li>
                  <Link
                    href="/dashboard/formularios"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md"
                  >
                    Formularios
                  </Link>
                </li>
              </PermissionGuard>

              <PermissionGuard requiredPermission="GESTIONAR_ACTIVIDADES">
                <li>
                  <Link
                    href="/dashboard/actividades"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md"
                  >
                    Actividades
                  </Link>
                </li>
              </PermissionGuard>

              <PermissionGuard requiredPermission="GESTIONAR_CERTIFICADOS">
                <li>
                  <Link
                    href="/dashboard/certificados"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md"
                  >
                    Certificados
                  </Link>
                </li>
              </PermissionGuard>

              <PermissionGuard requiredPermission="GESTIONAR_CONTENIDO">
                <li>
                  <Link
                    href="/dashboard/contenido"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-md"
                  >
                    Contenido Público
                  </Link>
                </li>
              </PermissionGuard>
            </ul>
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Resumen del Sistema
            </h2>
            <PermissionGuard requiredPermission="ELIMINAR_USUARIO">
              <button className="mb-4 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                presioname
              </button>
              </PermissionGuard>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PermissionGuard requiredPermission="VER_USUARIO">
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="font-medium text-blue-700">Usuarios</h3>
                  <p className="mt-1 text-sm text-blue-600">
                    Gestión de usuarios y sus roles
                  </p>
                </div>
              </PermissionGuard>

              <PermissionGuard requiredPermission="GESTIONAR_FORMULARIOS">
                <div className="bg-green-50 p-4 rounded-md">
                  <h3 className="font-medium text-green-700">Formularios</h3>
                  <p className="mt-1 text-sm text-green-600">
                    Creación y gestión de formularios dinámicos
                  </p>
                </div>
              </PermissionGuard>

              <PermissionGuard requiredPermission="GESTIONAR_ACTIVIDADES">
                <div className="bg-purple-50 p-4 rounded-md">
                  <h3 className="font-medium text-purple-700">Actividades</h3>
                  <p className="mt-1 text-sm text-purple-600">
                    Gestión de actividades y participantes
                  </p>
                </div>
              </PermissionGuard>

              <PermissionGuard requiredPermission="GESTIONAR_CERTIFICADOS">
                <div className="bg-yellow-50 p-4 rounded-md">
                  <h3 className="font-medium text-yellow-700">Certificados</h3>
                  <p className="mt-1 text-sm text-yellow-600">
                    Generación y gestión de certificados
                  </p>
                </div>
              </PermissionGuard>

              <PermissionGuard requiredPermission="GESTIONAR_CONTENIDO">
                <div className="bg-red-50 p-4 rounded-md">
                  <h3 className="font-medium text-red-700">
                    Contenido Público
                  </h3>
                  <p className="mt-1 text-sm text-red-600">
                    Gestión de carrusel y anuncios
                  </p>
                </div>
              </PermissionGuard>
            </div>

            <div className="mt-8">
              <h3 className="text-md font-medium text-gray-900 mb-2">
                Información del Usuario
              </h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p>
                  <strong>Nombre:</strong> {authState.datosUsuario?.nombre}{" "}
                  {authState.datosUsuario?.APaterno}{" "}
                  {authState.datosUsuario?.AMaterno}
                </p>
                <p>
                  <strong>Email:</strong> {authState.datosUsuario?.email}
                </p>
                <p>
                  <strong>DNI:</strong> {authState.datosUsuario?.dni}
                </p>
                <p>
                  <strong>Rol:</strong> {authState.rol?.n_rol}
                </p>
                <p>
                  <strong>Subunidad:</strong> {authState.subunidad?.n_subuni}
                </p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Permisos Asignados:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <PermissionGuard requiredPermission="ELIMINAR_USUARIO">
                      <p className="text-green-300">
                        <strong>ID Usuario:</strong> Texto solo para los que
                        pueden ELIMINAR USUARIOS
                      </p>
                    </PermissionGuard>
                    {authState.permisos.map((permiso) => (
                      <span
                        key={permiso.id_per}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {permiso.n_per}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

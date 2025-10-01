"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, Permiso, User, DatosUsuario, Rol, SubUnidad } from './types';

// Valores iniciales para el contexto de autenticación
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  datosUsuario: null,
  rol: null,
  permisos: [],
  subunidad: null,
  loading: true,
  error: null
};

// Creación del contexto
const AuthContext = createContext<{
  authState: AuthState;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permissionName: string) => boolean;
}>({
  authState: initialState,
  login: async () => false,
  logout: () => {},
  hasPermission: () => false
});

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto de autenticación
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  // Efecto para cargar el estado de autenticación desde localStorage al iniciar
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const storedAuth = localStorage.getItem('authState');
        
        if (storedAuth) {
          const parsedAuth = JSON.parse(storedAuth);
          setAuthState({
            ...parsedAuth,
            loading: false
          });
        } else {
          setAuthState({
            ...initialState,
            loading: false
          });
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
        setAuthState({
          ...initialState,
          loading: false,
          error: 'Error al cargar el estado de autenticación'
        });
      }
    };

    loadAuthState();
  }, []);

  // Función para iniciar sesión
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      console.log('Login attempt for user:', username);
      // En un caso real, aquí se haría una llamada a la API
      // Simulamos una respuesta exitosa para demostración
      
      // Simular datos de usuario
      const mockUser: User = {
        id: 1,
        usuario: username,
        idrol: 1,
        idsubunidad: 1,
        iddatauser: 1,
        estado: true
      };
      
      const mockDatosUsuario: DatosUsuario = {
        iddatauser: 1,
        dni: '12345678',
        email: `${username}@example.com`,
        nombre: 'Usuario',
        APaterno: 'Demo',
        AMaterno: 'Test'
      };
      
      const mockRol: Rol = {
        id_rol: 1,
        n_rol: 'Administrador',
        abrev: 'ADMIN'
      };
      
      const mockSubunidad: SubUnidad = {
        id_subuni: 1,
        n_subuni: 'Departamento de Sistemas',
        abreviatura: 'DSIS'
      };
      
      // Simular permisos según el rol
      let mockPermisos: Permiso[] = [];
      
      if (username === 'admin') {
        mockPermisos = [
          { id_per: 1, n_per: 'CREAR_USUARIO', abreviatura: 'CU' },
          { id_per: 2, n_per: 'EDITAR_USUARIO', abreviatura: 'EU' },
          { id_per: 3, n_per: 'ELIMINAR_USUARIO', abreviatura: 'DU' },
          { id_per: 4, n_per: 'VER_USUARIO', abreviatura: 'VU' },
          { id_per: 5, n_per: 'GESTIONAR_ROLES', abreviatura: 'GR' },
          { id_per: 6, n_per: 'GESTIONAR_PERMISOS', abreviatura: 'GP' },
          { id_per: 7, n_per: 'GESTIONAR_FORMULARIOS', abreviatura: 'GF' },
          { id_per: 8, n_per: 'GESTIONAR_ACTIVIDADES', abreviatura: 'GA' },
          { id_per: 9, n_per: 'GESTIONAR_CERTIFICADOS', abreviatura: 'GC' },
          { id_per: 10, n_per: 'GESTIONAR_CONTENIDO', abreviatura: 'GCO' }
        ];
      } else if (username === 'editor') {
        mockPermisos = [
          { id_per: 4, n_per: 'VER_USUARIO', abreviatura: 'VU' },
          { id_per: 7, n_per: 'GESTIONAR_FORMULARIOS', abreviatura: 'GF' },
          { id_per: 8, n_per: 'GESTIONAR_ACTIVIDADES', abreviatura: 'GA' },
          { id_per: 10, n_per: 'GESTIONAR_CONTENIDO', abreviatura: 'GCO' }
        ];
      } else {
        mockPermisos = [
          { id_per: 4, n_per: 'VER_USUARIO', abreviatura: 'VU' }
        ];
      }
      
      // Actualizar el estado de autenticación
      const newAuthState: AuthState = {
        isAuthenticated: true,
        user: mockUser,
        datosUsuario: mockDatosUsuario,
        rol: mockRol,
        permisos: mockPermisos,
        subunidad: mockSubunidad,
        loading: false,
        error: null
      };
      
      setAuthState(newAuthState);
      
      // Guardar en localStorage
      localStorage.setItem('authState', JSON.stringify(newAuthState));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: 'Error al iniciar sesión. Verifica tus credenciales.'
      }));
      return false;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('authState');
    setAuthState({
      ...initialState,
      loading: false
    });
  };

  // Función para verificar si el usuario tiene un permiso específico
  const hasPermission = (permissionName: string): boolean => {
    if (!authState.isAuthenticated || !authState.permisos.length) {
      return false;
    }
    
    return authState.permisos.some(permiso => permiso.n_per === permissionName);
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

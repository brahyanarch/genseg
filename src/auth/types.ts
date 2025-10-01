// Definición de tipos para el sistema de autenticación y permisos

export interface User {
  id: number;
  usuario: string;
  idrol: number;
  idsubunidad: number;
  iddatauser: number;
  estado: boolean;
}

export interface DatosUsuario {
  iddatauser: number;
  dni: string;
  email: string;
  nombre: string;
  APaterno: string;
  AMaterno: string;
}

export interface Rol {
  id_rol: number;
  n_rol: string;
  abrev: string;
}

export interface Permiso {
  id_per: number;
  n_per: string;
  abreviatura: string;
}

export interface DetallePermiso {
  id_dper: number;
  id_rol: number;
  id_per: number;
  estado: boolean;
}

export interface SubUnidad {
  id_subuni: number;
  n_subuni: string;
  abreviatura: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  datosUsuario: DatosUsuario | null;
  rol: Rol | null;
  permisos: Permiso[];
  subunidad: SubUnidad | null;
  loading: boolean;
  error: string | null;
}

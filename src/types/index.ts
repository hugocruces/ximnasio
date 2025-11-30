// Types for the Ximnasio Gym Web Application

export interface User {
  id: string;
  email: string;
  password: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  foto?: string;
  tipoMembresia: 'basico' | 'premium' | 'vip';
  fechaExpiracion: string;
  objetivos?: string;
  role: 'user' | 'admin';
  fechaRegistro: string;
}

export interface Clase {
  id: string;
  nombre: string;
  descripcion: string;
  instructor: string;
  duracionMinutos: number;
  capacidadMaxima: number;
  imagen: string;
  categoria: 'cardio' | 'fuerza' | 'flexibilidad' | 'acuatico' | 'grupal';
}

export interface HorarioClase {
  id: string;
  claseId: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  inscritos: string[]; // Array of user IDs
  precio: number;
}

export interface Reserva {
  id: string;
  usuarioId: string;
  horarioClaseId: string;
  fechaReserva: string;
  estado: 'confirmada' | 'cancelada' | 'completada';
  precioPagado: number;
}

export interface Instalacion {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  caracteristicas: string[];
}

export interface PlanMembresia {
  id: string;
  nombre: string;
  precio: number;
  duracionMeses: number;
  caracteristicas: string[];
  destacado: boolean;
}

export interface PrecioClase {
  id: string;
  claseId: string;
  precioUnitario: number;
  precioPaquete5: number;
  precioPaquete10: number;
}

export interface HorarioGimnasio {
  dia: string;
  apertura: string;
  cierre: string;
}

export interface ContactoInfo {
  direccion: string;
  telefono: string;
  email: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
}

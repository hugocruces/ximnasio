import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, Clase, HorarioClase, Reserva, Instalacion, PlanMembresia } from '../types';
import {
  mockUsers,
  mockClases,
  mockHorarios,
  mockReservas,
  mockInstalaciones,
  mockPlanesMembresia
} from '../data/mockData';

interface DataContextType {
  // Data
  users: User[];
  clases: Clase[];
  horarios: HorarioClase[];
  reservas: Reserva[];
  instalaciones: Instalacion[];
  planesMembresia: PlanMembresia[];
  
  // User management (admin)
  addUser: (user: Omit<User, 'id' | 'fechaRegistro'>) => void;
  removeUser: (userId: string) => void;
  updateUserData: (userId: string, data: Partial<User>) => void;
  
  // Class management (admin)
  addClass: (clase: Omit<Clase, 'id'>) => void;
  updateClase: (claseId: string, data: Partial<Clase>) => void;
  removeClass: (claseId: string) => void;
  
  // Schedule management (admin)
  addHorario: (horario: Omit<HorarioClase, 'id' | 'inscritos'>) => void;
  updateHorario: (horarioId: string, data: Partial<HorarioClase>) => void;
  removeHorario: (horarioId: string) => void;
  
  // Booking management (users)
  createReserva: (usuarioId: string, horarioId: string) => { success: boolean; error?: string; reserva?: Reserva };
  cancelReserva: (reservaId: string) => { success: boolean; error?: string; penalizacion?: number };
  getReservasUsuario: (usuarioId: string) => Reserva[];
  
  // Helpers
  getClaseById: (claseId: string) => Clase | undefined;
  getHorarioById: (horarioId: string) => HorarioClase | undefined;
  getHorariosClase: (claseId: string) => HorarioClase[];
  getHorariosFecha: (fecha: string) => HorarioClase[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [clases, setClases] = useState<Clase[]>(mockClases);
  const [horarios, setHorarios] = useState<HorarioClase[]>(mockHorarios);
  const [reservas, setReservas] = useState<Reserva[]>(mockReservas);
  const [instalaciones] = useState<Instalacion[]>(mockInstalaciones);
  const [planesMembresia] = useState<PlanMembresia[]>(mockPlanesMembresia);

  // User management
  const addUser = (userData: Omit<User, 'id' | 'fechaRegistro'>) => {
    const newUser: User = {
      ...userData,
      id: `u${Date.now()}`,
      fechaRegistro: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [...prev, newUser]);
  };

  const removeUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    // También eliminar sus reservas
    setReservas(prev => prev.filter(r => r.usuarioId !== userId));
  };

  const updateUserData = (userId: string, data: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...data } : u));
  };

  // Class management
  const addClass = (claseData: Omit<Clase, 'id'>) => {
    const newClase: Clase = {
      ...claseData,
      id: `c${Date.now()}`
    };
    setClases(prev => [...prev, newClase]);
  };

  const updateClase = (claseId: string, data: Partial<Clase>) => {
    setClases(prev => prev.map(c => c.id === claseId ? { ...c, ...data } : c));
  };

  const removeClass = (claseId: string) => {
    setClases(prev => prev.filter(c => c.id !== claseId));
    // También eliminar horarios asociados
    setHorarios(prev => prev.filter(h => h.claseId !== claseId));
  };

  // Schedule management
  const addHorario = (horarioData: Omit<HorarioClase, 'id' | 'inscritos'>) => {
    const newHorario: HorarioClase = {
      ...horarioData,
      id: `h${Date.now()}`,
      inscritos: []
    };
    setHorarios(prev => [...prev, newHorario]);
  };

  const updateHorario = (horarioId: string, data: Partial<HorarioClase>) => {
    setHorarios(prev => prev.map(h => h.id === horarioId ? { ...h, ...data } : h));
  };

  const removeHorario = (horarioId: string) => {
    setHorarios(prev => prev.filter(h => h.id !== horarioId));
    // Cancelar reservas asociadas
    setReservas(prev => prev.map(r => 
      r.horarioClaseId === horarioId ? { ...r, estado: 'cancelada' as const } : r
    ));
  };

  // Booking management
  const createReserva = (usuarioId: string, horarioId: string) => {
    const horario = horarios.find(h => h.id === horarioId);
    const clase = horario ? clases.find(c => c.id === horario.claseId) : null;

    if (!horario || !clase) {
      return { success: false, error: 'Horario no encontrado' };
    }

    if (horario.inscritos.length >= clase.capacidadMaxima) {
      return { success: false, error: 'La clase está completa' };
    }

    if (horario.inscritos.includes(usuarioId)) {
      return { success: false, error: 'Ya estás inscrito en esta clase' };
    }

    // Crear reserva
    const newReserva: Reserva = {
      id: `r${Date.now()}`,
      usuarioId,
      horarioClaseId: horarioId,
      fechaReserva: new Date().toISOString().split('T')[0],
      estado: 'confirmada',
      precioPagado: horario.precio
    };

    setReservas(prev => [...prev, newReserva]);
    
    // Actualizar inscritos en horario
    setHorarios(prev => prev.map(h => 
      h.id === horarioId ? { ...h, inscritos: [...h.inscritos, usuarioId] } : h
    ));

    return { success: true, reserva: newReserva };
  };

  const cancelReserva = (reservaId: string) => {
    const reserva = reservas.find(r => r.id === reservaId);
    if (!reserva) {
      return { success: false, error: 'Reserva no encontrada' };
    }

    const horario = horarios.find(h => h.id === reserva.horarioClaseId);
    if (!horario) {
      return { success: false, error: 'Horario no encontrado' };
    }

    // Calcular tiempo hasta la clase
    const ahora = new Date();
    const fechaClase = new Date(`${horario.fecha}T${horario.horaInicio}`);
    const minutosHastaClase = (fechaClase.getTime() - ahora.getTime()) / (1000 * 60);

    let penalizacion = 0;
    if (minutosHastaClase < 60) {
      penalizacion = horario.precio / 2;
    }

    // Actualizar reserva
    setReservas(prev => prev.map(r => 
      r.id === reservaId ? { ...r, estado: 'cancelada' as const } : r
    ));

    // Quitar de inscritos
    setHorarios(prev => prev.map(h => 
      h.id === reserva.horarioClaseId 
        ? { ...h, inscritos: h.inscritos.filter(id => id !== reserva.usuarioId) }
        : h
    ));

    return { 
      success: true, 
      penalizacion,
      error: penalizacion > 0 ? `Cancelación con menos de 1 hora. Penalización: ${penalizacion}€` : undefined
    };
  };

  const getReservasUsuario = (usuarioId: string) => {
    return reservas.filter(r => r.usuarioId === usuarioId);
  };

  // Helpers
  const getClaseById = (claseId: string) => clases.find(c => c.id === claseId);
  const getHorarioById = (horarioId: string) => horarios.find(h => h.id === horarioId);
  const getHorariosClase = (claseId: string) => horarios.filter(h => h.claseId === claseId);
  const getHorariosFecha = (fecha: string) => horarios.filter(h => h.fecha === fecha);

  return (
    <DataContext.Provider
      value={{
        users,
        clases,
        horarios,
        reservas,
        instalaciones,
        planesMembresia,
        addUser,
        removeUser,
        updateUserData,
        addClass,
        updateClase,
        removeClass,
        addHorario,
        updateHorario,
        removeHorario,
        createReserva,
        cancelReserva,
        getReservasUsuario,
        getClaseById,
        getHorarioById,
        getHorariosClase,
        getHorariosFecha
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData debe usarse dentro de DataProvider');
  }
  return context;
}

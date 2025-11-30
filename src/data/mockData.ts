import type { User, Clase, HorarioClase, Reserva, Instalacion, PlanMembresia, PrecioClase, HorarioGimnasio, ContactoInfo } from '../types';

// Usuarios de ejemplo
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@ximnasio.com',
    password: 'admin123',
    nombre: 'Carlos',
    apellidos: 'García López',
    telefono: '612345678',
    tipoMembresia: 'vip',
    fechaExpiracion: '2026-12-31',
    objetivos: 'Mantener el gimnasio funcionando perfectamente',
    role: 'admin',
    fechaRegistro: '2020-01-01'
  },
  {
    id: '2',
    email: 'usuario@ejemplo.com',
    password: 'user123',
    nombre: 'María',
    apellidos: 'Fernández Ruiz',
    telefono: '623456789',
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    tipoMembresia: 'premium',
    fechaExpiracion: '2025-06-30',
    objetivos: 'Perder peso y ganar flexibilidad',
    role: 'user',
    fechaRegistro: '2024-01-15'
  },
  {
    id: '3',
    email: 'pedro@ejemplo.com',
    password: 'pedro123',
    nombre: 'Pedro',
    apellidos: 'Martínez Soto',
    telefono: '634567890',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    tipoMembresia: 'basico',
    fechaExpiracion: '2025-03-31',
    objetivos: 'Ganar masa muscular',
    role: 'user',
    fechaRegistro: '2024-06-01'
  },
  {
    id: '4',
    email: 'ana@ejemplo.com',
    password: 'ana123',
    nombre: 'Ana',
    apellidos: 'López Vega',
    telefono: '645678901',
    tipoMembresia: 'vip',
    fechaExpiracion: '2026-01-31',
    objetivos: 'Preparación para triatlón',
    role: 'user',
    fechaRegistro: '2023-09-10'
  }
];

// Clases disponibles
export const mockClases: Clase[] = [
  {
    id: '1',
    nombre: 'Yoga',
    descripcion: 'Clase de yoga para mejorar flexibilidad, equilibrio y bienestar mental. Apta para todos los niveles.',
    instructor: 'Laura Sánchez',
    duracionMinutos: 60,
    capacidadMaxima: 20,
    imagen: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    categoria: 'flexibilidad'
  },
  {
    id: '2',
    nombre: 'CrossFit',
    descripcion: 'Entrenamiento funcional de alta intensidad que combina ejercicios de fuerza, resistencia y cardio.',
    instructor: 'Miguel Torres',
    duracionMinutos: 45,
    capacidadMaxima: 15,
    imagen: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    categoria: 'fuerza'
  },
  {
    id: '3',
    nombre: 'Spinning',
    descripcion: 'Clase de ciclismo indoor con música motivadora. Quema calorías y mejora tu resistencia cardiovascular.',
    instructor: 'Elena Rodríguez',
    duracionMinutos: 50,
    capacidadMaxima: 25,
    imagen: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=800',
    categoria: 'cardio'
  },
  {
    id: '4',
    nombre: 'Pilates',
    descripcion: 'Fortalece tu core y mejora tu postura con ejercicios controlados y precisos.',
    instructor: 'Carmen Díaz',
    duracionMinutos: 55,
    capacidadMaxima: 18,
    imagen: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
    categoria: 'flexibilidad'
  },
  {
    id: '5',
    nombre: 'Aquagym',
    descripcion: 'Ejercicio aeróbico en el agua. Ideal para personas con problemas articulares o que buscan bajo impacto.',
    instructor: 'Roberto Navarro',
    duracionMinutos: 45,
    capacidadMaxima: 20,
    imagen: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800',
    categoria: 'acuatico'
  },
  {
    id: '6',
    nombre: 'Zumba',
    descripcion: 'Baila al ritmo de música latina mientras quemas calorías y te diviertes.',
    instructor: 'Patricia Molina',
    duracionMinutos: 60,
    capacidadMaxima: 30,
    imagen: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=800',
    categoria: 'grupal'
  },
  {
    id: '7',
    nombre: 'HIIT',
    descripcion: 'Entrenamiento de intervalos de alta intensidad para maximizar la quema de grasa.',
    instructor: 'Diego Hernández',
    duracionMinutos: 30,
    capacidadMaxima: 20,
    imagen: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    categoria: 'cardio'
  },
  {
    id: '8',
    nombre: 'Boxeo Fitness',
    descripcion: 'Aprende técnicas de boxeo mientras mejoras tu condición física y liberas estrés.',
    instructor: 'Javier Ruiz',
    duracionMinutos: 60,
    capacidadMaxima: 16,
    imagen: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    categoria: 'fuerza'
  }
];

// Generar horarios para los próximos 7 días
const generarHorarios = (): HorarioClase[] => {
  const horarios: HorarioClase[] = [];
  const hoy = new Date();
  
  const horasDisponibles = ['07:00', '09:00', '11:00', '13:00', '17:00', '19:00', '20:30'];
  
  let horarioId = 1;
  
  for (let dia = 0; dia < 7; dia++) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + dia);
    const fechaStr = fecha.toISOString().split('T')[0];
    
    mockClases.forEach((clase, index) => {
      // Cada clase tiene 2-3 horarios por día
      const horasClase = horasDisponibles.filter((_, i) => (i + index) % 3 === 0);
      
      horasClase.forEach(hora => {
        const [horaNum, minNum] = hora.split(':').map(Number);
        const horaFin = new Date(2000, 0, 1, horaNum, minNum + clase.duracionMinutos);
        const horaFinStr = `${horaFin.getHours().toString().padStart(2, '0')}:${horaFin.getMinutes().toString().padStart(2, '0')}`;
        
        // Simular algunos inscritos aleatorios
        const inscritos: string[] = [];
        if (Math.random() > 0.5) inscritos.push('2');
        if (Math.random() > 0.7) inscritos.push('3');
        if (Math.random() > 0.8) inscritos.push('4');
        
        horarios.push({
          id: `h${horarioId++}`,
          claseId: clase.id,
          fecha: fechaStr,
          horaInicio: hora,
          horaFin: horaFinStr,
          inscritos,
          precio: clase.categoria === 'acuatico' ? 12 : 8
        });
      });
    });
  }
  
  return horarios;
};

export const mockHorarios: HorarioClase[] = generarHorarios();

// Reservas de ejemplo
export const mockReservas: Reserva[] = [
  {
    id: 'r1',
    usuarioId: '2',
    horarioClaseId: 'h1',
    fechaReserva: '2024-11-28',
    estado: 'confirmada',
    precioPagado: 8
  },
  {
    id: 'r2',
    usuarioId: '2',
    horarioClaseId: 'h5',
    fechaReserva: '2024-11-28',
    estado: 'confirmada',
    precioPagado: 12
  }
];

// Instalaciones
export const mockInstalaciones: Instalacion[] = [
  {
    id: '1',
    nombre: 'Sala de Musculación',
    descripcion: 'Equipada con las últimas máquinas de fuerza y peso libre. Más de 50 estaciones de entrenamiento.',
    imagen: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    caracteristicas: ['Máquinas Technogym', 'Peso libre', 'Espejos de pared completa', 'Aire acondicionado']
  },
  {
    id: '2',
    nombre: 'Zona Cardio',
    descripcion: 'Cintas de correr, elípticas, bicicletas y máquinas de remo con pantallas individuales.',
    imagen: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800',
    caracteristicas: ['30+ máquinas cardio', 'Pantallas HD individuales', 'Ventilación premium', 'Vista panorámica']
  },
  {
    id: '3',
    nombre: 'Piscina Climatizada',
    descripcion: 'Piscina de 25 metros con carriles para natación y zona de aquagym.',
    imagen: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800',
    caracteristicas: ['25 metros', '6 carriles', 'Agua climatizada 28°C', 'Socorrista permanente']
  },
  {
    id: '4',
    nombre: 'Sauna y Spa',
    descripcion: 'Zona de relax con sauna finlandesa, baño turco y jacuzzi.',
    imagen: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
    caracteristicas: ['Sauna finlandesa', 'Baño turco', 'Jacuzzi 8 personas', 'Duchas de contraste']
  },
  {
    id: '5',
    nombre: 'Salas de Clases Grupales',
    descripcion: 'Tres salas polivalentes equipadas para todo tipo de clases dirigidas.',
    imagen: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    caracteristicas: ['Suelo flotante', 'Espejos', 'Equipo de sonido', 'Material incluido']
  },
  {
    id: '6',
    nombre: 'Zona de Entrenamiento Funcional',
    descripcion: 'Espacio dedicado al entrenamiento funcional y CrossFit con todo el equipamiento necesario.',
    imagen: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    caracteristicas: ['Racks de sentadillas', 'Barras olímpicas', 'Kettlebells', 'Cuerdas y TRX']
  }
];

// Planes de membresía
export const mockPlanesMembresia: PlanMembresia[] = [
  {
    id: '1',
    nombre: 'Básico',
    precio: 29.99,
    duracionMeses: 1,
    caracteristicas: [
      'Acceso a sala de musculación',
      'Acceso a zona cardio',
      'Horario: 8:00 - 15:00',
      'Taquilla compartida'
    ],
    destacado: false
  },
  {
    id: '2',
    nombre: 'Premium',
    precio: 49.99,
    duracionMeses: 1,
    caracteristicas: [
      'Acceso a todas las instalaciones',
      'Horario completo',
      '2 clases grupales incluidas/semana',
      'Taquilla individual',
      'Acceso a sauna y spa'
    ],
    destacado: true
  },
  {
    id: '3',
    nombre: 'VIP',
    precio: 79.99,
    duracionMeses: 1,
    caracteristicas: [
      'Acceso ilimitado total',
      'Clases grupales ilimitadas',
      'Acceso 24/7',
      'Taquilla premium con carga',
      'Sauna y spa ilimitado',
      '1 sesión de entrenador personal/mes',
      'Parking gratuito',
      'Invitados: 2/mes gratis'
    ],
    destacado: false
  }
];

// Precios de clases sueltas
export const mockPreciosClases: PrecioClase[] = [
  { id: '1', claseId: '1', precioUnitario: 8, precioPaquete5: 35, precioPaquete10: 60 },
  { id: '2', claseId: '2', precioUnitario: 10, precioPaquete5: 45, precioPaquete10: 80 },
  { id: '3', claseId: '3', precioUnitario: 8, precioPaquete5: 35, precioPaquete10: 60 },
  { id: '4', claseId: '4', precioUnitario: 8, precioPaquete5: 35, precioPaquete10: 60 },
  { id: '5', claseId: '5', precioUnitario: 12, precioPaquete5: 55, precioPaquete10: 100 },
  { id: '6', claseId: '6', precioUnitario: 8, precioPaquete5: 35, precioPaquete10: 60 },
  { id: '7', claseId: '7', precioUnitario: 8, precioPaquete5: 35, precioPaquete10: 60 },
  { id: '8', claseId: '8', precioUnitario: 10, precioPaquete5: 45, precioPaquete10: 80 }
];

// Horarios del gimnasio
export const horarioGimnasio: HorarioGimnasio[] = [
  { dia: 'Lunes', apertura: '06:00', cierre: '23:00' },
  { dia: 'Martes', apertura: '06:00', cierre: '23:00' },
  { dia: 'Miércoles', apertura: '06:00', cierre: '23:00' },
  { dia: 'Jueves', apertura: '06:00', cierre: '23:00' },
  { dia: 'Viernes', apertura: '06:00', cierre: '23:00' },
  { dia: 'Sábado', apertura: '08:00', cierre: '21:00' },
  { dia: 'Domingo', apertura: '08:00', cierre: '14:00' }
];

// Información de contacto
export const contactoInfo: ContactoInfo = {
  direccion: 'Calle Fitness 123, 28001 Madrid',
  telefono: '912 345 678',
  email: 'info@ximnasio.com',
  coordenadas: {
    lat: 40.4168,
    lng: -3.7038
  }
};

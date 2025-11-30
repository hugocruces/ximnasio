# Ximnasio - Aplicación Web para Gimnasio

Una aplicación web completa para gestionar un gimnasio, con página pública, intranet de usuarios y panel de administración.

## 🎯 Características

### Página Pública
- **Inicio**: Página principal con presentación del gimnasio
- **Clases**: Catálogo de clases disponibles con filtros por categoría
- **Instalaciones**: Galería de instalaciones con descripciones detalladas
- **Precios**: Planes de membresía y precios de clases individuales
- **Contacto**: Formulario de contacto, información y horarios

### Intranet de Usuarios
- **Dashboard**: Panel personal con estadísticas y próximas clases
- **Mi Perfil**: Edición de información personal
- **Mis Reservas**: Gestión de reservas de clases
- **Reservar Clases**: Explorar y reservar clases disponibles

### Panel de Administración
- **Dashboard Admin**: Estadísticas y resumen del gimnasio
- **Gestión de Usuarios**: Añadir, editar y eliminar usuarios
- **Gestión de Clases**: Administrar clases y horarios

## 🚀 Tecnologías Utilizadas

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **React Router** - Navegación
- **Tailwind CSS** - Estilos
- **Lucide React** - Iconos

## 📦 Instalación y Uso

\`\`\`bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173

# Compilar para producción
npm run build
\`\`\`

## 🔐 Credenciales de Prueba

### Usuario Administrador
- **Email**: admin@ximnasio.com
- **Contraseña**: admin123

### Usuario Normal
- **Email**: usuario@ejemplo.com
- **Contraseña**: user123

Otros usuarios de prueba:
- pedro@ejemplo.com / pedro123
- ana@ejemplo.com / ana123

## 🎨 Características de Diseño

- Diseño responsive y adaptable a móviles
- Esquema de colores rojo/gris para la marca Ximnasio
- Logo personalizado con "X" estilizada
- Componentes reutilizables y modulares
- Animaciones suaves y transiciones
- Interfaz intuitiva y fácil de navegar

## 📋 Funcionalidades Principales

### Sistema de Autenticación
- Login/Logout
- Rutas protegidas
- Roles de usuario (admin/user)
- Persistencia de sesión con localStorage

### Gestión de Clases
- 8 tipos de clases diferentes (Yoga, CrossFit, Spinning, Pilates, Aquagym, Zumba, HIIT, Boxeo)
- Horarios dinámicos para los próximos 7 días
- Capacidad máxima y control de aforo
- Categorización por tipo de actividad

### Sistema de Reservas
- Reserva de clases
- Cancelación con política de penalización
- Notificación de cancelación tardía (menos de 1 hora = 50% del precio)
- Historial de reservas

### Administración
- CRUD completo de usuarios
- Gestión de membresías y fechas de expiración
- Visualización de ocupación de clases
- Estadísticas en tiempo real

## 🗂️ Estructura del Proyecto

\`\`\`
src/
├── components/       # Componentes reutilizables
│   ├── ui/          # Componentes de interfaz
│   └── ProtectedRoute.tsx
├── context/         # Contextos de React
│   ├── AuthContext.tsx
│   └── DataContext.tsx
├── data/            # Datos mock
│   └── mockData.ts
├── pages/           # Páginas de la aplicación
│   ├── HomePage.tsx
│   ├── ClasesPage.tsx
│   ├── InstalacionesPage.tsx
│   ├── PreciosPage.tsx
│   ├── ContactoPage.tsx
│   ├── LoginPage.tsx
│   ├── user/        # Páginas de usuario
│   └── admin/       # Páginas de admin
├── types/           # Definiciones TypeScript
│   └── index.ts
├── App.tsx          # Componente principal con rutas
└── main.tsx         # Punto de entrada
\`\`\`

## 🔮 Próximas Mejoras Posibles

- Integración con backend real (Node.js, Python, etc.)
- Base de datos para persistencia de datos
- Sistema de pagos online
- Notificaciones por email
- Calendario interactivo
- Sistema de valoraciones y comentarios
- Chat en vivo con soporte
- App móvil nativa

## 📝 Notas Importantes

- Esta es una aplicación **frontend-only** con datos mock
- Los datos se almacenan temporalmente en la memoria y localStorage
- Las imágenes utilizan URLs de Unsplash
- Política de cancelación: menos de 1 hora = penalización del 50%
- Solo los administradores pueden añadir/eliminar usuarios

---

Desarrollado con ❤️ usando React, TypeScript y Tailwind CSS

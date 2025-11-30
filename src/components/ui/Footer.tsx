import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { Logo } from './Logo';
import { horarioGimnasio, contactoInfo } from '../../data/mockData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <Logo size="lg" variant="full" className="[&_span]:text-white [&_.text-gray-800]:text-gray-300" />
            <p className="text-gray-400 text-sm">
              Tu gimnasio de confianza en Madrid. Más de 10 años ayudándote a alcanzar tus metas fitness.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/clases" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Nuestras Clases
                </Link>
              </li>
              <li>
                <Link to="/instalaciones" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Instalaciones
                </Link>
              </li>
              <li>
                <Link to="/precios" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Tarifas y Precios
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-500" />
              Horarios
            </h3>
            <ul className="space-y-1 text-sm">
              {horarioGimnasio.map(h => (
                <li key={h.dia} className="flex justify-between text-gray-400">
                  <span>{h.dia}</span>
                  <span>{h.apertura} - {h.cierre}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{contactoInfo.direccion}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span>{contactoInfo.telefono}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span>{contactoInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
          <p>© {currentYear} Ximnasio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

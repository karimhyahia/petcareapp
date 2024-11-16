import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Calendar, 
  Clock, 
  Image, 
  ArrowRight
} from 'lucide-react';
import Header from '../components/Landing/Header';
import Footer from '../components/Landing/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-600 tracking-tight">
              Der perfekte Begleiter für
              <span className="text-primary-400 block mt-2">Ihre Haustiere</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Verwalten Sie alle wichtigen Informationen Ihrer Haustiere an einem Ort. 
              Von Fütterungszeiten bis zu Tierarztterminen – alles in einer intuitiven App.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-3"
              >
                Jetzt kostenlos starten
              </Link>
              <Link
                to="/login"
                className="btn-outline text-lg px-8 py-3"
              >
                Anmelden
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative background */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -z-10">
          <div className="w-[1000px] h-[1000px] rounded-full bg-primary-50/50"></div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-primary-400 mb-2">10.000+</div>
              <div className="text-gray-600">Zufriedene Tierbesitzer</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary-400 mb-2">50.000+</div>
              <div className="text-gray-600">Verwaltete Haustiere</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary-400 mb-2">4.9/5</div>
              <div className="text-gray-600">Durchschnittliche Bewertung</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-600">
              Alles was Sie für die Pflege Ihrer Haustiere brauchen
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Entwickelt von Tierliebhabern für Tierliebhaber
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Calendar className="h-12 w-12 text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold text-secondary-600 mb-2">
                Terminverwaltung
              </h3>
              <p className="text-gray-600">
                Behalten Sie alle Tierarzttermine und Impfungen im Blick
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Clock className="h-12 w-12 text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold text-secondary-600 mb-2">
                Fütterungszeiten
              </h3>
              <p className="text-gray-600">
                Erstellen Sie individuelle Fütterungspläne für jedes Haustier
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Image className="h-12 w-12 text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold text-secondary-600 mb-2">
                Fotogalerie
              </h3>
              <p className="text-gray-600">
                Sammeln Sie besondere Momente in der digitalen Fotogalerie
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Shield className="h-12 w-12 text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold text-secondary-600 mb-2">
                Versicherungen
              </h3>
              <p className="text-gray-600">
                Verwalten Sie Versicherungsdokumente und Policen
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-600">
              Das sagen unsere Nutzer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                  alt="Sarah M."
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <div className="font-semibold text-secondary-600">Sarah M.</div>
                  <div className="text-sm text-gray-500">Hundebesitzerin</div>
                </div>
              </div>
              <p className="text-gray-600">
                "Endlich habe ich alle Informationen zu meinen Hunden an einem Ort. 
                Die App ist super übersichtlich und einfach zu bedienen."
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="Thomas K."
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <div className="font-semibold text-secondary-600">Thomas K.</div>
                  <div className="text-sm text-gray-500">Katzenbesitzer</div>
                </div>
              </div>
              <p className="text-gray-600">
                "Die Erinnerungen an Fütterungszeiten sind gold wert. 
                Meine Katzen sind jetzt viel ausgeglichener."
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
                  alt="Lisa B."
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <div className="font-semibold text-secondary-600">Lisa B.</div>
                  <div className="text-sm text-gray-500">Tierärztin</div>
                </div>
              </div>
              <p className="text-gray-600">
                "Als Tierärztin empfehle ich die App allen meinen Kunden. 
                Die Terminverwaltung ist durchdacht und hilfreich."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Starten Sie noch heute – kostenlos!
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Testen Sie alle Premium-Funktionen 30 Tage lang kostenlos. 
              Keine Kreditkarte erforderlich.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3 text-lg font-medium text-primary-400 bg-white rounded-md hover:bg-gray-50 transition-colors"
            >
              Jetzt registrieren
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
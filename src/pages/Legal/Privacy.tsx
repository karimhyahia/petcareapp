import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center text-primary-400 hover:text-primary-500 mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Zurück zur Startseite
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-secondary-600 mb-8">Datenschutzerklärung</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-secondary-600 mb-3">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-lg font-medium text-secondary-600 mt-4 mb-2">Allgemeine Hinweise</h3>
              <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-secondary-600 mb-3">2. Datenerfassung auf unserer Website</h2>
              
              <h3 className="text-lg font-medium text-secondary-600 mt-4 mb-2">Wer ist verantwortlich für die Datenerfassung?</h3>
              <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>

              <h3 className="text-lg font-medium text-secondary-600 mt-4 mb-2">Wie erfassen wir Ihre Daten?</h3>
              <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
              <p className="mt-2">Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).</p>

              <h3 className="text-lg font-medium text-secondary-600 mt-4 mb-2">Wofür nutzen wir Ihre Daten?</h3>
              <p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-secondary-600 mb-3">3. Ihre Rechte</h2>
              <p>Sie haben jederzeit das Recht:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Auskunft über Ihre gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)</li>
                <li>Die Berichtigung unrichtiger personenbezogener Daten zu verlangen (Art. 16 DSGVO)</li>
                <li>Die Löschung Ihrer gespeicherten personenbezogenen Daten zu verlangen (Art. 17 DSGVO)</li>
                <li>Die Einschränkung der Datenverarbeitung zu verlangen (Art. 18 DSGVO)</li>
                <li>Der Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Der Verarbeitung Ihrer personenbezogenen Daten zu widersprechen (Art. 21 DSGVO)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-secondary-600 mb-3">4. Analyse-Tools und Tools von Drittanbietern</h2>
              <p>Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen.</p>
              <p className="mt-2">Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel anonym; das Surf-Verhalten kann nicht zu Ihnen zurückverfolgt werden.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-secondary-600 mb-3">5. SSL- bzw. TLS-Verschlüsselung</h2>
              <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Programa de precios unitarios en línea con análisis y rendimiento de costos para obra pública y privada.",
};

export default function ManualPage() {
  return (
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Introducción
            </h2>
            <p className="mt-2 text-gray-600">
              Este manual tiene como objetivo proporcionar una guía detallada
              para utilizar el Sistema de Gestión de Precios Universitarios.
            </p>

            <h2 className="mt-6 text-xl font-semibold text-gray-700">
              Acceso al Sistema
            </h2>
            <p className="mt-2 text-gray-600">
              Para acceder al sistema, dirígete a la página de inicio de sesión
              y utiliza tus credenciales proporcionadas por la administración.
            </p>

            <h2 className="mt-6 text-xl font-semibold text-gray-700">
              Gestión de Precios
            </h2>
            <p className="mt-2 text-gray-600">
              Dentro del sistema, podrás gestionar los precios de los diferentes
              servicios y productos ofrecidos por la universidad.
            </p>

            <h2 className="mt-6 text-xl font-semibold text-gray-700">
              Reportes
            </h2>
            <p className="mt-2 text-gray-600">
              El sistema permite generar reportes detallados sobre los precios y
              su evolución a lo largo del tiempo.
            </p>

            <h2 className="mt-6 text-xl font-semibold text-gray-700">
              Soporte
            </h2>
            <p className="mt-2 text-gray-600">
              Si necesitas asistencia o tienes alguna duda, puedes contactar al
              equipo de soporte técnico a través de la sección de contacto.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

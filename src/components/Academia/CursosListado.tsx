'use client'

import Link from 'next/link'

export function CursosListado() {
  const cursos = [
    {
      id: 1,
      titulo: 'Capital Humano Estratégico',
      descripcion: 'Gestión integral de talento y desarrollo organizacional',
      horas: 40,
      nivel: 'Avanzado',
      instructor: 'Giovanny Cerón Pérez',
    },
    {
      id: 2,
      titulo: 'Automatización de Procesos RH',
      descripcion: 'Implementación de IA y automatización en recursos humanos',
      horas: 30,
      nivel: 'Intermedio',
      instructor: 'NEXI IA',
    },
    {
      id: 3,
      titulo: 'Cumplimiento Normativo NOM-035',
      descripcion: 'Asesoría en factores de riesgo psicosocial y seguridad',
      horas: 20,
      nivel: 'Básico',
      instructor: 'Nexiom Academy',
    },
  ]

  return (
    <section className="py-16 px-4 bg-nexiom-dark min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-nexiom-bronze-light">Academia Virtual Nexiom</h1>
        <p className="text-gray-400 mb-12">Cursos didácticos, prácticos y medibles diseñados para transformar tu empresa</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cursos.map((curso) => (
            <div key={curso.id} className="bg-nexiom-blue border border-nexiom-bronze rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2 text-nexiom-bronze-light">{curso.titulo}</h3>
              <p className="text-gray-400 text-sm mb-4">{curso.descripcion}</p>
              <div className="space-y-2 mb-4 text-sm">
                <p><span className="text-nexiom-bronze">Duración:</span> {curso.horas} horas</p>
                <p><span className="text-nexiom-bronze">Nivel:</span> {curso.nivel}</p>
                <p><span className="text-nexiom-bronze">Instructor:</span> {curso.instructor}</p>
              </div>
              <Link
                href={`/academia/curso/${curso.id}`}
                className="block w-full bg-nexiom-bronze-light text-white text-center py-2 rounded font-bold hover:bg-nexiom-bronze transition"
              >
                Acceder al Curso
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { NexiChat } from '@/components/Nexi/NexiChat'

interface ModuloProps {
  cursoId: number
}

export function CursoDetalle({ cursoId }: ModuloProps) {
  const [completados, setCompletados] = useState<number[]>([])
  const [evaluacionCompleta, setEvaluacionCompleta] = useState(false)

  const modulos = [
    {
      id: 1,
      titulo: 'Módulo 1: Fundamentos',
      contenido: 'Conceptos base de capital humano estratégico y transformación organizacional.',
      duracion: 10,
    },
    {
      id: 2,
      titulo: 'Módulo 2: Diagnóstico',
      contenido: 'Herramientas de diagnóstico organizacional y análisis de competencias.',
      duracion: 10,
    },
    {
      id: 3,
      titulo: 'Módulo 3: Implementación',
      contenido: 'Estrategias de implementación y gestión del cambio.',
      duracion: 10,
    },
  ]

  const toggleModulo = (id: number) => {
    setCompletados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const progreso = (completados.length / modulos.length) * 100

  return (
    <section className="py-16 px-4 bg-nexiom-dark min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-nexiom-bronze-light">Capital Humano Estratégico</h1>
        <div className="bg-nexiom-blue p-6 rounded-lg border border-nexiom-bronze mb-8">
          <p className="text-gray-300 mb-4">Progreso del curso: {Math.round(progreso)}%</p>
          <div className="w-full bg-nexiom-dark rounded-full h-3">
            <div
              className="bg-nexiom-bronze-light h-3 rounded-full transition-all"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {modulos.map((modulo) => (
                <div key={modulo.id} className="bg-nexiom-blue p-6 rounded-lg border border-nexiom-bronze">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-nexiom-bronze-light">{modulo.titulo}</h3>
                      <p className="text-gray-400 text-sm mt-2">{modulo.contenido}</p>
                      <p className="text-gray-500 text-xs mt-2">Duración: {modulo.duracion} minutos</p>
                    </div>
                    <button
                      onClick={() => toggleModulo(modulo.id)}
                      className={`px-4 py-2 rounded font-bold whitespace-nowrap ${
                        completados.includes(modulo.id)
                          ? 'bg-green-600 text-white'
                          : 'bg-nexiom-bronze text-white hover:bg-nexiom-bronze-light'
                      }`}
                    >
                      {completados.includes(modulo.id) ? '✓ Completado' : 'Marcar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {progreso === 100 && !evaluacionCompleta && (
              <div className="mt-8 bg-nexiom-blue p-6 rounded-lg border border-green-600">
                <h3 className="text-xl font-bold mb-4">Evaluación Final</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="radio" name="q1" className="mr-2" />
                    ¿Cuál es el objetivo principal del capital humano estratégico?
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="q2" className="mr-2" />
                    ¿Cómo se mide el éxito de una transformación organizacional?
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="q3" className="mr-2" />
                    ¿Qué herramientas se utilizan en diagnóstico?
                  </label>
                </div>
                <button
                  onClick={() => setEvaluacionCompleta(true)}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700"
                >
                  Enviar Evaluación
                </button>
              </div>
            )}

            {evaluacionCompleta && (
              <div className="mt-8 bg-green-900 border border-green-600 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-green-100">¡Felicidades!</h3>
                <p className="text-green-100 mb-4">Has completado el curso exitosamente.</p>
                <a
                  href={`/academia/certificado/${cursoId}`}
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700"
                >
                  Descargar Certificado
                </a>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <NexiChat />
          </div>
        </div>
      </div>
    </section>
  )
}

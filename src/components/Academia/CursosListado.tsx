'use client'

import { getSupabaseClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type Curso = {
  id: string
  slug: string
  title: string
  description: string
  duration_hours: number
  category: string
  published: boolean
}

const cursosFallback: Curso[] = [
  {
    id: 'capital-humano-estrategico',
    slug: 'capital-humano-estrategico',
    title: 'Capital Humano Estratégico',
    description: 'Gestión integral de talento y desarrollo organizacional.',
    duration_hours: 40,
    category: 'Capital Humano',
    published: true,
  },
  {
    id: 'automatizacion-procesos-rh',
    slug: 'automatizacion-procesos-rh',
    title: 'Automatización de Procesos RH',
    description: 'Implementación de IA y automatización en recursos humanos.',
    duration_hours: 30,
    category: 'IA y Automatización',
    published: true,
  },
  {
    id: 'nom-035-stps-2018',
    slug: 'nom-035-stps-2018',
    title: 'Cumplimiento Normativo NOM-035-STPS-2018',
    description: 'Prevención de riesgos psicosociales, evidencia documental y cumplimiento normativo.',
    duration_hours: 20,
    category: 'Cumplimiento Normativo',
    published: true,
  },
]

export function CursosListado() {
  const router = useRouter()
  const supabase = useMemo(() => getSupabaseClient(), [])
  const [cursos, setCursos] = useState<Curso[]>(cursosFallback)
  const [isLoading, setIsLoading] = useState(true)
  const [isEnrolling, setIsEnrolling] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  useEffect(() => {
    const cargarCursos = async () => {
      if (!supabase) {
        setStatusMessage('Supabase no está configurado. Mostrando cursos base locales.')
        setIsLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('courses')
        .select('id, slug, title, description, duration_hours, category, published')
        .eq('published', true)
        .order('created_at', { ascending: true })

      if (error) {
        setStatusMessage(`No se pudieron cargar cursos desde Supabase: ${error.message}`)
        setIsLoading(false)
        return
      }

      if (data && data.length > 0) {
        setCursos(data)
        setStatusMessage('Cursos cargados desde Supabase. Para acceder debes registrar inscripción académica.')
      } else {
        setStatusMessage('No hay cursos publicados todavía. Mostrando cursos base locales.')
      }

      setIsLoading(false)
    }

    cargarCursos()
  }, [supabase])

  const registrarInscripcion = async (curso: Curso) => {
    if (!supabase) {
      setStatusMessage('Supabase no está configurado. No se puede registrar la inscripción.')
      return
    }

    setIsEnrolling(curso.id)
    setStatusMessage(null)

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError || !session) {
      setIsEnrolling(null)
      router.push('/auth')
      return
    }

    const { error } = await supabase
      .from('enrollments')
      .upsert(
        {
          user_id: session.user.id,
          course_id: curso.id,
          status: 'in_progress',
          progress_percent: 0,
        },
        { onConflict: 'user_id,course_id' },
      )

    setIsEnrolling(null)

    if (error) {
      setStatusMessage(`No se pudo registrar la inscripción: ${error.message}`)
      return
    }

    router.push(`/academia/curso/${curso.slug}`)
  }

  return (
    <section className="py-16 px-4 bg-nexiom-dark min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-nexiom-bronze-light">Academia Virtual Nexiom</h1>
        <p className="text-gray-400 mb-6">Cursos didácticos, prácticos y medibles diseñados para transformar tu empresa.</p>

        {statusMessage && (
          <div className="mb-8 rounded-lg border border-nexiom-bronze bg-nexiom-blue p-4 text-sm text-white">
            {statusMessage}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-lg border border-nexiom-bronze bg-nexiom-blue p-6 text-white">Cargando cursos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cursos.map((curso) => (
              <div key={curso.id} className="bg-nexiom-blue border border-nexiom-bronze rounded-lg p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2 text-nexiom-bronze-light">{curso.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{curso.description}</p>
                <div className="space-y-2 mb-4 text-sm">
                  <p><span className="text-nexiom-bronze">Duración:</span> {curso.duration_hours} horas</p>
                  <p><span className="text-nexiom-bronze">Categoría:</span> {curso.category}</p>
                  <p><span className="text-nexiom-bronze">Gestión:</span> inscripción previa, avance y constancia</p>
                </div>
                <button
                  type="button"
                  onClick={() => registrarInscripcion(curso)}
                  disabled={isEnrolling === curso.id}
                  className="block w-full bg-nexiom-bronze-light text-white text-center py-2 rounded font-bold hover:bg-nexiom-bronze transition disabled:opacity-60"
                >
                  {isEnrolling === curso.id ? 'Registrando inscripción...' : 'Inscribirme para acceder'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

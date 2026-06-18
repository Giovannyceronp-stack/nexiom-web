'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getSupabaseClient } from '@/lib/supabase'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type Curso = {
  id: string
  slug: string
  title: string
  description: string
  duration_hours: number
  category: string
}

export default function CursoPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const supabase = useMemo(() => getSupabaseClient(), [])
  const [curso, setCurso] = useState<Curso | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadCourse = async () => {
      if (!supabase) {
        setMessage('Supabase no está configurado.')
        setIsLoading(false)
        return
      }

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push('/auth')
        return
      }

      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('id, slug, title, description, duration_hours, category')
        .eq('slug', params.slug)
        .eq('published', true)
        .single()

      if (courseError || !courseData) {
        setMessage('No se encontró el curso solicitado.')
        setIsLoading(false)
        return
      }

      const { data: enrollmentData } = await supabase
        .from('enrollments')
        .select('id')
        .eq('course_id', courseData.id)
        .eq('user_id', session.user.id)
        .maybeSingle()

      if (!enrollmentData) {
        setMessage('Primero registra tu inscripción académica para gestionar avance y constancia.')
        setIsLoading(false)
        return
      }

      setCurso(courseData)
      setIsLoading(false)
    }

    loadCourse()
  }, [params.slug, router, supabase])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-nexiom-dark px-4 py-16">
        <div className="mx-auto max-w-5xl">
          {isLoading ? (
            <div className="rounded-lg border border-nexiom-bronze bg-nexiom-blue p-6 text-white">Validando inscripción...</div>
          ) : message ? (
            <div className="rounded-lg border border-nexiom-bronze bg-nexiom-blue p-8 text-white">
              <h1 className="mb-4 text-3xl font-bold text-nexiom-bronze-light">Registro académico requerido</h1>
              <p className="mb-6">{message}</p>
              <Link href="/academia" className="inline-block rounded bg-nexiom-bronze-light px-6 py-3 font-bold text-white hover:bg-nexiom-bronze">
                Volver a Academia
              </Link>
            </div>
          ) : curso ? (
            <section className="rounded-lg border border-nexiom-bronze bg-nexiom-blue p-8 text-white">
              <p className="mb-2 text-sm uppercase tracking-wide text-nexiom-bronze-light">Inscripción registrada</p>
              <h1 className="mb-4 text-4xl font-bold text-nexiom-bronze-light">{curso.title}</h1>
              <p className="mb-6 text-gray-300">{curso.description}</p>
              <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded border border-nexiom-bronze p-4"><p className="text-sm text-gray-300">Duración</p><p className="text-2xl font-bold">{curso.duration_hours} h</p></div>
                <div className="rounded border border-nexiom-bronze p-4"><p className="text-sm text-gray-300">Categoría</p><p className="text-2xl font-bold">{curso.category}</p></div>
                <div className="rounded border border-nexiom-bronze p-4"><p className="text-sm text-gray-300">Estado</p><p className="text-2xl font-bold">En curso</p></div>
              </div>
              <div className="rounded-lg bg-nexiom-dark p-6">
                <h2 className="mb-3 text-2xl font-bold text-nexiom-bronze-light">Contenido del curso</h2>
                <p className="mb-4 text-gray-300">Espacio preparado para módulos, evaluaciones, evidencias, seguimiento académico y constancias.</p>
                <ul className="list-disc space-y-2 pl-6 text-gray-300">
                  <li>Módulo 1: Introducción y objetivos.</li>
                  <li>Módulo 2: Material didáctico y actividades.</li>
                  <li>Módulo 3: Evaluación y evidencias.</li>
                  <li>Constancia: disponible al cumplir criterios académicos.</li>
                </ul>
              </div>
            </section>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  )
}

'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CursoDetalle } from '@/components/Academia/CursoDetalle'
import { useRequireAuth } from '@/hooks/useRequireAuth'

export default function CursoPage({ params }: { params: { id: string } }) {
  const { isLoading } = useRequireAuth()

  if (isLoading) return <div>Cargando...</div>

  return (
    <>
      <Header />
      <CursoDetalle cursoId={parseInt(params.id)} />
      <Footer />
    </>
  )
}

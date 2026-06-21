'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CursosListado } from '@/components/Academia/CursosListado'
import { useRequireAuth } from '@/hooks/useRequireAuth'

export default function AcademiaPage() {
  const { isLoading } = useRequireAuth()

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nexiom-bronze mx-auto mb-4"></div>
            <p>Cargando...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <CursosListado />
      <Footer />
    </>
  )
}

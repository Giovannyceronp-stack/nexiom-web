'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CertificadoGenerador } from '@/components/Academia/CertificadoGenerador'

export default function CertificadoPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Header />
      <CertificadoGenerador />
      <Footer />
    </>
  )
}

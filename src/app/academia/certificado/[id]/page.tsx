'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CertificadoGenerador } from '@/components/Academia/CertificadoGenerador'

export default function CertificadoPage() {
  return (
    <>
      <Header />
      <CertificadoGenerador />
      <Footer />
    </>
  )
}

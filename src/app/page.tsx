'use client'

import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Servicios } from '@/components/Servicios'
import { Academia } from '@/components/Academia'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Servicios />
      <Academia />
      <CTA />
      <Footer />
    </>
  )
}

'use client'

import Link from 'next/link'

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-nexiom-dark to-nexiom-blue py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          Inteligencia Organizacional
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Transformamos empresas mexicanas con IA y capital humano estratégico.
        </p>
        <Link href="/academia" className="bg-nexiom-bronze-light px-8 py-3 rounded-lg font-bold hover:bg-nexiom-bronze">
          Acceder a Academia
        </Link>
      </div>
    </section>
  )
}

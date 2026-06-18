'use client'

import Link from 'next/link'

export function CTA() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-nexiom-bronze to-nexiom-bronze-light">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">Transforma tu empresa hoy</h2>
        <Link href="/contacto" className="inline-block bg-nexiom-dark text-nexiom-bronze-light px-8 py-3 rounded-lg font-bold">
          Agendar Consultoría
        </Link>
      </div>
    </section>
  )
}

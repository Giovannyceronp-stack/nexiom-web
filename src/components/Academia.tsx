'use client'

import Link from 'next/link'

export function Academia() {
  return (
    <section className="py-16 px-4 bg-nexiom-blue">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Academia Virtual Nexiom</h2>
        <p className="text-lg text-gray-300 mb-8">
          Cursos didácticos, prácticos y medibles para transformar tu empresa.
        </p>
        <Link href="/academia" className="inline-block bg-nexiom-bronze-light px-8 py-3 rounded-lg font-bold">
          Explorar Academia
        </Link>
      </div>
    </section>
  )
}

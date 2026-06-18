'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-nexiom-blue shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-nexiom-bronze-light">
          NEXIOM
        </Link>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-nexiom-bronze">Inicio</Link>
          <Link href="/academia" className="hover:text-nexiom-bronze">Academia</Link>
          <Link href="/dashboard" className="bg-nexiom-bronze px-4 py-2 rounded">Dashboard</Link>
        </div>
      </nav>
    </header>
  )
}

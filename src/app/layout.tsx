import type { Metadata } from 'next'
import { Providers } from '@/app/providers'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Nexiom Intelligence Group',
  description: 'Inteligencia organizacional con IA y capital humano estratégico',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-nexiom-dark text-nexiom-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useSupabase } from '@/hooks/useSupabase'

export default function AuthPage() {
  const router = useRouter()
  const { supabase, session, isSupabaseConfigured } = useSupabase()

  useEffect(() => {
    if (session) router.push('/dashboard')
  }, [session, router])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-nexiom-dark px-4 py-16">
        <section className="mx-auto max-w-md rounded-2xl border border-nexiom-bronze bg-nexiom-blue p-8 shadow-xl">
          <h1 className="mb-2 text-3xl font-bold text-nexiom-bronze-light">Acceso Nexiom</h1>
          <p className="mb-6 text-sm text-gray-300">
            Acceso real con Supabase Auth. Sin variables de entorno configuradas, el acceso permanece desactivado.
          </p>

          {!isSupabaseConfigured || !supabase ? (
            <div className="rounded-lg border border-red-400 bg-red-950/40 p-4 text-sm text-red-100">
              Falta configurar NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local o Vercel.
            </div>
          ) : (
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
              providers={[]}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Correo electrónico',
                    password_label: 'Clave de acceso',
                    button_label: 'Entrar',
                  },
                  sign_up: {
                    email_label: 'Correo electrónico',
                    password_label: 'Clave de acceso',
                    button_label: 'Crear cuenta',
                  },
                },
              }}
            />
          )}

          <Link href="/" className="mt-6 block text-center text-sm text-gray-300 hover:text-nexiom-bronze-light">
            Volver al inicio
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}

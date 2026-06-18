'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
      }
      router.push('/academia')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-nexiom-dark flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-nexiom-blue rounded-lg p-8 border border-nexiom-bronze">
          <h1 className="text-2xl font-bold mb-6 text-center text-nexiom-bronze-light">
            {isLogin ? 'Acceso a Nexiom' : 'Crear Cuenta'}
          </h1>

          {error && <div className="bg-red-900 text-red-100 p-4 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-nexiom-dark border border-nexiom-bronze rounded text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-nexiom-dark border border-nexiom-bronze rounded text-white"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-nexiom-bronze-light text-white py-2 rounded font-bold hover:bg-nexiom-bronze transition disabled:opacity-50"
            >
              {loading ? 'Cargando...' : isLogin ? 'Acceder' : 'Registrarse'}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400">
            {isLogin ? (
              <>
                ¿No tienes cuenta?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-nexiom-bronze-light hover:text-nexiom-bronze"
                >
                  Crear una
                </button>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-nexiom-bronze-light hover:text-nexiom-bronze"
                >
                  Acceder
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

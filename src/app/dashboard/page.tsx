'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getSupabaseClient } from '@/lib/supabase'
import { useEffect, useMemo, useState } from 'react'

type Cliente = {
  id: string
  company_name: string
  contact_name: string
  email: string
  sector: string | null
  status: string
  created_at: string
}

export default function DashboardPage() {
  const supabase = useMemo(() => getSupabaseClient(), [])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [nuevoCliente, setNuevoCliente] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    sector: '',
  })

  useEffect(() => {
    const cargarClientes = async () => {
      if (!supabase) return

      const { data, error } = await supabase
        .from('clients')
        .select('id, company_name, contact_name, email, sector, status, created_at')
        .order('created_at', { ascending: false })

      if (error) {
        setStatusMessage(`No se pudieron cargar clientes: ${error.message}`)
        return
      }

      setClientes(data ?? [])
    }

    cargarClientes()
  }, [supabase])

  const handleAgregarCliente = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatusMessage(null)

    if (!supabase) {
      setStatusMessage('Supabase no está configurado.')
      return
    }

    if (!nuevoCliente.company_name || !nuevoCliente.contact_name || !nuevoCliente.email) {
      setStatusMessage('Empresa, contacto y email son obligatorios.')
      return
    }

    setIsSaving(true)

    const { data, error } = await supabase
      .from('clients')
      .insert({
        company_name: nuevoCliente.company_name,
        contact_name: nuevoCliente.contact_name,
        email: nuevoCliente.email,
        sector: nuevoCliente.sector || null,
        status: 'active',
      })
      .select('id, company_name, contact_name, email, sector, status, created_at')
      .single()

    setIsSaving(false)

    if (error) {
      setStatusMessage(`No se pudo guardar el cliente: ${error.message}`)
      return
    }

    if (data) {
      setClientes((prev) => [data, ...prev])
    }

    setNuevoCliente({ company_name: '', contact_name: '', email: '', sector: '' })
    setStatusMessage('Cliente guardado correctamente en Supabase.')
  }

  const estadisticas = useMemo(
    () => ({
      totalClientes: clientes.length,
      clientesActivos: clientes.filter((c) => c.status === 'active').length,
      participantesAcademicos: 0,
      certificadosGenerados: 0,
    }),
    [clientes],
  )

  return (
    <>
      <Header />
      <div className="min-h-screen bg-nexiom-dark p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-nexiom-bronze-light">Dashboard Ejecutivo</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Clientes Activos', valor: estadisticas.clientesActivos, icon: '🏢' },
              { label: 'Total de Clientes', valor: estadisticas.totalClientes, icon: '👥' },
              { label: 'Participantes Académicos', valor: estadisticas.participantesAcademicos, icon: '📚' },
              { label: 'Certificados Generados', valor: estadisticas.certificadosGenerados, icon: '✅' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-nexiom-blue border border-nexiom-bronze p-6 rounded-lg">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-nexiom-bronze-light">{stat.valor}</p>
              </div>
            ))}
          </div>

          {statusMessage && (
            <div className="mb-6 rounded-lg border border-nexiom-bronze bg-nexiom-blue p-4 text-sm text-white">
              {statusMessage}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-nexiom-blue border border-nexiom-bronze p-6 rounded-lg h-fit">
              <h2 className="text-xl font-bold mb-4 text-nexiom-bronze-light">Agregar Cliente</h2>
              <form onSubmit={handleAgregarCliente} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Empresa</label>
                  <input type="text" value={nuevoCliente.company_name} onChange={(e) => setNuevoCliente({ ...nuevoCliente, company_name: e.target.value })} className="w-full px-3 py-2 bg-nexiom-dark border border-nexiom-bronze rounded text-white text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contacto</label>
                  <input type="text" value={nuevoCliente.contact_name} onChange={(e) => setNuevoCliente({ ...nuevoCliente, contact_name: e.target.value })} className="w-full px-3 py-2 bg-nexiom-dark border border-nexiom-bronze rounded text-white text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" value={nuevoCliente.email} onChange={(e) => setNuevoCliente({ ...nuevoCliente, email: e.target.value })} className="w-full px-3 py-2 bg-nexiom-dark border border-nexiom-bronze rounded text-white text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sector</label>
                  <input type="text" value={nuevoCliente.sector} onChange={(e) => setNuevoCliente({ ...nuevoCliente, sector: e.target.value })} className="w-full px-3 py-2 bg-nexiom-dark border border-nexiom-bronze rounded text-white text-sm" />
                </div>
                <button type="submit" disabled={isSaving} className="w-full bg-nexiom-bronze-light text-white py-2 rounded font-bold hover:bg-nexiom-bronze transition text-sm disabled:opacity-60">
                  {isSaving ? 'Guardando...' : 'Agregar Cliente'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-nexiom-blue border border-nexiom-bronze p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-nexiom-bronze-light">Gestión de Clientes</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-nexiom-bronze">
                    <tr>
                      <th className="text-left py-2">Empresa</th>
                      <th className="text-left py-2">Contacto</th>
                      <th className="text-left py-2">Sector</th>
                      <th className="text-left py-2">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {clientes.map((cliente) => (
                      <tr key={cliente.id} className="border-b border-nexiom-dark hover:bg-nexiom-dark transition">
                        <td className="py-3">{cliente.company_name}</td>
                        <td className="py-3">{cliente.contact_name}</td>
                        <td className="py-3">{cliente.sector}</td>
                        <td className="py-3"><span className="bg-green-900 text-green-100 px-2 py-1 rounded text-xs">{cliente.status}</span></td>
                      </tr>
                    ))}
                    {clientes.length === 0 && <tr><td className="py-4 text-gray-300" colSpan={4}>Sin clientes registrados todavía.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

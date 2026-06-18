'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useState } from 'react'

export default function DashboardPage() {
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nombre: 'Empresa ABC',
      contacto: 'Juan García',
      email: 'juan@empresaabc.com',
      sector: 'Tecnología',
      estado: 'activo',
      fecha_registro: '2026-06-01',
    },
  ])

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    contacto: '',
    email: '',
    sector: '',
  })

  const handleAgregarCliente = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nuevoCliente.nombre) return

    setClientes((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...nuevoCliente,
        estado: 'activo',
        fecha_registro: new Date().toISOString().split('T')[0],
      },
    ])

    setNuevoCliente({ nombre: '', contacto: '', email: '', sector: '' })
  }

  const estadisticas = {
    totalClientes: clientes.length,
    clientesActivos: clientes.filter((c) => c.estado === 'activo').length,
    participantesAcademicos: 12,
    certificadosGenerados: 8,
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-nexiom-dark p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-nexiom-bronze-light">Dashboard Ejecutivo</h1>

          {/* Estadísticas */}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario para agregar cliente */}
            <div className="lg:col-span-1 bg-nexiom-blue border border-nexiom-bronze p-6 rounded-lg h-fit">
              <h2 className="text-xl font-bold mb-4 text-nexiom-bronze-light">Agregar Cliente</h2>
              <form onSubmit={handleAgregarCliente} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Empresa</label>
                  <input
                    type="text"
                    value={nuevoCliente.nombre}
                    onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
                    className="w-full px-3 py-2 bg-nexiom-dark border border-nexiom-bronze rounded text-white text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contacto</label>
                  <input
                    type="text"
                    value={nuevoCliente.contacto}
                    onChange={(e) => setNuevoCliente({ ...nuevoCliente, contacto: e.target.value })}
                    className="w-full px-3 py-2 bg-nexiom-dark border border-nexiom-bronze rounded text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={nuevoCliente.email}
                    onChange={(e) => setNuevoCliente({ ...nuevoCliente, email: e.target.value })}
                    className="w-full px-3 py-2 bg-nexiom-dark border border-nexiom-bronze rounded text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sector</label>
                  <input
                    type="text"
                    value={nuevoCliente.sector}
                    onChange={(e) => setNuevoCliente({ ...nuevoCliente, sector: e.target.value })}
                    className="w-full px-3 py-2 bg-nexiom-dark border border-nexiom-bronze rounded text-white text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-nexiom-bronze-light text-white py-2 rounded font-bold hover:bg-nexiom-bronze transition text-sm"
                >
                  Agregar Cliente
                </button>
              </form>
            </div>

            {/* Lista de clientes */}
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
                        <td className="py-3">{cliente.nombre}</td>
                        <td className="py-3">{cliente.contacto}</td>
                        <td className="py-3">{cliente.sector}</td>
                        <td className="py-3">
                          <span className="bg-green-900 text-green-100 px-2 py-1 rounded text-xs">
                            {cliente.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
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

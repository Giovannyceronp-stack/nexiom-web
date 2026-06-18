'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useState } from 'react'

type EstadoEnvio = 'idle' | 'sending' | 'success' | 'error'

export default function ContactoPage() {
  const [estado, setEstado] = useState<EstadoEnvio>('idle')
  const [mensaje, setMensaje] = useState('')
  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
    servicio: 'Consultoría organizacional',
    descripcion: '',
  })

  const enviarSolicitud = async (event: React.FormEvent) => {
    event.preventDefault()
    setEstado('sending')
    setMensaje('')

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'No se pudo registrar la solicitud')
      }

      setEstado('success')
      setMensaje('Solicitud registrada. Nexiom dará seguimiento por el canal proporcionado.')
      setForm({
        nombre: '',
        empresa: '',
        correo: '',
        telefono: '',
        servicio: 'Consultoría organizacional',
        descripcion: '',
      })
    } catch (error) {
      setEstado('error')
      setMensaje(error instanceof Error ? error.message : 'Error inesperado')
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-nexiom-dark px-4 py-16">
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-nexiom-bronze-light mb-3">
              Contacto Nexiom
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Agenda una consultoría de diagnóstico
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Cuéntanos qué necesita tu empresa. Este formulario registra solicitudes iniciales para servicios de inteligencia organizacional, capital humano, capacitación, cumplimiento e IA aplicada.
            </p>

            <div className="grid gap-4">
              {[
                'Diagnóstico organizacional y operativo',
                'Academia virtual y capacitación medible',
                'Cumplimiento NOM-035-STPS-2018',
                'Automatización, CRM, ERP e IA NEXI',
              ].map((item) => (
                <div key={item} className="border border-nexiom-bronze bg-nexiom-blue rounded-lg p-4">
                  <span className="text-nexiom-bronze-light font-bold">✓</span>{' '}
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={enviarSolicitud} className="bg-nexiom-blue border border-nexiom-bronze rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold text-nexiom-bronze-light">Solicitud inicial</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block text-sm">
                Nombre
                <input
                  required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="mt-2 w-full px-3 py-2 rounded bg-nexiom-dark border border-nexiom-bronze text-white"
                />
              </label>
              <label className="block text-sm">
                Empresa
                <input
                  required
                  value={form.empresa}
                  onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                  className="mt-2 w-full px-3 py-2 rounded bg-nexiom-dark border border-nexiom-bronze text-white"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block text-sm">
                Correo
                <input
                  required
                  type="email"
                  value={form.correo}
                  onChange={(e) => setForm({ ...form, correo: e.target.value })}
                  className="mt-2 w-full px-3 py-2 rounded bg-nexiom-dark border border-nexiom-bronze text-white"
                />
              </label>
              <label className="block text-sm">
                Teléfono
                <input
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="mt-2 w-full px-3 py-2 rounded bg-nexiom-dark border border-nexiom-bronze text-white"
                />
              </label>
            </div>

            <label className="block text-sm">
              Servicio de interés
              <select
                value={form.servicio}
                onChange={(e) => setForm({ ...form, servicio: e.target.value })}
                className="mt-2 w-full px-3 py-2 rounded bg-nexiom-dark border border-nexiom-bronze text-white"
              >
                <option>Consultoría organizacional</option>
                <option>Academia virtual de capacitación</option>
                <option>NOM-035 y cumplimiento STPS</option>
                <option>IA, automatización, CRM o ERP</option>
                <option>Diagnóstico integral Nexiom</option>
              </select>
            </label>

            <label className="block text-sm">
              ¿Qué necesitas resolver?
              <textarea
                required
                rows={5}
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                className="mt-2 w-full px-3 py-2 rounded bg-nexiom-dark border border-nexiom-bronze text-white"
              />
            </label>

            <button
              type="submit"
              disabled={estado === 'sending'}
              className="w-full bg-nexiom-bronze-light text-white py-3 rounded font-bold hover:bg-nexiom-bronze transition disabled:opacity-60"
            >
              {estado === 'sending' ? 'Registrando...' : 'Enviar solicitud'}
            </button>

            {mensaje && (
              <p className={`text-sm rounded p-3 ${estado === 'success' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}`}>
                {mensaje}
              </p>
            )}

            <p className="text-xs text-gray-400">
              Aviso: evita enviar información sensible en esta etapa. La solicitud se usa únicamente para seguimiento comercial y diagnóstico inicial.
            </p>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}

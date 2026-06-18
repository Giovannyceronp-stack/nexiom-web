'use client'

export function Servicios() {
  const servicios = [
    { titulo: 'Consultoría Organizacional', icon: '🏢' },
    { titulo: 'Capital Humano Estratégico', icon: '👥' },
    { titulo: 'IA y Automatización', icon: '🤖' },
    { titulo: 'Capacitación Profesional', icon: '📚' },
    { titulo: 'Cumplimiento Normativo', icon: '✅' },
    { titulo: 'Asistente IA NEXI', icon: '💡' },
  ]

  return (
    <section className="py-16 px-4 bg-nexiom-dark">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map((s, i) => (
            <div key={i} className="bg-nexiom-blue p-6 rounded-lg border border-nexiom-bronze">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold">{s.titulo}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

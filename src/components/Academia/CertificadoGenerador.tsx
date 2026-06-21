'use client'

import { useMemo, useState } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

type CertificadoGeneradorProps = {
  cursoId?: string
  participanteName?: string
}

const cursos: Record<string, string> = {
  '1': 'Capital Humano Estratégico',
  '2': 'Automatización de Procesos RH',
  '3': 'Cumplimiento Normativo NOM-035-STPS-2018',
}

export function CertificadoGenerador({ cursoId = '1', participanteName = 'Participante' }: CertificadoGeneradorProps) {
  const [generando, setGenerando] = useState(false)

  const folio = useMemo(
    () => `NCH-${new Date().getFullYear()}-${cursoId.padStart(2, '0')}-${Date.now().toString(36).toUpperCase()}`,
    [cursoId],
  )

  const fechaCompletacion = useMemo(
    () =>
      new Date().toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    [],
  )

  const tituloCurso = cursos[cursoId] || cursos['1']

  const generarCertificado = async () => {
    setGenerando(true)
    try {
      const element = document.getElementById('certificado-content')
      if (!element) return

      const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
      const imgWidth = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save(`Certificado_${folio}.pdf`)
    } catch (error) {
      console.error('Error generando certificado:', error)
    } finally {
      setGenerando(false)
    }
  }

  return (
    <div className="min-h-screen bg-nexiom-dark p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-nexiom-bronze-light">Certificado de Participación</h1>

        <div
          id="certificado-content"
          className="bg-white p-12 rounded-lg shadow-2xl mb-8"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(30, 58, 138, 0.05) 0%, rgba(146, 64, 14, 0.05) 100%)',
            border: '3px solid #1e3a8a',
          }}
        >
          <div className="text-center mb-12">
            <div className="text-6xl font-bold text-nexiom-dark mb-2">NEXIOM</div>
            <div className="text-2xl text-nexiom-bronze font-semibold">Intelligence Group</div>
            <div className="border-b-2 border-nexiom-bronze my-6"></div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-nexiom-dark mb-4">CERTIFICADO</h2>
            <p className="text-2xl text-nexiom-dark">de Participación y Logro Académico</p>
          </div>

          <div className="text-center mb-12">
            <p className="text-xl text-nexiom-dark mb-6">Se certifica que</p>
            <div className="border-b-2 border-nexiom-dark py-4 mb-6">
              <p className="text-3xl font-bold text-nexiom-dark">{participanteName}</p>
            </div>

            <p className="text-lg text-nexiom-dark mb-6 leading-relaxed">
              Ha completado satisfactoriamente el programa de capacitación en
            </p>

            <div className="border-b-2 border-nexiom-bronze py-4 mb-8">
              <p className="text-2xl font-bold text-nexiom-bronze">{tituloCurso}</p>
            </div>

            <p className="text-base text-nexiom-dark leading-relaxed">
              Demostrando competencia en inteligencia organizacional, transformación digital y gestión estratégica del talento humano.
            </p>
          </div>

          <div className="flex justify-between items-end mt-16 pt-8 border-t border-nexiom-bronze">
            <div className="text-center text-sm text-nexiom-dark">
              <p className="font-bold mb-2">Folio</p>
              <p className="font-mono">{folio}</p>
            </div>
            <div className="text-center text-sm text-nexiom-dark">
              <p className="font-bold mb-2">Fecha de Emisión</p>
              <p>{fechaCompletacion}</p>
            </div>
            <div className="text-center text-sm text-nexiom-dark">
              <p className="font-bold mb-6">Dirección General</p>
              <p className="font-semibold">Nexiom Intelligence Group</p>
              <p>México, 2026</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={generarCertificado}
            disabled={generando}
            className="bg-nexiom-bronze-light text-white px-8 py-3 rounded-lg font-bold hover:bg-nexiom-bronze transition disabled:opacity-50"
          >
            {generando ? 'Generando...' : 'Descargar Certificado PDF'}
          </button>
          <button
            onClick={() => window.print()}
            className="border-2 border-nexiom-bronze text-nexiom-bronze px-8 py-3 rounded-lg font-bold hover:bg-nexiom-bronze hover:text-white transition"
          >
            Imprimir
          </button>
        </div>
      </div>
    </div>
  )
}

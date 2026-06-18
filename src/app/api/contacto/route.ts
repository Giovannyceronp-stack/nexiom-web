import { NextResponse } from 'next/server'

type ContactoPayload = {
  nombre?: string
  empresa?: string
  correo?: string
  telefono?: string
  servicio?: string
  descripcion?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactoPayload

    if (!body.nombre || !body.empresa || !body.correo || !body.descripcion) {
      return NextResponse.json(
        { ok: false, message: 'Faltan campos obligatorios para registrar la solicitud.' },
        { status: 400 },
      )
    }

    const registro = {
      id: `NXM-${Date.now()}`,
      nombre: body.nombre.trim(),
      empresa: body.empresa.trim(),
      correo: body.correo.trim().toLowerCase(),
      telefono: body.telefono?.trim() || null,
      servicio: body.servicio || 'Diagnóstico integral Nexiom',
      descripcion: body.descripcion.trim(),
      estado: 'recibido',
      createdAt: new Date().toISOString(),
    }

    console.info('Nueva solicitud Nexiom:', registro)

    return NextResponse.json({
      ok: true,
      message: 'Solicitud registrada correctamente.',
      folio: registro.id,
    })
  } catch (error) {
    console.error('Error en contacto Nexiom:', error)
    return NextResponse.json(
      { ok: false, message: 'No se pudo procesar la solicitud.' },
      { status: 500 },
    )
  }
}

import { NextResponse } from 'next/server'
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase'

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

    if (!isSupabaseConfigured) {
      return NextResponse.json(
        { ok: false, message: 'Supabase no está configurado. La solicitud no fue registrada.' },
        { status: 503 },
      )
    }

    const supabase = getSupabaseClient()

    if (!supabase) {
      return NextResponse.json(
        { ok: false, message: 'No fue posible inicializar Supabase.' },
        { status: 503 },
      )
    }

    const folio = `NXM-${Date.now()}`

    const { error } = await supabase.from('contact_requests').insert({
      folio,
      nombre: body.nombre.trim(),
      empresa: body.empresa.trim(),
      email: body.correo.trim().toLowerCase(),
      telefono: body.telefono?.trim() || null,
      servicio: body.servicio || 'Diagnóstico integral Nexiom',
      mensaje: body.descripcion.trim(),
      status: 'new',
    })

    if (error) {
      console.error('Error registrando solicitud Nexiom:', error)
      return NextResponse.json(
        { ok: false, message: 'No se pudo registrar la solicitud en Supabase.' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      ok: true,
      message: 'Solicitud registrada correctamente.',
      folio,
    })
  } catch (error) {
    console.error('Error en contacto Nexiom:', error)
    return NextResponse.json(
      { ok: false, message: 'No se pudo procesar la solicitud.' },
      { status: 500 },
    )
  }
}

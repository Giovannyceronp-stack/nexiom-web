# Despliegue Nexiom Web

## Estado actual

La rama `dev/full-stack-rebuild` contiene la base funcional de Nexiom Web con:

- Landing pública.
- Academia virtual en modo demo.
- Dashboard ejecutivo inicial.
- Certificados PDF desde frontend.
- Ruta `/contacto`.
- Endpoint `/api/contacto`.
- Cliente Supabase seguro: no rompe si faltan variables.

## Validación local

```bash
git clone -b dev/full-stack-rebuild https://github.com/Giovannyceronp-stack/nexiom-web.git
cd nexiom-web
npm install
npm run type-check
npm run build
npm run dev
```

Abrir:

```text
http://localhost:3000
```

Rutas mínimas a probar:

```text
/
/academia
/academia/curso/1
/academia/certificado/1
/dashboard
/contacto
/api/healthcheck
```

## Variables de entorno para producción

Crear en Vercel o `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_ANON_KEY
```

Sin estas variables, el sitio opera en modo demo seguro.

## Despliegue Vercel

```bash
npm install -g vercel
vercel login
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel --prod
```

## Pendientes de producción

- Persistir solicitudes de contacto en Supabase.
- Persistir clientes del dashboard en Supabase.
- Generar folios de certificados desde base de datos.
- Conectar NEXI IA a un proveedor real o modelo local vía API.
- Agregar aviso de privacidad final validado legalmente.

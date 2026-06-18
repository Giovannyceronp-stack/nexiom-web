# Nexiom Intelligence Group - Web + Academia + IA NEXI + CRM

## 🚀 Características Implementadas

### ✅ Web Pública
- Landing page responsiva
- Identidad corporativa (azul, bronce, blanco)
- Navegación intuitiva
- Secciones: Inicio, Servicios, Academia, CTA

### ✅ Autenticación
- Registro e inicio de sesión con Supabase Auth
- Protección de rutas privadas
- Redirección automática

### ✅ Academia Virtual
- Catálogo de cursos dinámicos
- Módulos con contenido y duración
- Evaluaciones automatizadas
- Sistema de progreso
- **NEXI Chatbot integrado** para asistencia en tiempo real

### ✅ Certificados PDF
- Generador de certificados automático
- Folio único por participante
- Diseño profesional con marca Nexiom
- Descarga en PDF + opción de impresión

### ✅ Dashboard CRM
- Gestión de clientes corporativos
- Estadísticas en vivo
- Formulario de registro de clientes
- Tabla de clientes con filtros
- Seguimiento de estado

### ✅ IA NEXI
- Asistente IA integrado en cursos
- Chat en tiempo real
- Respuestas contextuales
- Base para expandir funcionalidad (similar a Jarvis)

## 🔧 Stack Tecnológico (100% Gratuito)

| Componente | Herramienta | Razón |
|-----------|-----------|-------|
| Frontend | Next.js 14 + React 18 | Moderno, rápido, escalable |
| Estilos | Tailwind CSS | Utilidades, responsive |
| Base de datos | Supabase PostgreSQL | Gratuito, empresarial, seguro |
| Autenticación | Supabase Auth | Integrada, sin costo |
| Deploy | Vercel | Gratuito, automático, rápido |
| PDF | jsPDF + html2canvas | Generación en cliente |
| CRM | Integrado en BD | Escalable sin costo extra |

## 📦 Instalación Local

### Requisitos
- Node.js 18+
- npm o yarn
- Cuenta Supabase (gratuita)

### Pasos

```bash
# 1. Clonar repositorio
git clone https://github.com/Giovannyceronp-stack/nexiom-web.git
cd nexiom-web

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales Supabase

# 4. Ejecutar en desarrollo
npm run dev

# 5. Abrir en navegador
open http://localhost:3000
```

## 🔐 Configuración Supabase (Gratis)

### 1. Crear Proyecto
1. Ir a [supabase.com](https://supabase.com)
2. Crear cuenta (gratis)
3. Crear proyecto nuevo
4. Copiar URL y Clave Anónima

### 2. Crear Tablas (SQL)

```sql
-- Tabla de participantes
CREATE TABLE participantes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  nombre VARCHAR(255),
  email VARCHAR(255),
  empresa VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de clientes corporativos
CREATE TABLE clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255),
  contacto VARCHAR(255),
  email VARCHAR(255),
  sector VARCHAR(100),
  estado VARCHAR(50) DEFAULT 'activo',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de inscripciones a cursos
CREATE TABLE inscripciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participante_id UUID REFERENCES participantes(id),
  curso_id INTEGER,
  progreso_porcentaje INTEGER DEFAULT 0,
  certificado_generado BOOLEAN DEFAULT FALSE,
  folio VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Habilitar RLS (Row Level Security)
- Ir a Authentication > Policies
- Habilitar RLS para cada tabla
- Crear políticas básicas (público para lectura de cursos)

## 🚀 Deployment en Vercel

### 1. Crear Proyecto en Vercel
```bash
# Conectar GitHub
vercel login
vercel
```

### 2. Agregar Variables de Entorno
En Vercel Dashboard:
- Project Settings > Environment Variables
- Agregar `NEXT_PUBLIC_SUPABASE_URL`
- Agregar `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Deploy Automático
Cada push a `main` redespliega automáticamente

## 📚 Estructura de Carpetas

```
nexiom-web/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── page.tsx      # Home
│   │   ├── auth/         # Autenticación
│   │   ├── academia/     # Cursos y módulos
│   │   ├── dashboard/    # CRM
│   │   └── api/          # Rutas API
│   ├── components/       # Componentes React
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Academia/     # Componentes de academia
│   │   └── Nexi/         # Componentes de IA
│   ├── hooks/            # Hooks personalizados
│   ├── lib/              # Utilidades
│   ├── providers/        # Providers de contexto
│   └── styles/           # CSS global
├── public/               # Archivos estáticos
└── package.json
```

## 🎓 Cursos Disponibles (v1.0)

1. **Capital Humano Estratégico** (40h)
   - Módulo 1: Fundamentos
   - Módulo 2: Diagnóstico
   - Módulo 3: Implementación
   - Evaluación final + Certificado

2. **Automatización de Procesos RH** (30h)
   - Próximamente

3. **Cumplimiento Normativo NOM-035** (20h)
   - Próximamente

## 🤖 NEXI IA Assistant

### Funcionalidades Actuales
- Chat integrado en cursos
- Respuestas contextuales
- Historial de conversación
- Interfaz amigable

### Expandir NEXI
Para integración avanzada (similar a Jarvis):
1. Crear API en Node.js/Python
2. Conectar LLM (Claude, OpenAI, LLaMA)
3. Persistencia de memoria
4. Integración con CRM/ERP

## 🔒 Seguridad y Privacidad

- ✅ Contraseñas encriptadas (Supabase Auth)
- ✅ HTTPS obligatorio
- ✅ RLS en base de datos
- ✅ Sin exposición de API keys
- ✅ Datos separados por usuario/cliente
- ✅ Cumplimiento GDPR

## 📊 Próximas Mejoras

- [ ] Integración Odoo Community para ERP completo
- [ ] IA NEXI avanzada con memoria persistente
- [ ] Reportes dinámicos en PDF
- [ ] Integración con WhatsApp/Telegram
- [ ] Cursos adicionales con video
- [ ] Sistema de pagos (Stripe)
- [ ] Analytics avanzado
- [ ] Móvil app

## 🆘 Soporte

Para preguntas o issues:
1. Revisar documentación
2. Crear issue en GitHub
3. Contactar a Giovanny Cerón Pérez

---

**Nexiom Intelligence Group © 2026 - Todos los derechos reservados**

🚀 Hecho con ❤️ en México

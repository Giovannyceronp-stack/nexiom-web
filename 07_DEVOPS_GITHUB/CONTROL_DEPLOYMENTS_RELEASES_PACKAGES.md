# CONTROL DEVOPS | DEPLOYMENTS, RELEASES Y PACKAGES

Documento operativo para administrar GitHub Pages, Deployments, Releases y Packages del repositorio `nexiom-web`.

## 1. Estado actual

- Repositorio: `Giovannyceronp-stack/nexiom-web`.
- Tipo de proyecto: sitio web estático.
- Rama principal: `main`.
- Publicación: GitHub Pages mediante GitHub Actions.
- Workflow principal: `.github/workflows/deploy-pages.yml`.
- Corrección aplicada: `actions/configure-pages@v5` ahora usa `enablement: true` y `GITHUB_TOKEN`.

## 2. Deployments

GitHub Pages debe publicarse desde GitHub Actions. Cada cambio en `main` activa el workflow y genera un deployment.

Puntos de control:

- El paso `Configure GitHub Pages` no debe fallar con `HttpError 404`.
- El paso `Upload Pages artifact` debe subir `_site`.
- El paso `Deploy to GitHub Pages` debe generar `page_url`.
- La URL pública debe cargar correctamente después del deploy.

## 3. Releases

Las releases deben usarse solo cuando exista una versión estable de la web o de la Academia Nexiom.

Formato recomendado:

- `v0.1.0` Primera versión pública.
- `v0.2.0` Mejoras de contenido, estructura o navegación.
- `v1.0.0` Versión institucional estable.

Cada release debe incluir:

- Resumen de cambios.
- Archivos modificados.
- Riesgos o validaciones pendientes.
- URL de despliegue.
- Responsable de aprobación: Giovanny Cerón Pérez.

## 4. GitHub Packages

GitHub Packages no aplica todavía porque este repositorio no contiene `package.json`, librería npm, imagen Docker ni paquete publicable.

Se activará cuando Nexiom requiera:

- Componentes web reutilizables.
- Paquete npm interno.
- Imagen Docker para backend, CRM o academia.
- Librería de diseño corporativo.
- Automatizaciones versionadas.

## 5. Seguridad y cumplimiento

Antes de publicar cambios:

- No subir datos personales, sensibles, financieros, laborales, médicos, psicológicos o de clientes.
- No incluir claves, tokens, contraseñas ni archivos `.env`.
- Mantener la identidad corporativa Nexiom.
- Validar privacidad, aviso legal y formularios antes de producción.
- Respetar las instrucciones permanentes Nexi / Nexiom Core v1.0.

## 6. Regla operativa

Todo deployment, release o package debe fortalecer la operación de Nexiom Intelligence Group sin comprometer privacidad, confidencialidad, cumplimiento normativo, identidad corporativa ni autoridad final de Giovanny Cerón Pérez.

# Revisión fase 5
- Commit revisado: 02ede95
- Veredicto: APROBADA CON OBSERVACIONES

La isla funciona. Recibe solo los textos resueltos en el idioma de la página, envía `{ nombre, correoElectronico, content }`, muestra alertas en línea en lugar de `alert()` y se hidrata con `client:visible`. Los puntos 14 y 15 de la fase 4 y la sección 5 de `contenido-usuario.md` (Hetzner) están aplicados. Corrige las observaciones **al inicio de la fase 6**, en un commit `Fase 5: corrige observaciones de revisión`.

## Verificación propia
- `astro check` 0 errors; `build` 4 páginas.
- `.env` está ignorado por git ✓. `.env.production` y `.env.example` solo contienen la URL de la API, sin secretos ✓.
- Playwright sobre `dist`, con la API **simulada** mediante `page.route` para no enviar correos reales. Después de esperar la hidratación de la isla:
  - datos inválidos → se muestran "El formato de correo no es válido" y "El mensaje debe tener al menos 10 caracteres", y el botón queda deshabilitado;
  - datos válidos → botón habilitado → POST con el payload correcto → alerta "Mensaje enviado con éxito" y formulario reiniciado;
  - después del reinicio, datos válidos otra vez → la API responde 500 → alerta "No se pudo enviar el mensaje". En la captura se ve bien.
- Desviación declarada: CORS `http://localhost:4321` en `osmanHerreraSiteBackend/src/app.ts`. Es aceptable: solo afecta al desarrollo local, porque en producción la API se sirve desde el mismo origen (`/api`).

## Observaciones
1. [menor] `ContactForm.tsx:232`: el botón está `disabled={!isValid || isSending}`. Un botón deshabilitado no recibe foco ni explica por qué no se puede enviar; además, `errors.formInvalid` existe en el config pero no se usa. → Deshabilitar solo mientras `isSending`. Con `mode: 'onTouched'`, `react-hook-form` muestra los errores al salir del campo o al intentar enviar, y enfoca el primer campo inválido. Si el envío falla por validación, muestra `texts.errors.formInvalid` como resumen.
2. [menor] `ContactForm.tsx:150-225`: los errores no están vinculados a sus campos. → En cada campo, agregar `aria-invalid={!!errors.x}` y `aria-describedby="contact-x-error"`, y poner ese `id` en el `<p>` del error.
3. [menor] `ContactForm.tsx:185`: el patrón `/^\S+@\S+$/i` acepta `a@b`. → Usar `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
4. [menor] `contactForm.alerts.error.es`: "No se pudo enviar el mensaje" y la versión en inglés ("… Please try again.") ya no dicen lo mismo. → es: `No se pudo enviar el mensaje. Intenta de nuevo.`
5. [proceso] La prueba E2E del reporte envió **correos reales** por SMTP a la bandeja del usuario, en ambos idiomas. → En las próximas pruebas, simula la API con `page.route('**/api/email', …)` y deja el envío real solo para una prueba manual final, que decide el usuario.

## TODO para el usuario
- Aprobar el texto nuevo `contactForm.alerts.close`: "Cerrar notificación" / "Close notification". Solo lo usan los lectores de pantalla.
- Módulo de reclutamiento: descripción y URL exacta. Sigue apareciendo "TODO: confirmar" en la tarjeta.

<!-- VEREDICTO: APROBADA CON OBSERVACIONES -->

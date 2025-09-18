# Recordatorio de Medicación — Hackathon Sanitas F5 (Septiembre 2025)

> Proyecto full‑stack para facilitar la gestión y el recordatorio de medicación de personas usuarias.  
> **Evento:** Hackathon F5 · Septiembre 2025

---

## Introducción
En el marco del **Hackathon F5 (septiembre 2025)**, desarrollamos una **aplicación web** que permite **registrar medicamentos** y **programar recordatorios** para su toma. El reto se inspira en un caso real del sector salud y persigue integrar **buenas prácticas** de desarrollo, **arquitectura escalable**, **seguridad** y **experiencia de usuario**.

## Objetivos
- Diseñar e implementar una aplicación para **registrar medicamentos** y **programar recordatorios**.
- Practicar **arquitectura cliente‑servidor** con **backend y frontend separados**.
- Aplicar principios de **mantenibilidad**, **calidad del código** y **testeo**.
- Fomentar **trabajo en equipo**, **innovación** y **resolución técnica** en un entorno ágil.


## Arquitectura y Stack
Separación clara entre **frontend** y **backend**, comunicación vía **API REST** y estructura modular (componentes, rutas, controladores, etc.).

```
root
├─ frontend/          # App React (UI, formularios, pop-ups, validaciones)
│  └─ src/
│     ├─ components/  # PopUp, formularios, listas
│     ├─ pages/       # Vistas
│     ├─ services/    # Cliente API (fetch/axios)
│     └─ tests/
└─ backend/           # API REST (rutas, controladores, modelos, DB)
   ├─ src/
   │  ├─ routes/
   │  ├─ controllers/
   │  ├─ models/
   │  └─ middlewares/
   └─ tests/
```

### Frontend
- **React** con componentes modulares y estado controlado.
- Formularios para **registro de medicamentos** y **alergias** (opc).
- Visualización del **estado** (pendiente/tomado), filtros y **modo oscuro** (opc).
- Consumo de **API real** (sin datos hardcodeados).
- **Test unitarios** (React Testing Library / Vitest o Jest).

---

## API REST
### Modelo de datos
Ejemplo mínimo (puede variar según DB/ORM):

```jsonc
// Medicamento
{
  "id": "string",
  "name": "Paracetamol",
  "dose": "1 tableta (500mg)",
  "schedule": {
    "time": "21:00"              // formato HH:mm (hora local)
  },
  "taken": false,                 // estado actual
  "createdAt": "2025-09-01T10:00:00Z",
  "updatedAt": "2025-09-01T10:00:00Z"
}
```

### Endpoints mínimos
- `POST /medicamentos` — crear un medicamento.
- `GET /medicamentos` — listar medicamentos.
- `PUT /medicamentos/:id/tomado` — marcar como **tomado**.
- `DELETE /medicamentos/:id` — eliminar medicamento.

> **Nota**: El frontend también puede usar `/api/reminders/active` y `PUT /api/reminders/:id/taken` si se define esta capa de “recordatorios activos”.

### Ejemplos de requests
```http
POST /medicamentos
Content-Type: application/json

{
  "name": "Ibuprofeno",
  "dose": "400mg",
  "schedule": { "time": "08:00" }
}
```

```http
PUT /medicamentos/123/tomado

```

### Comandos
**Frontend**
```bash
cd frontend
npm i
npm run dev         # desarrollo
npm run build       # producción
npm run preview     # previsualizar build
npm run test        # tests
npm run lint        # lint
```

**Backend**
```bash
cd backend
npm i
npm run dev         # nodemon
npm run start       # producción
npm run test        # tests
npm run lint        # lint
```

---

## Calidad del código y Gitflow
- **Commits** pequeños y **descriptivos** (en inglés), siguiendo convenciones (feat/fix/chore/docs/refactor/test).
- **Ramas**: `main` (estable), `develop` (integración), `feature/*` (desarrollo), `hotfix/*` (urgentes).
- **PRs** con descripción, checklist y revisión por pares.
- Código **limpio**, **tipado** opcional con TypeScript, y **comentado solo si aporta**.


---

## Roadmap / Backlog
- [ ] CRUD completo de medicamentos (frontend + backend).
- [ ] Pop‑ups: aviso **pre** (5 min) y **due** (hora exacta).
- [ ] Marcar como **tomado** y filtrar **activos/histórico**.
- [ ] Gestión de **alergias** y validación cruzada.
- [ ] Modo oscuro y mejoras de accesibilidad.
- [ ] Notificaciones del navegador / Service Worker.
- [ ] Documentación Swagger + esquema DB.
- [ ] Despliegue en cloud (Railway/Render/Vercel).

---

## Trello y Figma
- **Figma (diseño)**: https://www.figma.com/design/shhDIdwihI3ELKu37fWSAo/Sin-t%C3%ADtulo?node-id=0-1&t=zHj0HfZnQZUhAWRu-1


---

## Créditos
Equipo participante del **Hackathon F5**. ¡Gracias a mentores y organización!



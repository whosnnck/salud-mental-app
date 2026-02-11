# Salud Mental (Frontend + Backend)

Plataforma de bienestar emocional con dos aplicaciones: frontend en Angular y backend en Node.js/Express con MySQL. Permite autenticación por roles, check-ins emocionales diarios, diario personal, solicitudes de apoyo y panel de RRHH con métricas y bandeja de solicitudes.

## Arquitectura

- **Frontend**: Angular (SPA con rutas por rol y componentes standalone).
- **Backend**: Express + JWT.
- **Base de datos**: MySQL.

## Stack tecnológico

- Angular 21 + Angular Router
- Node.js + Express
- MySQL (mysql2)
- JWT (jsonwebtoken)
- Chart.js (visualizaciones en el dashboard)

## Funcionalidades principales

### Autenticación

- Registro e inicio de sesión con JWT.
- Roles: `EMPLOYEE` y `HR`.
- Persistencia de sesión en `localStorage` y envío automático del token con interceptor.

### Empleado

- **Check-in emocional** (moods: good/neutral/bad/tired) con control de frecuencia.
- **Resumen de check-ins** (historial reciente y de hoy).
- **Diario personal** (CRUD de entradas con opción de compartir).
- **Soporte**: solicitar contacto RRHH, ayuda psicológica o escribir cómo se siente.
- **Autocuidado y bienestar** (secciones informativas).
- **Perfil**.

### RRHH

- **Dashboard** con estadísticas y check-ins anónimos.
- **Inbox** de solicitudes de apoyo.
- Listados y filtros de empleados (presentes, ausentes, por departamento, resumen, etc.).

### Recursos

- Sección de recursos de bienestar.

## Rutas del frontend

- Auth: `/login`.
- Empleado: `/employee/checkin`, `/employee/checkin-summary`, `/employee/wellness`, `/employee/self-care`, `/employee/profile`, `/employee/support/*`.
- RRHH: `/hr/dashboard`, `/hr/inbox`.
- Recursos: `/resources`.

Rutas definidas en [salud-mental/src/app/app.routes.ts](salud-mental/src/app/app.routes.ts).

## API del backend (resumen)

Base URL: `http://localhost:3000`

Todas las rutas, excepto Auth, requieren token JWT en el header `Authorization: Bearer <token>`.

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Usuario

- `GET /api/user/me`

### Check-ins

- `POST /api/checkins`
- `GET /api/checkins/my`
- `GET /api/checkins/recent?limit=10`
- `GET /api/checkins/today`
- `GET /api/checkins/latest`
- `GET /api/checkins/can-submit`

### Diario

- `POST /api/diary`
- `GET /api/diary/my`
- `GET /api/diary/recent?limit=10`
- `GET /api/diary/:id`
- `PUT /api/diary/:id`
- `DELETE /api/diary/:id`

### Soporte

- `POST /api/support`
- `GET /api/support/my`
- `GET /api/support/recent?limit=10`
- **HR**: `GET /api/support/all`
- **HR**: `GET /api/support/status/pending`
- **HR**: `PATCH /api/support/:id/status`
- **HR**: `DELETE /api/support/:id`

### Empleados (HR)

- `GET /api/employees/all`
- `GET /api/employees/summary`
- `GET /api/employees/by-department/:department`
- `GET /api/employees/present-today`
- `GET /api/employees/absent-today`
- `GET /api/employees/statistics`
- `GET /api/employees/checkins`

## Seguridad

- JWT en header `Authorization: Bearer <token>`.
- Middleware `verifyToken` en backend.
- `AuthGuard` e interceptor de Angular para proteger rutas y adjuntar token.

Archivos clave:

- Interceptor: [salud-mental/src/app/core/services/auth.interceptor.ts](salud-mental/src/app/core/services/auth.interceptor.ts)
- Guard: [salud-mental/src/app/core/services/auth.guard.ts](salud-mental/src/app/core/services/auth.guard.ts)
- Middleware: [salud-mental-backend/src/middleware/auth.middleware.js](salud-mental-backend/src/middleware/auth.middleware.js)

## Control de frecuencia de check-ins

El backend limita la frecuencia de check-ins usando `CHECKIN_INTERVAL_SECONDS`:

- Producción: 86400 segundos (1 día) por defecto.
- Desarrollo: 120 segundos por defecto.

## Configuración del backend

Archivos clave:

- Configuración MySQL: [salud-mental-backend/src/config/db.js](salud-mental-backend/src/config/db.js)
- Servidor: [salud-mental-backend/src/server.js](salud-mental-backend/src/server.js)

Variables de entorno recomendadas:

- `PORT` (default 3000)
- `NODE_ENV`
- `JWT_SECRET`
- `CHECKIN_INTERVAL_SECONDS`
- `CORS_ORIGIN`

Ejemplo de archivo .env:

```
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=salud_mental
JWT_SECRET=tu_clave_secreta
CORS_ORIGIN=http://localhost:4200
CHECKIN_INTERVAL_SECONDS=120
```

> Nota: la conexión MySQL actual está definida en [salud-mental-backend/src/config/db.js](salud-mental-backend/src/config/db.js). Ajusta credenciales/DB según tu entorno.

## Base de datos (tablas esperadas)

- `users`: id, full_name, email, password, role, created_at, updated_at
- `checkins`: id, user_id, mood, notes, created_at
- `diary_entries`: id, user_id, emotion, content, is_shareable, created_at, updated_at
- `support_requests`: id, user_id, request_type, subject, message, urgency, phone_contact, status, created_at, updated_at
- `employee_summary`: vista/tabla de apoyo para reportes

## Instalación y ejecución

### Requisitos

- Node.js y npm
- MySQL

### Backend

1. Ir a la carpeta [salud-mental-backend](salud-mental-backend)
2. Instalar dependencias
3. Configurar DB y variables de entorno
4. Iniciar servidor

Ejemplo:

```
cd salud-mental-backend
npm install
npm start
```

### Frontend

1. Ir a la carpeta [salud-mental](salud-mental)
2. Instalar dependencias
3. Iniciar app Angular

Ejemplo:

```
cd salud-mental
npm install
npm start
```

## Scripts útiles

Frontend (ver [salud-mental/package.json](salud-mental/package.json)):

- `npm start` (dev server en `http://localhost:4200`)
- `npm run build`
- `npm test`
- `npm run serve:ssr:salud-mental` (SSR, requiere build previo)

Backend (ver [salud-mental-backend/package.json](salud-mental-backend/package.json)):

- `npm start` (API en `http://localhost:3000`)

## Estructura del proyecto

- Frontend: [salud-mental](salud-mental)
- Backend: [salud-mental-backend](salud-mental-backend)

## Referencias internas

- Notas de cambios del backend: [salud-mental-backend/CAMBIOS.md](salud-mental-backend/CAMBIOS.md)
- README Angular base: [salud-mental/README.md](salud-mental/README.md)

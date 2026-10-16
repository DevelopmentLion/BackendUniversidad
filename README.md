# Universidad Backend

Backend API para el sistema universitario construido con TypeScript y Hono, desplegado en Cloudflare Workers.

## Tecnologías

- TypeScript
- Hono (Framework web para Cloudflare Workers)
- Zod (Validación de esquemas)
- Web Crypto API (Hashing de contraseñas compatible con Cloudflare)
- jose (Autenticación JWT compatible con Cloudflare)
- Cloudflare Workers (Runtime serverless)

## Instalación

```bash
npm install
```

## Variables de Entorno

Para desarrollo local, crea un archivo `.dev.vars` en la raíz del proyecto:

```
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

Para producción en Cloudflare, configura el secreto en el dashboard de Cloudflare o usando wrangler:

```bash
wrangler secret put JWT_SECRET
```

## Scripts

- `npm run dev` - Inicia el servidor de desarrollo local con wrangler
- `npm run build` - Compila el proyecto TypeScript
- `npm run deploy` - Despliega a Cloudflare Workers

## Endpoints

### Autenticación

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario

### Usuarios

- `GET /api/users/profile` - Obtener perfil del usuario (requiere autenticación)
- `PUT /api/users/profile` - Actualizar perfil del usuario (requiere autenticación)

### Cursos

- `GET /api/courses` - Obtener todos los cursos
- `GET /api/courses/:id` - Obtener un curso por ID
- `POST /api/courses` - Crear un nuevo curso
- `PUT /api/courses/:id` - Actualizar un curso
- `DELETE /api/courses/:id` - Eliminar un curso

### Sesiones

- `GET /api/sessions` - Obtener todas las sesiones (filtrar por ?status=upcoming)
- `GET /api/sessions/:id` - Obtener una sesión por ID
- `POST /api/sessions` - Crear una nueva sesión
- `PUT /api/sessions/:id` - Actualizar una sesión
- `DELETE /api/sessions/:id` - Eliminar una sesión

### Calificaciones

- `GET /api/grades` - Obtener todas las calificaciones
- `GET /api/grades/:id` - Obtener una calificación por ID
- `POST /api/grades` - Crear una nueva calificación
- `PUT /api/grades/:id` - Actualizar una calificación
- `DELETE /api/grades/:id` - Eliminar una calificación

### Actividades

- `GET /api/activities` - Obtener todas las actividades (filtrar por ?status=pending)
- `GET /api/activities/:id` - Obtener una actividad por ID
- `POST /api/activities` - Crear una nueva actividad
- `PUT /api/activities/:id` - Actualizar una actividad
- `DELETE /api/activities/:id` - Eliminar una actividad

## Autenticación

Para acceder a las rutas protegidas, incluye el token JWT en el header:

```
Authorization: Bearer <token>
```

## Ejemplo de Uso

### Desarrollo Local

```bash
npm run dev
```

Esto iniciará el servidor en `http://localhost:8787`

### Login

```bash
curl -X POST http://localhost:8787/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan.perez@universidad.edu","password":"password123"}'
```

### Obtener Cursos

```bash
curl http://localhost:8787/api/courses
```

### Obtener Perfil (requiere token)

```bash
curl http://localhost:8787/api/users/profile \
  -H "Authorization: Bearer <token>"
```

## Despliegue en Cloudflare Workers

### 1. Autenticarse con Cloudflare

```bash
npx wrangler login
```

### 2. Configurar secreto JWT

```bash
wrangler secret put JWT_SECRET
```

### 3. Desplegar

```bash
npm run deploy
```

El backend estará disponible en una URL como: `https://universidad-backend.workers.dev`

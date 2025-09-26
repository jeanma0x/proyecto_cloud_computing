# Mi App Cloud - Aplicación Node.js con Docker y AWS RDS

Aplicación web desarrollada con Node.js, Express, Docker y conectada a una base de datos AWS RDS para el curso de Cloud Computing.

## Características

- ✅ Login de usuario con autenticación
- ✅ Menú principal (Dashboard)
- ✅ CRUD completo de usuarios (Crear, Consultar, Actualizar, Borrar)
- ✅ Conexión a base de datos AWS RDS (MySQL)
- ✅ Containerización con Docker/Podman
- ✅ Interfaz web responsive con Bootstrap

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Base de Datos**: MySQL en AWS RDS
- **Autenticación**: bcryptjs, express-session
- **Frontend**: EJS, Bootstrap 5
- **Containerización**: Docker/Podman
- **Cloud**: AWS RDS

## Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd mi-app-cloud
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus credenciales de AWS RDS
```

### 4. Configurar la base de datos
Ejecutar el siguiente script SQL en tu instancia AWS RDS:

```sql
CREATE DATABASE IF NOT EXISTS app_cloud;
USE app_cloud;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password) 
VALUES ('admin', 'admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');
```

### 5. Ejecutar la aplicación

#### Desarrollo local:
```bash
npm run dev
```

#### Con Podman:
```bash
# Construir imagen
podman build -t mi-app-cloud .

# Ejecutar contenedor
podman run -d \
  --name mi-app-cloud \
  -p 3000:3000 \
  --env-file .env \
  mi-app-cloud
```

## Uso de la Aplicación

1. Acceder a `http://localhost:3000`
2. Iniciar sesión con:
   - **Usuario**: `admin`
   - **Contraseña**: `password`
3. Navegar por el dashboard y gestionar usuarios

## Funcionalidades CRUD

- **Crear**: Agregar nuevos usuarios desde el formulario
- **Consultar**: Ver lista completa de usuarios registrados
- **Actualizar**: Editar información de usuarios existentes
- **Borrar**: Eliminar usuarios (excepto el propio)

## Comandos Útiles de Podman

```bash
# Ver contenedores corriendo
podman ps

# Ver logs
podman logs mi-app-cloud

# Parar contenedor
podman stop mi-app-cloud

# Eliminar contenedor
podman rm mi-app-cloud

# Acceder al contenedor
podman exec -it mi-app-cloud /bin/sh
```
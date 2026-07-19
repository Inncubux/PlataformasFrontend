# 💼 Pyme SP - Sistema de Remuneraciones

Plataforma web para la gestión de remuneraciones, administración de empleados y configuración de parámetros previsionales conforme a la normativa laboral chilena.

Este repositorio contiene la arquitectura inicial del proyecto (Sprint 1), incluyendo la estructura modular del frontend, la API backend y la orquestación de contenedores para despliegue local.

---

## 📋 Descripción General

Pyme SP busca simplificar la administración de recursos humanos y remuneraciones para pequeñas y medianas empresas, proporcionando herramientas para:

* Gestión de empleados.
* Cálculo y administración de remuneraciones.
* Configuración de parámetros previsionales.
* Integración con normativas laborales chilenas.
* Administración centralizada mediante una plataforma web moderna.

---

## 🛠️ Stack Tecnológico

### Frontend

* Angular 20
* Standalone Components
* NG-ZORRO

### Backend

* .NET 8
* ASP.NET Core Web API
* Entity Framework Core

### Base de Datos

* PostgreSQL 15

### Infraestructura

* Docker
* Docker Compose

---

## 🏗️ Arquitectura

El sistema se encuentra desacoplado en tres capas principales:

```text
┌─────────────────┐
│    Frontend     │
│   Angular 20    │
└────────┬────────┘
         │ HTTP/REST
         ▼
┌─────────────────┐
│   Backend API   │
│    .NET 8       │
└────────┬────────┘
         │ EF Core
         ▼
┌─────────────────┐
│   PostgreSQL    │
│     v15         │
└─────────────────┘
```

Cada servicio se ejecuta en un contenedor independiente y se comunica mediante una red privada de Docker.

---

## 🚀 Despliegue Local con Docker

### Requisitos

* Docker Desktop instalado y en ejecución.
* Docker Compose habilitado.

### Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd <carpeta-raiz>
```

### Construir y levantar los contenedores

```bash
docker-compose up --build -d
```

### Verificar contenedores activos

```bash
docker ps
```

---

## 🌐 Acceso a los Servicios

| Servicio    | URL / Puerto          |
| ----------- | --------------------- |
| Frontend    | http://localhost:80   |
| Backend API | http://localhost:5000 |
| PostgreSQL  | localhost:5432        |

### Configuración PostgreSQL

| Parámetro     | Valor        |
| ------------- | ------------ |
| Usuario       | postgres     |
| Contraseña    | admin_pymesp |
| Base de Datos | pymesp_db    |

---

## 🛑 Detener los Servicios

Para detener y eliminar los contenedores:

```bash
docker-compose down
```

Para eliminar también los volúmenes:

```bash
docker-compose down -v
```

---

## 💻 Desarrollo Frontend (Hot Reload)

Si deseas trabajar únicamente sobre la interfaz gráfica sin utilizar Docker:

```bash
cd PlataformasFrontend
pnpm install
pnpm start
```

La aplicación estará disponible en:

```text
http://localhost:4200
```

---

## 📂 Estructura del Proyecto

```text
/
├── PlataformasFrontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Backend/
│   ├── Controllers/
│   ├── Services/
│   ├── Models/
│   └── Program.cs
│
├── docker-compose.yml
├── Dockerfile
└── README.md
```

---

## 👥 Equipo de Desarrollo

### Samuel Fuentes

**Full Stack Developer / Líder Técnico**

### Pamela Vera

**Backend Developer**

* Contabilidad
* Criptografía

### Matías Carmona

**Backend Developer**

* Gestión Empresarial
* APIs Externas

### Axel Mondaca

**Frontend Developer / DevOps**

---

## 📄 Licencia

Proyecto desarrollado con fines académicos y de aprendizaje.

Todos los derechos reservados © Pyme SP.

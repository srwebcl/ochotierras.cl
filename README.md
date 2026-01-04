# Plataforma Web Viña Ocho Tierras

Una experiencia digital premium desarrollada para **Viña Ocho Tierras**, fusionando una estética cinematográfica y minimalista con una robusta plataforma de comercio electrónico. Este proyecto está diseñado para transmitir la elegancia y tradición de la vitivinicultura a través de interfaces modernas y fluidas.

![Viña Ocho Tierras Banner](/public/images/general/Vinedos-1 de tamaño grande.jpeg)

## 📋 Descripción General

El sistema se compone de una arquitectura híbrida moderna que separa la experiencia de usuario (Frontend) de la lógica de negocio y administración (Backend), garantizando rendimiento, escalabilidad y una gestión de contenidos eficiente.

### Características Principales

*   **Experiencia de Usuario Inmersiva:** Diseño "Glassmorphism" y efectos visuales de alta gama (Parallax, Scroll suave, Transiciones cinemáticas).
*   **eCommerce Especializado:** Catálogo de vinos con lógica de venta por cajas, carrito de compras dinámico y pasarela de pagos integrada.
*   **Internacionalización (i18n):** Soporte completo para Español e Inglés, incluyendo detección automática y cambio de idioma fluido.
*   **Gestión de Contenidos (CMS):** Panel de administración intuitivo para gestionar productos, inventario, clientes y pedidos en tiempo real.
*   **Optimización SEO:** Estructura semántica, metadatos dinámicos y optimización de carga (Core Web Vitals).

---

## 🛠️ Stack Tecnológico

### Frontend (Cliente)
*   **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
*   **Lenguaje:** TypeScript
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
*   **Componentes:** Shadcn/ui & Radix UI
*   **Animaciones:** Framer Motion & GSAP
*   **Estado:** React Context API (Carrito)
*   **Internacionalización:** `next-intl`

### Backend (API & Admin)
*   **Framework:** [Laravel 11](https://laravel.com/)
*   **Lenguaje:** PHP 8.2+
*   **Panel Admin:** FilamentPHP v3
*   **Base de Datos:** MySQL
*   **API:** RESTful API para comunicación con el frontend.

---

## 🚀 Instalación y Configuración Local

### Prerrequisitos
*   Node.js 18+
*   PHP 8.2+
*   Composer
*   MySQL

### 1. Configuración del Frontend

```bash
# Navegar al directorio raíz
cd /ruta/al/proyecto

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# (Editar .env.local con la URL de la API)

# Iniciar servidor de desarrollo
npm run dev
```

### 2. Configuración del Backend

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias de PHP
composer install

# Configurar variables de entorno
cp .env.example .env
# (Configurar credenciales de base de datos)

# Generar clave de aplicación
php artisan key:generate

# Ejecutar migraciones
php artisan migrate --seed

# Iniciar servidor
php artisan serve
```

---

## 🔐 Variables de Entorno

El proyecto requiere configurar las siguientes variables clave (no incluir valores reales en el repositorio):

**Frontend (.env.local):**
*   `NEXT_PUBLIC_API_URL`: URL base de la API Laravel.
*   `NEXT_PUBLIC_SITE_URL`: URL pública del sitio.

**Backend (.env):**
*   `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`: Credenciales de base de datos.
*   `APP_URL`: URL del backend.
*   `FILESYSTEM_DISK`: Configuración de almacenamiento (local/s3).

---

## 📦 Despliegue

El proyecto está optimizado para flujos de CI/CD modernos:

*   **Frontend:** Compatible con despliegue en Vercel o Netlify (Serverless).
*   **Backend:** Requiere un servidor PHP (Apache/Nginx) o contenedor Docker.

---

## 📜 Licencia

Este proyecto es propiedad privada de **Viña Ocho Tierras**. Todos los derechos reservados.

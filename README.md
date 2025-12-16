# Ochotierras Web Renovada

Este proyecto es una renovación completa del sitio web y tienda online de Viña Ochotierras, utilizando tecnologías modernas para asegurar velocidad, estetica premium y escalabilidad.

## Stack Tecnológico
- **Framework**: Next.js 15 (App Router)
- **Estilos**: Tailwind CSS v4 + Framer Motion
- **Lenguaje**: TypeScript
- **Fuente de Datos**: `src/data/products.ts` (Archivo JSON local para fácil edición)

## Estructura del Proyecto
- `src/app`: Rutas del sitio (Home, Store, Product Details).
- `src/components`: Componentes reutilizables (Navbar, Footer, Hero, ProductCard).
- `src/data`: Datos de productos.

## Cómo empezar

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Correr servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Visita `http://localhost:3000`.

## Extracción de Imágenes (Migración)
Para poblar el sitio con las imágenes originales de Ochotierras, recomendamos descargar los activos del sitio actual. Puedes usar este comando en tu terminal para bajar las imágenes:

```bash
# Crear carpeta de activos
mkdir -p public/images/extracted

# Descargar imágenes (requiere wget)
wget -r -P public/images/extracted -A jpeg,jpg,png,gif,mp4 https://www.ochotierras.cl
wget -r -P public/images/extracted -A jpeg,jpg,png,gif https://tienda.ochotierras.cl
```

Luego, actualiza `src/data/products.ts` y `src/components/Hero.tsx` con las rutas de las imágenes locales (ej: `/images/extracted/...`).

## Autoadministración
Por ahora, el catálogo se administra editando `src/data/products.ts`.
Para una solución más avanzada, se recomienda conectar este frontend a un CMS como **Sanity.io** o **Strapi**. El código está modularizado para facilitar esta integración.

## Despliegue
Este proyecto está listo para ser desplegado en **Vercel**.
1. Sube el código a GitHub.
2. Importa el repositorio en Vercel.
3. ¡Listo!

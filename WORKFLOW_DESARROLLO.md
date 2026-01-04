# Workflow de Desarrollo y Despliegue - Ochotierras

Este documento describe el proceso paso a paso para realizar cambios, probarlos localmente y desplegarlos en producción (Vercel para Frontend, cPanel para Backend).

---

## 💻 1. Desarrollo y Pruebas Locales

Antes de subir cualquier cambio, asegúrate de que todo funcione en tu máquina.

### Frontend (Next.js)
El frontend se encarga de la interfaz visual.

1.  Abre una terminal en la raíz del proyecto.
2.  Ejecuta el servidor de desarrollo:
    ```bash
    npm run dev
    ```
3.  Abre tu navegador en `http://localhost:3000`.
4.  Realiza tus cambios en la carpeta `src/`. Los cambios se reflejarán automáticamente.

### Backend (Laravel)
El backend maneja la lógica, base de datos y correos.

1.  Abre **otra** terminal (o una nueva pestaña).
2.  Entra a la carpeta del backend:
    ```bash
    cd backend
    ```
3.  Ejecuta el servidor local de Laravel:
    ```bash
    php artisan serve
    ```
4.  El backend estará disponible en `http://localhost:8000`.

> **Nota:** Si tus cambios en el frontend requieren datos del backend, asegúrate de que tu `.env.local` en la raíz apunte a tu backend local (`NEXT_PUBLIC_API_URL=http://localhost:8000`) si quieres probar la integración completa localmente, o déjalo apuntando a producción si solo estás tocando estilos visuales.

---

## 🔄 2. Guardar y Sincronizar Cambios (Git)

Una vez que hayas verificado que tus cambios funcionan:

1.  **Ver estado de archivos:**
    ```bash
    git status
    ```
    *(Verifica que solo estás subiendo los archivos que modificaste)*

2.  **Agregar cambios:**
    ```bash
    git add .
    ```

3.  **Confirmar cambios (Commit):**
    Usa un mensaje descriptivo.
    ```bash
    git commit -m "Descripción breve de tus cambios (ej: Ajustar tamaño de logo en footer)"
    ```

4.  **Subir a GitHub (Push):**
    ```bash
    git push origin main
    ```

---

## 🚀 3. Despliegue en Producción

Al hacer `git push`, se inician los procesos de despliegue.

### A. Frontend (Vercel) - **Automático**
Vercel detecta automáticamente el `push` a la rama `main` y comienza a construir la nueva versión.
- No necesitas hacer nada extra.
- Puedes verificar el estado en [vercel.com](https://vercel.com/dashboard).

### B. Backend (cPanel) - **Manual / Semiautomático**
Para el backend, usamos la herramienta "Git Version Control" de cPanel.

1.  Ingresa a tu **cPanel**.
2.  Ve a **"Git™ Version Control"**.
3.  Busca el repositorio `ochotierras` y haz clic en **"Manage"**.
4.  Ve a la pestaña **"Pull or Deploy"**.
5.  **Paso Crucial:**
    - Haz clic en **"Update from Remote"** (para bajar los cambios de GitHub al servidor).
    - Luego, haz clic en **"Deploy HEAD"**.

> **¿Qué hace "Deploy HEAD"?** 
> Ejecuta automáticamente el archivo `.cpanel.yml` que ya está configurado para:
> - Copiar los archivos de `backend/` a la carpeta pública (`public_html/api...`).
> - Instalar dependencias de Composer.
> - Correr migraciones de base de datos.
> - Limpiar cachés.

### ⚠️ Casos Especiales (Solo Backend)
Si modificaste la estructura de la base de datos o instalaste paquetes nuevos de PHP y el "Deploy HEAD" falla, puedes correr los comandos manualmente desde la terminal de cPanel (o SSH):

```bash
cd /home/ochotierras/api.ochotierras.cl
/usr/local/bin/php artisan migrate --force
/usr/local/bin/php artisan config:clear
```

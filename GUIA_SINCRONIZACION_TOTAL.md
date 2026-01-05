# 🔄 GUÍA MAESTRA DE SINCRONIZACIÓN Y DESPLIEGUE
**Proyecto:** Ochotierras Web Platform (Frontend Next.js + Backend Laravel)

Este documento detalla el flujo de trabajo exacto para sincronizar cambios locales y desplegarlos en producción (cPanel y Vercel) de manera segura y profesional.

---

## 🗺️ Mapa de Arquitectura

1.  **Tu Computador (Local):** Donde haces el código.
2.  **GitHub (La Nube):** La "verdad absoluta" del código. Todo pasa por aquí.
3.  **Vercel (Frontend):** Se actualiza **automáticamente** cuando GitHub cambia.
4.  **cPanel (Backend/API):** Se actualiza **manualmente** (o semi-automáticamente) jalando los cambios desde GitHub.

---

## 🚀 FLUJO DE TRABAJO PASO A PASO

### PASO 1: Desarrollo y Sincronización (Local -> GitHub)

Cada vez que termines una tarea o sesión de trabajo, debes enviar tus cambios a GitHub.

1.  **Guardar cambios (Commit):**
    Abre tu terminal en la carpeta del proyecto y ejecuta:
    ```bash
    git add .
    git commit -m "Descripción breve de lo que hiciste (ej: nuevo diseño de tarjetas)"
    ```

2.  **Subir a la nube (Push):**
    ```bash
    git push origin main
    ```

    ✅ **Resultado:** Tu código está a salvo en GitHub. Esto **dispara automáticamente** el despliegue del Frontend.

---

### PASO 2: Despliegue del Frontend (Automático en Vercel)

**No tienes que hacer nada.**
Al momento de hacer `git push`, Vercel detecta el cambio, construye la aplicación Next.js y la actualiza en vivo.

*   **¿Cómo verificar?**
    Entra a tu panel de Vercel para ver el estado del "Deployment". Si sale en verde (Ready), la web `ochotierras.cl` ya tiene los cambios visibles.

---

### PASO 3: Despliegue del Backend (cPanel)

Este paso es necesario **SOLO si modificaste archivos dentro de la carpeta `/backend`** (PHP, Laravel, Base de Datos). Si solo cambiaste diseño (React/Next.js/Imágenes en public), puedes saltarte este paso.

**Instrucciones:**

1.  Ingresa a tu cuenta de **cPanel**.
2.  Busca la herramienta **"Git™ Version Control"**.
3.  En la lista de repositorios, ubica `ochotierras` y haz clic en **"Manage"**.
4.  Ve a la pestaña **"Pull or Deploy"**.
5.  Haz clic en el botón azul **"Update from Remote"**.
    *   *Esto descarga los cambios desde GitHub al servidor de cPanel.*
6.  Una vez que diga "Success", haz clic en el botón **"Deploy HEAD"**.
    *   *Esto ejecuta el script `.cpanel.yml` que copia los archivos a la carpeta pública y limpia cachés.*

✅ **Resultado:** Tu API está actualizada.

---

## ⚠️ CASOS ESPECIALES (Mantenimiento Backend)

Si tus cambios de backend incluyeron **modificaciones a la Base de Datos** (Migraciones) o **nuevas librerías** (Composer), a veces el despliegue automático de cPanel necesita un empujón final.

**Solo en esos casos**, usa la **Terminal** dentro de cPanel (o SSH) para ejecutar lo siguiente:

```bash
# Ir a la carpeta de la API
cd /home/ochotierras/api.ochotierras.cl

# 1. Si agregaste librerías nuevas:
/opt/cpanel/ea-php82/root/usr/bin/php /usr/local/bin/composer install --no-dev

# 2. Si cambiaste la base de datos:
/opt/cpanel/ea-php82/root/usr/bin/php artisan migrate --force

# 3. Siempre es bueno limpiar caché tras cambios grandes:
/opt/cpanel/ea-php82/root/usr/bin/php artisan optimize:clear
```

---

## 🆘 SOLUCIÓN DE PROBLEMAS

**1. Las imágenes nuevas no se ven:**
Asegúrate de que el enlace simbólico del storage esté activo. En la terminal de cPanel corre:
```bash
cd /home/ochotierras/api.ochotierras.cl
php artisan storage:link
```

**2. Error 500 en la API:**
Revisa el archivo de logs para ver el error exacto:
```bash
tail -n 50 /home/ochotierras/api.ochotierras.cl/storage/logs/laravel.log
```

**3. Vercel falló el despliegue:**
Revisa los "Build Logs" en Vercel. Usualmente es un error de TypeScript o de una variable de entorno faltante.

---

## RESUMEN RÁPIDO

| Acción Realizada | ¿Qué debo hacer? |
| :--- | :--- |
| **Cambio de Diseño / Texto** | Solo `git push`. (Vercel lo hace solo). |
| **Cambio en Lógica PHP / API** | `git push` + cPanel "Update/Deploy". |
| **Cambio en Base de Datos** | `git push` + cPanel "Deploy" + `php artisan migrate`. |

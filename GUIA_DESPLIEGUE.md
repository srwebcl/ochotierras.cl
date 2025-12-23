# GUÍA DE DESPLIEGUE (Modo Git + cPanel)

Detecté que ya tienes configurada la sincronización con Git en cPanel (`.cpanel.yml`). Esto simplifica enormemente el proceso.

---

## 🚀 PASO 1: SUBIR CAMBIOS A GITHUB

Primero, debes subir todos los ajustes que hemos realizado (arreglos de backend, config de imágenes, etc) a tu repositorio central.

Ejecuta en tu terminal:
```bash
git add .
git commit -m "Configuración completa para producción y arreglos de frontend"
git push origin main
```

---

## ⚙️ PASO 2: DESPLEGAR BACKEND (cPanel)

1. Ingresa a tu **cPanel**.
2. Busca la herramienta **"Git™ Version Control"**.
3. Verás tu repositorio listado. Haz clic en **"Manage"** (Administrar).
4. Ve a la pestaña **"Pull or Deploy"**.
5. Haz clic en **"Update from Remote"** para traer los últimos cambios desde GitHub.
6. Una vez actualizados, haz clic en **"Deploy HEAD"**.
   - Esto ejecutará automáticamente el script `.cpanel.yml` para copiar los archivos.

7. **⚠️ PASO CRÍTICO PARA ESTA ACTUALIZACIÓN** (Solo Backend):
   Debido a que instalamos librerías nuevas (`Google Translate`) y cambiamos la base de datos, debes hacer esto extra en el Panel de cPanel o Terminal SSH:
   
   *Si tienes acceso a Terminal en cPanel:*
   ```bash
   cd /home/ochotierras/api.ochotierras.cl
   /opt/cpanel/ea-php82/root/usr/bin/php /usr/local/bin/composer install
   /opt/cpanel/ea-php82/root/usr/bin/php artisan migrate --force
   /opt/cpanel/ea-php82/root/usr/bin/php artisan queue:restart
   ```
   
   *(Si no tienes terminal, el script .cpanel.yml debería intentar hacerlo, pero verifica que no de errores).*

8. **Automatizar las Traducciones (CRON JOB)**:
   Como estás en un hosting compartido, la mejor forma de que la fila de traducciones se mueva sola es con un "Cron Job" que corra cada minuto.
   
   - Ve a cPanel -> Herramienta **"Cron Jobs"** (o "Trabajos de Cron").
   - En "Common Settings" (Configuración Común), elige: **"Once Per Minute"** (Cada minuto - `* * * * *`).
   - En el campo "Command" (Comando), pega esto:
     ```bash
     /opt/cpanel/ea-php82/root/usr/bin/php /home/ochotierras/api.ochotierras.cl/artisan queue:work --stop-when-empty >> /dev/null 2>&1
     ```
   - Haz clic en **"Add New Cron Job"**.
   - *¡Listo! Ahora el servidor revisará cada minuto si hay cosas por traducir y las procesará.*

> **Nota:** Si es la primera vez que despliegas en esta nueva base de datos MySQL, asegúrate de que tu archivo `.env` en el servidor (dentro de la carpeta `/home/ochotierras/api.ochotierras.cl/`) tenga las credenciales correctas de la base de datos MySQL que creaste.

---

## 🌐 PASO 3: DESPLEGAR FRONTEND (Vercel)

Si ya tienes el proyecto en Vercel, este se actualizará automáticamente cuando hiciste el `git push` en el Paso 1.

**Solo necesitas verificar una cosa:**
1. Ve a tu proyecto en **Vercel**.
2. Entra a **Settings** -> **Environment Variables**.
3. Asegúrate de tener definida: `NEXT_PUBLIC_API_URL`
   - Valor: `https://api.ochotierras.cl` (o la URL de tu backend).
4. Si cambiaste la variable, ve a **Deployments** y dale a **Redeploy** en el último commit para que tome el cambio.

---

## ✅ VERIFICACIÓN

1. **Backend**: Entra a `https://api.ochotierras.cl/api/products`. ¿Devuelve JSON?
2. **Frontend**: Entra a tu sitio (ej: `ochotierras.vercel.app`).
   - Ve a la Tienda.
   - Verifica que carguen los productos y los filtros funcionen.
   - Verifica que las imágenes se vean (esto confirma que el `symbolic link` del paso 2 funcionó).

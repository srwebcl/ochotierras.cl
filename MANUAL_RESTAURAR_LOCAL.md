# 🔄 MANUAL: RESTAURAR LOCAL DESDE PRODUCCIÓN (CPANEL)
**Objetivo:** Hacer que tu entorno local (tu computador) sea una copia exacta de lo que hay en cPanel (Base de Datos e Imágenes).

Este proceso es útil cuando has agregado muchos productos o ventas en la web real y quieres tener esa información en tu computador para seguir desarrollando.

---

## 🛠️ PARTE 1: LA BASE DE DATOS (MySQL)

Lo más importante es traer los datos (Productos, Usuarios, Pedidos).

### En cPanel (Producción):
1. Ingresa a tu **cPanel**.
2. Busca la herramienta **"phpMyAdmin"** (en la sección Bases de Datos).
3. En la barra lateral izquierda, haz clic en el nombre de tu base de datos de producción (ej: `ochotier_laravel` o similar).
4. En el menú superior, haz clic en la pestaña **"Exportar"**.
5. Deja seleccionado el método **"Rápido"** y formato **"SQL"**.
6. Haz clic en **"Exportar"**.
   *   💾 *Se descargará un archivo `.sql` a tu computador (ej: `ochotier_laravel.sql`).*

### En tu Computador (Local):
1. Asegúrate de que `php artisan serve` esté detenido o no importe (esto es a nivel de base de datos).
2. Abre tu herramienta de base de datos favorita (TablePlus, DBeaver, o phpMyAdmin local si usas XAMPP/MAMP).
   *   *Si usas terminal, puedes saltar al paso 4.*
3. **Conéctate a tu servidor MySQL local.**
   Al abrir TablePlus/DBeaver, crea una "New Connection" de tipo **MySQL** y usa estos datos:
   
   | Campo | Valor |
   | :--- | :--- |
   | **Host** | `127.0.0.1` |
   | **Port** | `3306` |
   | **User** | `root` |
   | **Password** | *(Déjalo vacío)* |
   | **Database** | `ochotierras_local` |

4. **IMPORTANTE:** Borra todas las tablas actuales (si las hubiera) para evitar conflictos.

5. **Importar el archivo:**
   *   **Opción A (Visual):** En tu herramienta, busca "File > Import" o "Restore" y selecciona el `.sql` de cPanel.
   *   **Opción B (Rápida en Terminal):**
       Si no quieres configurar la herramienta, mueve el archivo `.sql` (que descargaste de cPanel en el Paso 1) a la carpeta de tu proyecto y corre esto en tu terminal:
       ```bash
       mysql -u root ochotierras_local < ochotierras_api.sql
       ```

✅ **Resultado:** Tu base de datos local ahora tiene exactamente los mismos productos y usuarios que la web real.

---

## 🖼️ PARTE 2: LAS IMÁGENES (Storage)

Si subiste fotos de vinos en la web real, estas no estarán en tu computador a menos que las descargues.

### En cPanel (Producción):
1. Ve al **Administrador de Archivos** en cPanel.
2. Navega a la carpeta de tu proyecto backend: `api.ochotierras.cl` -> `storage` -> `app`.
3. Verás una carpeta llamada `public`.
4. Haz clic derecho en la carpeta `public` y selecciona **"Compress"** (Comprimir).
5. Elige formato **Zip Archive** y dale nombre (ej: `imagenes_produccion.zip`).
6. Descarga ese archivo ZIP a tu computador.

### En tu Computador (Local):

> ⚠️ **¡ATENCIÓN CON LA RUTA!**
> No confundas esta carpeta con `backend/public` ni con `ochotierras/public`.
> Estamos buscando la carpeta de **ALMACENAMIENTO** (Storage).
>
> **Ruta Correcta:** `ochotierras/backend/storage/app/`

1. Ve a esa carpeta exacta: `ochotierras/backend/storage/app`.
2. Borra (o renombra como respaldo) tu carpeta `public` local actual.
3. Descomprime el archivo `imagenes_produccion.zip` aquí.
4. Asegúrate de que la carpeta descomprimida se llame `public`.

✅ **Resultado:** Ahora tienes todas las fotos de las botellas que se subieron en producción.

---

## 🧹 PARTE 3: LIMPIEZA FINAL (Cache)

Para asegurarte de que tu Laravel local reconozca todo, corre estos comandos en tu terminal (en la carpeta `backend`):

```bash
cd backend
php artisan storage:link
php artisan optimize:clear
```

Y reinicia tu servidor:
```bash
php artisan serve
```

---

##  RESUMEN

1. **Bajar SQL** de cPanel (phpMyAdmin -> Exportar).
2. **Importar SQL** en Local (Borrar actual -> Importar).
3. **Bajar ZIP de `storage/app/public`** de cPanel.
4. **Reemplazar carpeta `public`** en `backend/storage/app/` local.
5. **Listo.**

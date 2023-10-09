# Importante:

- Se puede elegir donde se renderiza un componente (client o server), el default es server si se quiere cambiar arriba de todo se debe colocar lo siguiente "use Client"

- El css correspondiente a cada componente va dentro de la carpeta de style.

- Las **rutas** en next.js son los nombres de las carpetas que se encuentran en el directorio **app**

- Para crear una nueva ruta se tiene que crear una carpeta y dentro una archivo que debe llamarse **page.tsx**

- El css correspondiente a una página va dentro de la carpeta que la contiene.

- Se puede abreviar _./src/_ por _@/_

- Las **imágenes** tienen que ir dentro de la carpeta assets dentro de public

- Mantener el formato de etiquetado para carpetas y archivos

- Antes de hacer un push verificar el estilo de los archivos con `npm run lint` y autoformatear con `npm run format`

Algunos errores son inevitables en ese caso agregar una nueva regla en el archivo **.eslintrc.json**.

## Supabase

- Los tipos de supabase hay que regenerarlos cada vez que se modifica/agrega alguna tabla en la base de datos.
  Para eso primero hay que loguearse con `npx supabase login` que pide una token que se puede generar en `https://supabase.com/dashboard/account/tokens`. Después de loguearse se puede correr el comando `npm run gen-types-npx` que actualiza automáticamente los tipos en el archivo `supabase/types/supabase.ts`
  - Para la conexión a la API se necesitan dos variables de entorno, el URL y la api key. Estas variables se obtienen del proyecto de Supabase. Hay que crear un archivo en el root llamado (.env.local) y escribir lo siguiente:
NEXT_PUBLIC_SUPABASE_URL= (URL)
NEXT_PUBLIC_SUPABASE_ANON_KEY= (key)
Utilizando las variables conseguidas anteriormente 

## Credenciales mail de GLAM

gmail: latamglam@gmail.com
pass: 1q2w3e4r5t;

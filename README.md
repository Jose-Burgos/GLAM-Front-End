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
 
  - Para la conexión a la API se necesitan dos variables de entorno, el URL: **https://bjsqhsdofulofilczfcj.supabase.co** y la api key: **eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqc3Foc2RvZnVsb2ZpbGN6ZmNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MjE1NTcsImV4cCI6MjAwOTQ5NzU1N30.p5CQFnh_U_yaqjmsA_nD8DIT2Bn87Km7dNsUP2v1Liw**
Obtené estos valores del sitio de Supabase y colócalos en un archivo en el root llamado (.env.local).
 


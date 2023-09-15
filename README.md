# Importante:

* Se puede elegir donde se renderiza un componente (client o server), el default es server si se quiere cambiar arriba de todo se debe colocar lo siguiente "use Client"


* El css correspondiente a cada componente va dentro de la carpeta de style.

* Las **rutas** en next.js son los nombres de las carpetas que se encuentran en el directorio **app**

* Para crear una nueva ruta se tiene que crear una carpeta y dentro una archivo que debe llamarse **page.tsx**

* El css correspondiente a una página va dentro de la carpeta que la contiene.

* Se puede abreviar *./src/* por *@/*

* Las **imágenes** tienen que ir dentro de la carpeta assets dentro de public

* Mantener el formato de etiquetado para carpetas y archivos

* Antes de hacer un push verificar el estilo de los archivos con


```
npm run lint

```
Algunos errores son inevitables en ese caso agregar una nueva regla en el archivo **.eslintrc.json**.

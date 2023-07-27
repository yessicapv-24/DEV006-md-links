1. Proyecto
Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...) y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional README.md).

Estos archivos Markdown normalmente contienen links (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

Aqui es donde mdLinks contribuye con la opcion de poder validar que los links encontrados dentro de los archivos md ingresados esten en optimas condiciones.

mdLinks funciona a travez del ingreso de una ruta tanto relativa como absoluta a la terminal, ademas de modificar la opcion booleana Validate para obtener mas o menos informacion respecto a los links encontrados.

2. Diagrama de flujo
Para la elaboracion de este proyecto se utilizó un diagrama de flujo que indicara el camino que iba a seguir la API.

![diagrama] (https://github.com/yessicapv-24/DEV006-md-links/blob/main/diagrama.png)


Archivos del proyecto
README.md con descripción del módulo, instrucciones de instalación/uso, documentación del API y ejemplos. Todo lo relevante para que cualquier developer que quiera usar tu librería pueda hacerlo sin inconvenientes.
index.js: Desde este archivo debes exportar una función (mdLinks).
package.json con nombre, versión, descripción, autores, licencia, dependencias, scripts (pretest, test, ...), main, bin
.editorconfig con configuración para editores de texto. Este archivo no se debe cambiar.
.eslintrc con configuración para linter. Este archivo contiene una configuración básica para ESLint, si deseas agregar reglas adicionales como Airbnb deberás modificar este archivo.
.gitignore para ignorar node_modules u otras carpetas que no deban incluirse en control de versiones (git).
test/md-links.spec.js debe contener los tests unitarios para la función mdLinks(). Tu implementación debe pasar estos tests.
JavaScript API
mdLinks(path, options)
Argumentos
path: Ruta absoluta o relativa al archivo o directorio. Si la ruta pasada es relativa, debe resolverse como relativa al directorio desde donde se invoca node - current working directory).
options: Un objeto con únicamente la siguiente propiedad:
validate: Booleano que determina si se desea validar los links encontrados.
Valor de retorno
La función debe retornar una promesa (Promise) que resuelva a un arreglo (Array) de objetos (Object), donde cada objeto representa un link y contiene las siguientes propiedades

Con validate:false :

href: URL encontrada.
text: Texto que aparecía dentro del link (<a>).
file: Ruta del archivo donde se encontró el link.
Con validate:true :

href: URL encontrada.
text: Texto que aparecía dentro del link (<a>).
file: Ruta del archivo donde se encontró el link.
status: Código de respuesta HTTP.
ok: Mensaje fail en caso de fallo u ok en caso de éxito.
Resultados esperados
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
3. Uso
modificacion de objeto validate (true - false)
ingreso de ruta absoluta o relativa al archivo en que se esta ejecutando la funcion mdLinks.
Salida datos Links.

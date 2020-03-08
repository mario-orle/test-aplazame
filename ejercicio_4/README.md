# Ejercicio 4 - JavaScript
En este último ejercicio he decidido hacer uso de expresiones regulares para separar las partes de la query pasada a la función deserialize, para luego recorrer las keys proporcionadas e ir construyendo el objeto final. En este ejercicio sí me ha parecido oportuno comentar el código, dado que se realizan varias operaciones complejas en la función y he creido correcto hacerlo.

Para las claves, los caracteres que se transformarán a camelCase son - y _.

A lo solicitado en el enunciado he añadido la capacidad de escapar los caracteres usados como marcado, que son &, =, ., - y _, para también así simplificar la gestión de los errores. Quizás se podría haber declarado una función que devolviese la expresión regular correspondiente para poder cambiar los separadores, o bien el carácter de escape, pero tras echarle un buen tiempo decidí dejarlo así.

En este proyecto he añadido también tests para chequear tanto lo solicitado en el enunciado como el resto de casos que he considerado oportunos. He instalado Jest en el proyecto para poder ejecutarlos con `npm run test` tras hacer `npm install`
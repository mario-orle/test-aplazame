module.exports = function deserialize(q) {
  if (!(typeof q === 'string' || q instanceof String)) {
    throw "Can only deserialize strings";
  }

  // Se divide la cadena por &, siempre que no esté escapado
  // Posteriormente se sustituye el grupo escapado si existiese por el carácter & de nuevo
  // de manera que se obtiene un array con cada parámetro con su valor separado
  var paramSplitter = /(?<!\\)&/;
  var splittedParams = q.split(paramSplitter).map(function (param) {
    return param.replace(/\\&/g, '&');
  });

  // Se divide cada parámetro por el primer carácter = no escapado
  // Después sustituye los posibles grupos escapados encontrados
  // Y terminamos con un array dentro de otro array de dos elementos, la clave y el valor 
  var keyValueSplitter = /(?<!\\)=(.+)/;
  var splittedKeyValues = splittedParams.map(function (param) {
    return param.split(keyValueSplitter)
      .map(function (param) {
        return param.replace(/\\=/g, '=');
      });
  });
  
  // Se declara el objeto a devolver al final
  var retObj = {};
  splittedKeyValues.map(function (keyValue) {
    var key = keyValue[0];
    var val = keyValue[1];

    // Se obtiene un array con los elementos de la path dividiendo la key por
    // los carácter . no escapados
    var pathSplitter = /(?<!\\)\./;
    var path = key.split(pathSplitter).map(function(part) {
      return part
          .replace(/\\\./g, '.')                         // Sustituimos los \. por .
          .replace(/(?<!\\)[_-]([a-z])/g, function (g) { // Sustituimos los - y _ no escapados
            return g[1].toUpperCase(); })                // por camelCase
            .replace(/\\\_/g, '_').replace(/\\\-/g, '-') // Y sustituimos los - y _ escapados
          
    });

    // Obtenemos una referencia al objeto final a devolver
    var ref = retObj;
    path.map(function (part, index) {
      // Y para cada elemento del path que no sea el último
      if (index < path.length - 1) {
        // Creamos objeto vacío si no existe el path en la referencia
        if (!ref[part]) {
          ref[part] = {};
        }
        // Y asignamos al objeto ref el objeto recién creado, de manera
        // que a la siguiente iteración se podrá ir creando el objeto profundo
        ref = ref[part];
      } else {
        // En la última iteración, si el valor es vacío no creamos el objeto
        // y en caso contrario asignamos a la referencia el valor final
        if (part !== '') {
          var obj = {};
          obj[part] = val;
          ref = Object.assign(ref, obj);
        }
      }
    });
  });

  return retObj;
}

### Ejemplos de Selectores CSS

#### Selectores de Clase:

```css
$$(".fish.yellow-fish");
Selecciona todos los elementos con la clase "yellow-fish" que son descendientes directos de un elemento con la clase "fish".


$$(".fish.red-fish>.side-fin");
Selecciona todos los elementos con la clase "side-fin" que son descendientes directos de un elemento con la clase "red-fish", el cual es descendiente directo de un elemento con la clase "fish".


$$(".fish.red-fish>.side-fin>*>*");
Selecciona todos los elementos que son nietos directos de un elemento con la clase "side-fin", que a su vez es descendiente directo de un elemento con la clase "red-fish", el cual es descendiente directo de un elemento con la clase "fish".


$$(".fish.red-fish>*>.anathomy");
Selecciona todos los elementos con la clase "anathomy" que son descendientes directos de cualquier elemento que sea descendiente directo de un elemento con la clase "red-fish", el cual es descendiente directo de un elemento con la clase "fish".


$$(".fish.red-fish .anathomy");
Selecciona todos los elementos con la clase "anathomy" que son descendientes de un elemento con la clase "red-fish", el cual es descendiente de un elemento con la clase "fish".



$$(".fish.red-fish option");
Selecciona todos los elementos option que son descendientes de un elemento con la clase "red-fish", el cual es descendiente de un elemento con la clase "fish".

Otros Ejemplos de Selectores CSS:


$$("[move='fast']");
Selecciona todos los elementos que tienen un atributo move con el valor "fast".



$$("[move$='t']");
Selecciona todos los elementos que tienen un atributo move cuyo valor termina con la letra "t".

Ejemplos Adicionales:
Por Clase:
javascript
Copy code
$$(".miClase");



Por ID:
javascript
Copy code
$$("#miId");


Por Atributo:
javascript
Copy code
$$("[miAtributo='miValor']");



Por Tipo de Atributo:
javascript
Copy code
$$("[miAtributo]");


Por Selector CSS:
javascript
Copy code
$$(".miSelector");


Por Pseudo-clases y Pseudo-elementos:
javascript
Copy code
$$(".miSelector:first-child");
$$(".miSelector:nth-child(2)");



Por Contenido de Texto:
javascript
Copy code
$$(":contains('Texto')");



Combinando Selectores:
javascript
Copy code
$$(".clase1 .clase2");


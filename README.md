
# Contador en React Redux

![video](video/demo.gif)

# La aplicación

El ejemplo consiste en un simple contador numérico, al que le podemos incrementar o decrementar su valor de uno en uno. Para ayudar a entender el funcionamiento de React Redux, incorporamos un _log_ que mostrará cada operación de suma o resta que haya pedido el usuario, con la opción de poder borrarlo.

# React Redux

El framework React Redux permite unificar el estado compartido de una aplicación a partir de

- un store, que representa ese estado compartido (una _shared memory_)
- acciones, que producen efectos colaterales sobre el estado
- y funciones reductoras, que con cada acción que se produce en lugar de modificar directamente el estado devuelve uno nuevo

La introducción más detallada puede verse en el ejemplo [del mundial 2018](https://github.com/uqbar-project/eg-mundial2018-react/tree/fase3).

## Tutoriales de React Redux

Si querés ver un tutorial en castellano didáctico, te recomendamos [este link](https://www.youtube.com/watch?v=RZNNu2pO49g&t=458s) (es el primero de varios videos, luego youtube hace su gracia y te va linkeando los demás).

## Los componentes

Tenemos tres componentes en nuestra aplicación:

- Contador: el label que muestra el valor y los dos botones para sumar o restar ese valor
- LogContador: el container general que genera la tabla y su encabezado, y trabaja con la lista de logs de las operaciones que se van produciendo
- LogRow: el componente que sabe mostrar un log dentro de una tabla

![image](images/componentes.png)

## Nuestro estado compartido

En el store vamos a definir como estado compartido el valor numérico actual y la lista de logs:

archivo _src/redux/store.js_

```javascript
export default createStore(reducer, { value: 0, logs: [] })
```

## Definiendo las acciones en la función reductora

Tendremos tres acciones: subir un valor (INCREMENT), bajar un valor (DECREMENT), ambas generan un nuevo log y eliminar un log (DELETE_LOG).

archivo _src/redux/store.js_

```javascript
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const DELETE_LOG = 'DELETE_LOG'

const reducer = (state, action) => {
    if (action.type === DELETE_LOG) {
        return {
            ...state,
            logs: state.logs.filter((log) => action.log.id !== log.id)
        }
    }
    const newLogs = state.logs.concat(new Log(action.type))
    if (action.type === INCREMENT) {
        return {
            value: state.value + 1,
            logs: newLogs
        }
    }
    if (action.type === DECREMENT) {
        return {
            value: state.value - 1,
            logs: newLogs
        }
    }
    return state
}
```

## Creando actions

La parte burocrática de Redux hay que cumplirla: generamos funciones que devuelven una action para que la función reductora las utilice:

```javascript
import { INCREMENT, DECREMENT, DELETE_LOG } from "./store"

export function increment() {
    return {
        type: INCREMENT
    }
}

export function decrement() {
    return {
        type: DECREMENT
    }
}

export function deleteLog(log) {
    return {
        type: DELETE_LOG,
        log
    }
}
```

## Enlazando las acciones con cada componente

Veamos cómo debe funcionar el botón que sube un valor:

![image](images/ContadorReactReduxIncrement.png)

Próximamente más info

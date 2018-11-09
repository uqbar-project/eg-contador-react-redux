
# Contador en React Redux

[![Build Status](https://travis-ci.org/uqbar-project/eg-contador-react-redux.svg?branch=master)](https://travis-ci.org/uqbar-project/eg-contador-react-redux)

![video](video/demo.gif)

# Mejorando la cohesión de las funciones reductoras

Repasemos qué logramos en el ejemplo hasta el momento

- los componentes React tienen solamente un método _render_, lo que permite que no nos quejemos de que conviven código javascript y pseudo-tags de html. Esto permite que la vista necesite menos comportamiento.

- el estado global lo tiene el _store_, que permite acotar los lugares donde hay efecto colateral. También sirve como elemento centralizador para disparar cambios en los componentes, no importa si son hijos o hermanos.

- la función reductora permite establecer qué parte del _store_ cambia, en base a las diferentes acciones

Por otra parte, repasemos la función reducer que construimos en el archivo _store.js_:

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

[what](https://media.giphy.com/media/pPhyAv5t9V8djyRFJH/giphy.gif)

Tenemos una función **poco cohesiva**, porque básicamente maneja todos los cambios de estado de nuestro store. Hoy tiene 3 responsabilidades pero esto crece a medida que tenga nuevas funcionalidades para agregar.

# Divide y vencerás

Recordemos la estrategia de partir un problema grande en varios más pequeños, que nos sirve para cualquier paradigma en el que estemos programando. Quizás haya pasado inadvertido, pero no estamos modelando una solución con objetos sino con funciones: de todas maneras la buena noticia es que podemos tener funciones que hagan lo que tienen que hacer y nada más (el concepto de cohesión).

De hecho tenemos tres funciones modeladas como actions:

```js
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

# Refactor to the rescue

Lo que haremos ahora es ubicar la responsabilidad en cada una de las funciones:

- increment
- decrement
- deleteLog

Para eso lo que haremos es que cada función devuelva **una función reductora propia**. Cada función reductora recibirá

- el estado actual
- y devolverá el estado siguiente

Por ejemplo la que borra el log:

```js
export function deleteLog(log) {
    return {
        type: DELETE_LOG,
        reducer: (state) => {
            return {
                ...state,
                logs: state.logs.filter((_log) => log.id !== _log.id)
            }
        }
    }
}
```

E incluso podemos delegar en una función común la suma y la resta del contador:

```js
export function increment() {
    return {
        type: INCREMENT,
        reducer: modifyCounter(INCREMENT, 1) 
    }
}

export function decrement() {
    return {
        type: DECREMENT,
        reducer: modifyCounter(DECREMENT, -1)
    }
}

function modifyCounter(type, howMany) {
    return (state) => { 
        const newLogs = [...state.logs]
        newLogs.push(new Log(type))
        return {
            value: state.value + howMany,
            logs: newLogs
        }
    }
}
```

# El nuevo store

El store tiene una función reductora mucho más simple, que solamente descarta la acción inicial que le inyecta Redux, algo que tiene el formato

```json
{ "type": "@@redux/INIT8.w.8.8.6.7" }
```

que no tiene una función _reducer_, por eso podemos reconocerla:

```js
export const reducerContador = (state, action) => {
    console.log(action)
    if (action.reducer) {
        return action.reducer(state)
    }
    return state
}

export default createStore(reducerContador, { value: 0, logs: [] })
```

Y como vemos la creación del store, así como los componentes React, quedan igual.

# Conclusiones

De esta manera tenemos un conjunto de funciones reductoras más chicas, y el store trabaja con funciones que son polimórficas, lo que permite que la aplicación crezca sin que haya una función reductora que crezca en líneas desaforadamente.

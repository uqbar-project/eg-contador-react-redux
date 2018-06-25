
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

archivo _src/redux/actions.js_

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

Mapearemos entonces en el componente contador:

- como **state del store** la propiedad value
- como **action**, un objeto que contiene el type INCREMENT, sin más parámetros


Y en el componente LogContador mapearemos:

- como **state del store** la propiedad logs
- como **action**, un objeto que contiene el type DELETE_LOG, con un parámetro: el log que queremos eliminar

## Acción incrementar valor

Veamos cómo debe funcionar el botón que sube un valor:

![image](images/ContadorReactReduxIncrement.png)

- el **reducer** del store para la acción INCREMENT recibe el state con el valor y la lista actual de logs, el action y devuelve un nuevo state con el valor incrementado (como el valor es un número, garantizamos su inmutabilidad), y con la lista de logs con un nuevo elemento que refleja la operación de incremento. 
- al devolver un nuevo estado, se dispara el **render** del componente Contador, ya que tiene mapeada la propiedad _value_ de la vista con el store. Esto fuerza un cambio en el DOM del HTML.

```javascript
class Contador extends Component {

    render() {
        return (
            <Panel>
                ...
                    <Label bsStyle="success">{this.props.value}</Label>
                    <Button bsStyle="primary" onClick={() => this.props.increment()}>+</Button>

```

- además, como el LogContador mapea la propiedad _logs_ de la vista con el store, esto también fuerza un cambio en el DOM del HTML, para reflejar una línea adicional que muestre el nuevo log.


## Acción eliminar log

![image](images/ContadorReactRedux_DeleteLog_1.png)

Dentro del componente LogRow (en el archivo _/src/componentes/logContador.js_) mapeamos el botón que elimina un log con la correspondiente función que despacha la acción de Redux:

- el **reducer** del store para la acción DELETE_LOG recibe el state con la lista actual de logs y el value, el action y devuelve un nuevo state con el mismo valor original pero con una lista de logs que tiene un elemento menos. 
- al devolver un nuevo estado, se dispara el **render** del componente LogContador removiendo del DOM la fila de la tabla que contenía el log eliminado
- en cuanto al componente Contador, no se dispara el **render** ya que el _value_ mapeado por la vista no se modificó (pueden corroborarlo insertando console.log en el método)

````javascript
export class LogContador extends Component {

    render() {
        return (
                <tbody>
                    {this.props.logs.map((log) => <LogRow log={log} key={log.id} deleteLog={this.props.deleteLog} />)}
        )
    }
}

const mapStateToProps = state => {
    return {
        logs: state.logs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteLog: (log) => dispatch(deleteLog(log))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogContador)
```

Un último detalle, la función deleteLog se pasa desde el componente padre (LogContador) hacia el componente hijo (LogRow) para unificar el mapeo hacia las acciones que disparan los cambios en el store, gracias al manejo de referencias dinámico que tiene javascript (donde las funciones son un objeto más, tanto como un número o un string).

# Testing

TODO
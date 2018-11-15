import { createStore } from 'redux'

export const reducerContador = (state, { reducer = (state) => state }) => {
    return reducer(state)
}

export default createStore(reducerContador, 
    { value: 0, logs: [] })

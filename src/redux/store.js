import { createStore } from 'redux'

export const reducerContador = (state, action) => {
    console.log(action)
    if (action.reducer) {
        return action.reducer(state)
    }
    return state
}

export default createStore(reducerContador, 
    { value: 0, logs: [] })

import { Log } from '../domain/log'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const DELETE_LOG = 'DELETE_LOG'

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
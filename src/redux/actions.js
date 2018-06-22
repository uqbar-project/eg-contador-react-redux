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
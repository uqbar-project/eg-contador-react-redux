import React, { useState, createContext } from 'react'
import { Log } from './domain/log'
export const Context = createContext()

const Provider = ({ children }) => {
    const [count, setCount] = useState(0)
    const [logs, setLogs] = useState([])
    const value = {
        count,
        logs,
        decrement: () => {
            const newLogs = [...logs]
            newLogs.push(new Log("DECREMENT"))
            setLogs(newLogs)
            setCount(count - 1)
        },
        increment: () => {
            const newLogs = [...logs]
            newLogs.push(new Log("INCREMENT"))
            setLogs(newLogs)
            setCount(count + 1)
        },
        deleteLog: (logToDelete) => {
            const newLogs = logs.filter((log) => logToDelete.id !== log.id)
            setLogs(newLogs)
        }
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}
export default {
    Provider,
    Consumer: Context.Consumer
}
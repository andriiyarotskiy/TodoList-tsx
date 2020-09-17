import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API-todolist'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const getTodo = async () => {
            const res = await todolistAPI.getTodolist()
            try {
                setState(res.data)
            } finally {
            }
        }
        getTodo()
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const newTitle = 'SAGA'
        const createTodo = async () => {
            try {
                const res = await todolistAPI.createTodolist(newTitle)
                setState(res.data)
            } finally {
            }
        }
        createTodo()
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b0994513-536d-4345-8bad-554910ed6be6';
        const deleteTodo = async () => {
            const res = await todolistAPI.deleteTodolist(todolistId)
            try {
                setState(res.data)
            } finally {
            }
        }
        deleteTodo()
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const newTitle = 'REDUX'
        const todolistId = '01535e69-3197-4d68-ae68-843b5b9e021b'
        const updateTodo = async () => {
            const res = await todolistAPI.updateTodolist(todolistId, newTitle)
            try {
                setState(res.data)
            } finally {
            }
        }
        updateTodo()
    }, [])
    return <div> {JSON.stringify(state)}</div>
}


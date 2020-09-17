import React, {useEffect, useState} from 'react'
import {tasksApi, todolistAPI} from "../api/todolist-api";


export default {
    title: 'API-tasks'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'bf07ef38-af6d-4bf1-a2b6-de0df187b7be'
        tasksApi.getTasks(todolistId).then((res) => {
            setState(res.data.items)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'bf07ef38-af6d-4bf1-a2b6-de0df187b7be'
        const title = 'Minsk'
        tasksApi.createTask(todolistId, title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'bf07ef38-af6d-4bf1-a2b6-de0df187b7be'
        const taskId = 'edc66216-5e8a-4aca-aed5-1a60d7b30cdb'
        tasksApi.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'bf07ef38-af6d-4bf1-a2b6-de0df187b7be'
        const taskId = 'f5958f23-fe97-4136-b7d5-b9498b49a3bc'
        const title = 'Kiev'
        tasksApi.updateTask(todolistId, taskId, title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
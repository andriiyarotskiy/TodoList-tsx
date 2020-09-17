import React, {useEffect, useState} from 'react'
import {tasksApi} from "../api/todolist-api";


export default {
    title: 'API-tasks'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '01535e69-3197-4d68-ae68-843b5b9e021b'
        const getTasks = async () => {
            const res = await tasksApi.getTasks(todolistId)
            try {
                setState(res.data.items)
            } finally {
            }
        }
        getTasks()
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '01535e69-3197-4d68-ae68-843b5b9e021b'
        const title = 'FORMIK'
        const createTask = async () => {
            tasksApi.createTask(todolistId, title).then((res) => {
                setState(res.data)
            })
        }
        createTask()
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '01535e69-3197-4d68-ae68-843b5b9e021b'
        const taskId = '6469e1b4-8523-4550-b438-87224977eed5'
        const deleteTask = async () => {
            const res = await tasksApi.deleteTask(todolistId, taskId)
            try {
                setState(res.data)
            } finally {
            }
            deleteTask()
        }
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '01535e69-3197-4d68-ae68-843b5b9e021b'
        const taskId = '93061106-1d73-476a-b961-c817525778a4'
        const title = 'ASYNC/AWAIT'
        const updateTask = async () => {
            const res = await tasksApi.updateTask(todolistId, taskId, title)
            try {
                setState(res.data)
            } finally {
            }
        }
        updateTask()
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
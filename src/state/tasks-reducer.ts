import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todoListID1, todoListID2} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    tasksId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    tasksId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    tasksId: string
    title: string
    todolistId: string
}

type ActionsType = AddTaskActionType |
    RemoveTaskActionType |
    ChangeStatusActionType |
    ChangeTitleActionType |
    AddTodolistActionType |
    RemoveTodolistActionType

const initialState = {}

// меня вызовут и дадут мне стейт (почти всегда объект)
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const copyState = {...state}
            const tasks = copyState[action.todolistId]
            copyState[action.todolistId] = tasks.filter(t => t.id !== action.tasksId)
            return copyState
        }
        case 'ADD-TASK': {
            const copyState = {...state}
            const tasks = copyState[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            copyState[action.todolistId] = [newTask, ...tasks]
            return copyState
        }
        case 'CHANGE-TASK-STATUS': {
            const copyState = {...state}
            let tasks = copyState[action.todolistId]
            copyState[action.todolistId] = tasks.map(t => t.id === action.tasksId
                ? {...t, isDone: action.isDone}
                : t)
            return copyState
        }
        case "CHANGE-TASK-TITLE": {
            const copyState = {...state}
            const tasks = copyState[action.todolistId]
            const newTask = tasks.find(t => t.id === action.tasksId)
            if (newTask) {
                newTask.title = action.title
            }
            return copyState
        }
        case "ADD-TODOLIST": {
            const copyState = {...state}
            copyState[action.todolistId] = []
            return copyState
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            return state
    }
}

export const removeTaskAC = (tasksId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', tasksId: tasksId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}
export const changeTaskStatusAC = (tasksId: string, isDone: boolean, todolistId: string): ChangeStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', tasksId: tasksId, isDone: isDone, todolistId: todolistId}
}
export const changeTaskTitleAC = (tasksId: string, title: string, todolistId: string): ChangeTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', tasksId: tasksId, title: title, todolistId: todolistId}
}


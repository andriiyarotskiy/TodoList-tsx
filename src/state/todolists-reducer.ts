import {FilterValuesType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType |
    ChangeTodolistsFilterActionType
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type ChangeTodolistsFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

export let todoListID1 = v1();
export let todoListID2 = v1();


const initialState: Array<TodolistType> = []


// меня вызовут и дадут мне стейт (почти всегда объект)
export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId, title: action.title, filter: "all"
            }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE" : {
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER" : {
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistsFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

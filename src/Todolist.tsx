import React, {ChangeEvent} from 'react';
import {filterValueType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (id: string, value: filterValueType) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    filter: filterValueType
    removeTodoList: (id: string) => void
    changeTaskTitle: (id: string, title: string, todolistID: string) => void
}

export function Todolist(props: PropsType) {

    let jsxTasks = props.tasks.map(t => {

        const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeStatus(t.id, newIsDoneValue, props.id);
        }

        const onTitleChangeCallback = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.id)
        }
        return (
            <li key={t.id} className={props.filter !== 'completed' && t.isDone ? 'is-done' : ''}>
                <input type="checkbox" checked={t.isDone} onChange={onStatusChangeHandler}/>
                <EditTableSpan title={t.title} saveTitle={onTitleChangeCallback}/>
                <button onClick={() => {
                    props.removeTask(t.id, props.id)
                }}>X
                </button>
            </li>
        )
    })

    const onAllChangeFilter = () => props.changeFilter(props.id, "all")
    const onActiveChangeFilter = () => props.changeFilter(props.id, "active")
    const onCompletedChangeFilter = () => props.changeFilter(props.id, "completed")

    const deleteTodoList = () => props.removeTodoList(props.id)

    const createTaskTitle = (title: string) => {
        props.addTask(title, props.id)
    }

    return ( // РЕТУРН JSX
        <div>
            <h3>{props.title}
                <button onClick={deleteTodoList}>X</button>
            </h3>

            <AddItemForm addItem={createTaskTitle}/>

            <ul>
                {jsxTasks}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllChangeFilter}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveChangeFilter}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedChangeFilter}>Completed
                </button>
            </div>
        </div>
    )
}
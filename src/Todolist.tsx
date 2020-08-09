import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


type PropsType = {
    id: string
    title: string
    changeFilter: (id: string, value: FilterValuesType) => void
    filter: FilterValuesType
    removeTodoList: (id: string) => void
    changeTodoListTitle: (id: string, NewTitle: string) => void
}

export function Todolist(props: PropsType) {
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()


    let allTodolistTasks = tasks;
    let tasksForToDoList = allTodolistTasks;

    if (props.filter === "active") {
        tasksForToDoList = allTodolistTasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForToDoList = allTodolistTasks.filter(t => t.isDone)
    }


    let jsxTasks = tasksForToDoList.map(t => {

        const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id))
        }

        const onTitleChangeCallback = (newTitle: string) => {
            dispatch(changeTaskTitleAC(t.id, newTitle, props.id))
        }
        return (
            <div key={t.id} className={props.filter !== 'completed' && t.isDone ? 'is-done' : ''}>
                <Checkbox
                    checked={t.isDone}
                    onChange={onStatusChangeHandler}
                    color={"primary"}
                />
                <EditTableSpan title={t.title} saveTitle={onTitleChangeCallback}/>
                <IconButton onClick={() => {
                    dispatch(removeTaskAC(t.id, props.id))
                }}
                            color={"secondary"}
                >
                    <Delete/>
                </IconButton>
            </div>
        )
    })

    const onAllChangeFilter = () => props.changeFilter(props.id, "all")
    const onActiveChangeFilter = () => props.changeFilter(props.id, "active")
    const onCompletedChangeFilter = () => props.changeFilter(props.id, "completed")

    const deleteTodoList = () => props.removeTodoList(props.id)
    const changeTodoListTitle = (NewTitle: string) => {
        props.changeTodoListTitle(props.id, NewTitle)
    }

    const createTaskTitle = (title: string) => {
        dispatch(addTaskAC(title, props.id))
    }

    return ( // РЕТУРН JSX
        <div>
            <h3>
                <EditTableSpan title={props.title} saveTitle={changeTodoListTitle}/>
                <IconButton onClick={deleteTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={createTaskTitle}/>
            <div>
                {jsxTasks}
            </div>
            <div>
                <Button
                    variant={"contained"}
                    onClick={onAllChangeFilter}
                    color={props.filter === 'all' ? 'primary' : 'secondary'}
                >All
                </Button>
                <Button
                    variant={"contained"}
                    onClick={onActiveChangeFilter}
                    color={props.filter === 'active' ? 'primary' : 'secondary'}
                >Active
                </Button>
                <Button
                    variant={"contained"}
                    onClick={onCompletedChangeFilter}
                    color={props.filter === 'completed' ? 'primary' : 'secondary'}
                >Completed
                </Button>
            </div>
        </div>
    )
}
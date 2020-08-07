import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValuesType = "all" | "active" | "completed"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

const AppWithReducers = () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, dispatchTodoListsReducer] = useReducer(todolistsReducer, [
        {id: todoListID1, title: "Books", filter: "all"},
        {id: todoListID2, title: "Songs", filter: "active"}
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,
        {
            [todoListID1]:
                [
                    {id: v1(), title: "HTML&CSS", isDone: true},
                    {id: v1(), title: "JS", isDone: true},
                    {id: v1(), title: "ReactJS", isDone: false},
                    {id: v1(), title: "Redux", isDone: false},
                ],
            [todoListID2]:
                [
                    {id: v1(), title: "Redux", isDone: false},
                    {id: v1(), title: "RestApi", isDone: false},
                    {id: v1(), title: "GraphQL", isDone: false}
                ]
        }
    )

    function removeTask(id: string, todoListID: string) {
        dispatchToTasksReducer(removeTaskAC(id, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchToTasksReducer(addTaskAC(title, todoListID))
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        dispatchToTasksReducer(changeTaskStatusAC(id, isDone, todoListID))
    }

    function changeTaskTitle(id: string, title: string, todoListID: string) {
        dispatchToTasksReducer(changeTaskTitleAC(id, title, todoListID))
    }

    function changeFilter(id: string, value: FilterValuesType) {
        dispatchTodoListsReducer(changeTodolistFilterAC(id, value))
    }

    function removeTodoList(id: string) {
        const action = removeTodolistAC(id)
        dispatchTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    function changeTodoListTitle(id: string, NewTitle: string) {
        dispatchTodoListsReducer(changeTodolistTitleAC(id, NewTitle))
    }

    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatchTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {

                        let allTasks = tasks[tl.id]

                        let tasksForToDoList = allTasks

                        if (tl.filter === "active") {
                            tasksForToDoList = allTasks.filter(t => !t.isDone)
                        }
                        if (tl.filter === "completed") {
                            tasksForToDoList = allTasks.filter(t => t.isDone)
                        }

                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForToDoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;

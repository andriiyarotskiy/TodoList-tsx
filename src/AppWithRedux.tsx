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
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


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

const AppWithRedux = () => {

    const dispatch = useDispatch()
    const todolists =  useSelector<AppRootState, Array<TodolistType>>(state=> state.todolists )



    function changeFilter(id: string, value: FilterValuesType) {
        dispatch(changeTodolistFilterAC(id, value))
    }

    function removeTodoList(id: string) {
        const action = removeTodolistAC(id)
        dispatch(action)
    }

    function changeTodoListTitle(id: string, NewTitle: string) {
        dispatch(changeTodolistTitleAC(id, NewTitle))
    }

    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
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
                    {todolists.map(tl => {



                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
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

export default AppWithRedux;

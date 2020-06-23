import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';


export type filterValueType = "all" | "active" | "completed"


function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "RestApi", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])

    let [filter, setFilter] = useState<filterValueType>('all')

    function removeTask(id: string) {
        let filtredTasks = tasks.filter(t => t.id !== id)
        setTasks(filtredTasks)
    }

    function changeFilter(value: filterValueType) {
        setFilter(value)
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    function changeStatus(id: string, isDone: boolean){
        let task = tasks.find(task => task.id === id)
        if(task){
            task.isDone = isDone
            setTasks([...tasks])
        }
    }


    let tasksForToDoList = tasks

    if (filter === "active") {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForToDoList = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;

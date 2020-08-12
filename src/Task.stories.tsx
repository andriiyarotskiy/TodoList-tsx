import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";

import {Task} from "./Task";

export default {
    title: 'Example/Task',
    component: Task,
} as Meta;

const changeTaskStatus = action('change Task Status')
const changeTaskTitle = action('change Task Title')
const removeTask = action('remove Task')

export const TaskBaseExample = (props: any) => {
    return (
        <>
            <Task task={{id: '1', title: 'HTML', isDone: false}}
                  todolistId={'1'}
                  removeTask={removeTask}
                  changeTaskTitle={changeTaskTitle}
                  changeTaskStatus={changeTaskStatus}
            />
            <Task task={{id: '2', title: 'JS', isDone: true}}
                  todolistId={'2'}
                  removeTask={removeTask}
                  changeTaskTitle={changeTaskTitle}
                  changeTaskStatus={changeTaskStatus}
            />
        </>
    )
}



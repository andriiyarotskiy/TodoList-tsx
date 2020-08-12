import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";

import {AddItemForm} from "./AddItemForm";

export default {
    title: 'Example/AddItemForm',
    component: AddItemForm,
} as Meta;

export const AddItemFormBasicExample = (props: any) => {
    return (
        <AddItemForm addItem={action('click add item')}/>
    )
}



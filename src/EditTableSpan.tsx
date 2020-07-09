import React, {ChangeEvent, useState} from "react";

type EditTableSpanType = {
    title: string
    saveTitle: (newTitle: string) => void
}

export function EditTableSpan(props: EditTableSpanType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.saveTitle(title)
        setTitle("")
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return editMode
        ? <input value={title}
                 autoFocus={true}
                 onBlur={offEditMode}
                 onChange={changeTitle}
        />
        : <span onDoubleClick={onEditMode}>{props.title}</span>

}
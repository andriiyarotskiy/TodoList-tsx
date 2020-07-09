import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {


    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onAddItemClick = () => {
        if (title.trim() !== '') {
            props.addItem(title);
        } else {
            setError("title is required")
        }
        setTitle("");
    }
    const onKeyPressItemTask = (e: KeyboardEvent) => {
        if (e.charCode === 13) {
            onAddItemClick()
        }
    }

    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={onTitleChange}
                onKeyPress={onKeyPressItemTask}
                className={error ? 'error' : ''}
            />
            <button onClick={onAddItemClick}>ADD</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}
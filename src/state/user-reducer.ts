type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let newState = {...state} //Делаем копию
            newState.age = state.age + 1 // у копии имеем право менять св-во
            return newState
        // state.age = state.age + 1;
        // return state;
        case 'INCREMENT-CHILDREN-COUNT':
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            };
        case 'CHANGE-NAME' :
            return {
                ...state,
                name: action.newName
            }
        default:
            throw new Error("I don't understand this type")
    }
}
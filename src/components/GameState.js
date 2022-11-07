import { createContext, useContext, useReducer } from 'react'

const StateContext = createContext([])
export function useStateContext() {
    return useContext(StateContext)
}

const StateDispatchContext = createContext((action) => {})
export function useStateDispatchContext() {
    return useContext(StateDispatchContext)
}

const initialState = []
const init = v => v

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, action.payload]
        default:
            return state
    }
}

export const StateContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState, init)

    return (
        <StateContext.Provider value={state}>
            <StateDispatchContext.Provider value={dispatch}>
                {children}
            </StateDispatchContext.Provider>
        </StateContext.Provider>
    )
}
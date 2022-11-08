import { createContext, useContext, useReducer } from 'react'

const StateContext = createContext([])
export function useStateContext() {
    return useContext(StateContext)
}

const StateDispatchContext = createContext(action => {})
export function useStateDispatchContext() {
    return useContext(StateDispatchContext)
}

const ROOM_W = 320, ROOM_H = 240, GAP = 1
const prepareRooms = (rows, cols) => {
    console.log('prepareRooms:', rows, cols)
    const rooms = []
    for (let row = 0; row < rows; ++row) {
        for (let col = 0; col < cols; ++col) {
            rooms.push({
                name: 'room_' + rooms.length,
                selected: false,
                x: col * (ROOM_W + GAP),
                y: row * (ROOM_H + GAP),
                width: ROOM_W, height: ROOM_H
            })
        }
    }
    return rooms
}

const initialState = prepareRooms(3, 4)

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, action.payload]
        case 'SELECT':
            return state.map(room => (
                room.name === action.payload ? {...room, selected: !room.selected} : {...room, selected: false}
            ))
        default:
            return state
    }
}

export const StateContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState, v => v)

    return (
        <StateContext.Provider value={state}>
            <StateDispatchContext.Provider value={dispatch}>
                {children}
            </StateDispatchContext.Provider>
        </StateContext.Provider>
    )
}
import {useState} from "react"
import * as PIXI from "pixi.js"
// import {Container, Sprite} from "@inlet/react-pixi/animated"
import {Container, Sprite} from '@inlet/react-pixi'

import { useStateContext, useStateDispatchContext } from "./GameState"

const ROOM_W = 320, ROOM_H = 24, GAP = 1

const prepareRooms = (rows, cols) => {
    console.log('prepareRooms:', rows, cols)
    const rooms = []
    for (let row = 0; row < rows; ++row) {
        for (let col = 0; col < cols; ++col) {
            rooms.push({
                name: 'room_' + rooms.length,
                selected: false,
                x: ROOM_W/2 + col * (ROOM_W + GAP),
                y: ROOM_H/2 + row * (ROOM_H + GAP),
            })
        }
    }
    return rooms
}

const RoomLayer = props => {

    const state = useStateContext()
    const dispatch = useStateDispatchContext()

    const [rooms, setRooms] = useState(() => prepareRooms(3, 4))
    const [selName, setSelName] = useState('')

    return (
        <Container name={'rooms'}
            x={0} y={0} interactive
            click={e => {
                console.log('RoomLayer:', e.target.name, e.currentTarget.name)

                console.log('state:', state.length)
                dispatch({
                    type: 'ADD',
                    payload: 42
                })

                // if (selName === e.target.name) return

                const nextName = selName === e.target.name ? '' : e.target.name
                const nextRooms = rooms.map(room => (
                    room.name === selName ? {...room, selected: false} :
                    room.name === nextName ? {...room, selected: true} :
                    room
                ))
                setRooms(nextRooms)
                setSelName(nextName)
            }}
        >
            {rooms.map(it => (
                <Sprite key={it.name} name={it.name}
                    anchor={0.5} x={it.x} y={it.y}
                    alpha={it.selected? 1:.5} tint={0xff5722}
                    texture={PIXI.Texture.WHITE}
                    width={ROOM_W} height={ROOM_H}
                    interactive buttonMode
                />
            ))}
        </Container>
    )
}

export default RoomLayer
import * as PIXI from "pixi.js"
// import {Container, Sprite} from "@inlet/react-pixi/animated"
import {Container, Sprite} from '@inlet/react-pixi'

const ROOM_W = 32, ROOM_H = 24, GAP = 1
const ROWS = 3, COLS = 4, ROOMS = []
// const ROOMS = [...Array(4 * 3)].map((it, i) => ({}))

for (let row = 0; row < ROWS; ++row) {
    for (let col = 0; col < COLS; ++col) {
        ROOMS.push({
            name: row + '_' + col,
            x: ROOM_W/2 + col * (ROOM_W + GAP),
            y: ROOM_H/2 + row * (ROOM_H + GAP),
        })
    }
}

const RoomLayer = props => {

    return (
        <Container name={'rooms'}
            x={64} y={64} interactive
            click={e => {
                console.log('RoomLayer:', e.target.name, e.currentTarget.name)
            }}
        >
            {ROOMS.map((it, i) => (
                <Sprite key={it.name} name={it.name}
                    anchor={0.5} x={it.x} y={it.y} width={ROOM_W} height={ROOM_H}
                    alpha={.5} tint={0xff5722}
                    texture={PIXI.Texture.WHITE} // PIXI.Texture.WHITE size is 10x10
                    interactive buttonMode
                />
            ))}
        </Container>
    )
}

export default RoomLayer
import * as PIXI from "pixi.js"
// import {Container, Sprite} from "@inlet/react-pixi/animated"
import {Container, Sprite} from '@inlet/react-pixi'

import { useStateContext, useStateDispatchContext } from "./GameState"
import StyledText from "./StyledText";

const RoomLayer = props => {

    const state = useStateContext()
    const dispatch = useStateDispatchContext()

    return (
        <Container name={'rooms'}
            x={0} y={0} interactive
            click={e => {
                console.log('RoomLayer:', e.target.name, e.currentTarget.name)
                dispatch({
                    type: 'SELECT',
                    payload: e.target.name
                })
            }}
        >
            {state.map(it => (
                <Container key={it.name} x={it.x} y={it.y}>
                    <Sprite name={it.name}
                        alpha={it.selected? 1:.5}
                        texture={PIXI.Texture.WHITE}
                        tint={0xff5722}
                        width={it.width} height={it.height}
                        interactive buttonMode
                    />
                    <StyledText text={it.name} x={8} y={8} />
                </Container>
            ))}
        </Container>
    )
}

export default RoomLayer
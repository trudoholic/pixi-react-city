import {useSpring} from "@react-spring/web";
import {Container, Sprite} from "@inlet/react-pixi/animated";
import * as PIXI from "pixi.js";
import {useEffect, useState} from "react";

const onDragStart = e => {
    const sprite = e.currentTarget
    sprite.alpha = 0.5
    sprite.data = e.data
    sprite.dragging = true
}

const onDragEnd = e => {
    const sprite = e.currentTarget
    sprite.alpha = 1
    sprite.dragging = false
    sprite.data = null
}

const onDragMove = e => {
    const sprite = e.currentTarget
    if (sprite.dragging) {
        const newPosition = sprite.data.getLocalPosition(sprite.parent)
        sprite.x = newPosition.x
        sprite.y = newPosition.y

        // return  newPosition
    }
    // return null
}

const DragBox = props => {
    // const [pos, setPos] = useState({x: props.x, y: props.y})

    // const [pos, setPos] = useState({x: 0, y: 0, b: false})
    // useEffect(() => setPos({x: props.x, y: props.y, b: false}), [])
    //
    // const [{xxx, yyy}, api] = useSpring(() => ({xxx: props.x, yyy: props.x}))
    // useEffect(() => api.start({xxx: props.x, yyy: props.y}), [])

    return (
        <Container>
            <Sprite
                texture={PIXI.Texture.WHITE} // PIXI.Texture.WHITE size is 10x10
                tint={0xaddb67}
                anchor={0.5}
                interactive buttonMode

                pointerdown={onDragStart}
                pointerup={onDragEnd}
                pointerupoutside={onDragEnd}
                pointermove={onDragMove}

                // pointermove={e => {
                //     const newPosition = onDragMove(e)
                //     if (newPosition && newPosition.x && newPosition.y) {
                //         api.start({xxx: newPosition.x, yyy: newPosition.y})
                //         setPos({x: xxx, y: yyy, b: true})
                //     }
                // }}

                {...props}
                // {...pos}
                // x={pos.b ? pos.x : props.x}
                // y={pos.b ? pos.y : props.y}
            />
        </Container>
    )
}

export default DragBox
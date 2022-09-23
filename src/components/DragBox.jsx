import {useSpring, config} from "@react-spring/web";
import {Container, Sprite} from "@inlet/react-pixi/animated";
import * as PIXI from "pixi.js";

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
        // sprite.x = newPosition.x
        // sprite.y = newPosition.y

        return  newPosition
    }
    return null
}

const DragBox = props => {
    const [{x, y}, api] = useSpring(() => ({x: props.x, y: props.y, config: config.stiff}))
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
                // pointermove={onDragMove}

                pointermove={e => {
                    const newPos = onDragMove(e)
                    if (newPos) api.start({x: newPos.x, y: newPos.y})
                }}

                {...props}
                {...{x, y}}
            />
        </Container>
    )
}

export default DragBox
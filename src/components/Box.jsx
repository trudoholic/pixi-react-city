import * as PIXI from 'pixi.js'
import { Container, Sprite } from '@inlet/react-pixi/animated'
import { animated, useSpring } from '@react-spring/web'

const Box = props => {
    const [spring, api] = useSpring(() => ({
        from: { rotation: 0 }
    }))

    return (
        <Container>
            <Sprite
                texture={PIXI.Texture.WHITE}
                tint={0xf44336}
                anchor={0.5}
                interactive
                pointerover={() => {
                    api.start({ rotation: 10 * Math.random() - 10 })
                }}
                pointerout={() => {
                    api.start({ rotation: 0 })
                }}
                {...props}
                {...spring}
            />
        </Container>
    )
}

export default Box
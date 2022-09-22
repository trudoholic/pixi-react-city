import './App.css'
import { useState } from "react"
import * as PIXI from 'pixi.js'
import { Stage, Container, Graphics, Sprite, Text, useTick, withFilters } from '@inlet/react-pixi'

import Keyboard from "./components/Keyboard"
import { useWindowSize } from "./hooks/useWindowSize"
import green_tile from "./img/green.png"

const resolution = Math.min(window.devicePixelRatio, 2)

const stageOptions = {
    // backgroundAlpha: 0,
    backgroundColor: 0x336699,
    // resizeTo: window,
    autoDensity: true,
    resolution: resolution || 1,
    antialias: resolution <= 1,
}

const textStyle = new PIXI.TextStyle({
    align: "center",
    fontWeight: "bold",
    fill: "#fff",
    // fill: ["#26f7a3", "#01d27e"],
    // stroke: "#eef1f5",
    // strokeThickness: 1,
    // letterSpacing: 5,
    // wordWrap: false,
    // wordWrapWidth: 350
})

const draw = g => {
    g.beginFill(0x0033cc, 1)
    g.drawRect(250, 150, 150, 120)
    g.endFill()
}

const Filters = withFilters(Container, { matrix: PIXI.filters.ColorMatrixFilter })

let i = 0
const Ninja = () => {
    const [x, setX] = useState(200)
    const [y, setY] = useState(200)

    useTick(delta => {
        i += 0.05 * delta;
        setX(Math.sin(i) * 100 + 200)
        setY(Math.sin(i/1.5) * 100 + 200)
    })

    return (
        <Sprite
            image={green_tile}
            x={x} y={y}
            anchor={0.5}
            scale={1.5}
        />
    )
}

// * * *
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
    }
}
// * * *

function App() {
  // const onUp = e => {
  //   const sprite = e.currentTarget
  //   console.log('#')
  // }

  const [width, height] = useWindowSize()

  return (
      <Stage
          // width={800} height={600}
          width={width} height={height}
          options={stageOptions}
          // onPointerUp={() => console.log('!')}
      >
        <Keyboard />

        <Sprite
            x={10+16} y={50+16}
            texture={PIXI.Texture.WHITE} // PIXI.Texture.WHITE size is 10x10
            tint={0xaddb67}
            width={32} height={32}

            anchor={0.5}
            interactive
            buttonMode
            pointerdown={onDragStart}
            pointerup={onDragEnd}
            pointerupoutside={onDragEnd}
            pointermove={onDragMove}
        />

        <Filters matrix={{ enabled: true }} apply={ ({ matrix }) => matrix.greyscale(0.5, false) }>
          <Sprite
              image={green_tile} x={200} y={200}
              interactive
              buttonMode
              // pointerup={onUp}
              click={e => {
                  const pos = e.data.global
                  console.log('click:', pos.x, pos.y)
              }}
          />
        </Filters>

        <Container x={8} y={8}>
          {/*<Text text="Hello World" filter={[blurFilter]} />*/}
          <Text text="Hello PIXI" style={textStyle} />
        </Container>

        <Graphics draw={draw}/>

        <Ninja />

      </Stage>
  );
}

export default App
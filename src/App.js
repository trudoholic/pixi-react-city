import './App.css'
import { useState } from "react"
import * as PIXI from 'pixi.js'
import { Stage, Container, Graphics, Sprite, Text, useTick, withFilters } from '@inlet/react-pixi'

import Keyboard from "./components/Keyboard"
import green_tile from "./img/green.png"

const stageOptions = {
    antialias: true,
    // backgroundAlpha: 0,
    backgroundColor: 0x336699,
    // resizeTo: window,
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

function App() {
  // const onUp = e => {
  //   const sprite = e.currentTarget
  //   console.log('#')
  // }

  return (
      <Stage
          width={800} height={600}
          options={stageOptions}
          // onPointerUp={() => console.log('!')}
      >
        <Keyboard />
        {/*<Sprite image="./assets/green.png" x={100} y={100} />*/}
        <Ninja />

        <Filters matrix={{ enabled: true }} apply={ ({ matrix }) => matrix.greyscale(0.5, false) }>
          <Sprite
              image={green_tile} x={200} y={200}
              interactive={true}
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

      </Stage>
  );
}

export default App
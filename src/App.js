import './App.css'
import { useEffect, useState } from "react"
import * as PIXI from 'pixi.js'
import { Stage, Container, Graphics, Sprite, Text, useTick, withFilters } from '@inlet/react-pixi'
import FontFaceObserver from "fontfaceobserver";

import Keyboard from "./components/Keyboard"
import DragBox from "./components/DragBox"
import SpringBox from "./components/SpringBox"
import { useWindowSize } from "./hooks/useWindowSize"
import green_tile from "./img/green.png"
import Lenna from "./img/Lenna.png"

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
    fontFamily: "Barlow Condensed",
    fontSize: 50, // [26]
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

  const [winWidth, winHeight] = useWindowSize()

    const [isFontAvailable, setIsFontAvailable] = useState(false)
    useEffect(() => {
        const font = new FontFaceObserver("Barlow Condensed");
        font.load(null, 5000)
            .then(() => setIsFontAvailable(true))
            .catch(() => console.warn('One or more fonts failed to load'))
    }, [setIsFontAvailable])

  return (
      (winWidth && winHeight) &&
      <Stage
          width={winWidth} height={winHeight}
          options={stageOptions}
          onClick={e => {
              console.log('click:', e.clientX, e.clientY)
          }}
      >
        <Keyboard />
        <SpringBox x={winWidth/4} y={winHeight/4} width={32} height={32} />
        <DragBox x={winWidth/2} y={winHeight/2} width={32} height={32} />

        <Filters matrix={{ enabled: true }} apply={ ({ matrix }) => matrix.greyscale(0.5, false) }>
          <Sprite
              image={Lenna} x={200} y={200}
              interactive
              buttonMode
              click={e => {
                  const pos = e.data.global
                  console.log('click:', pos.x, pos.y)
              }}
          />
        </Filters>

        <Container x={8} y={8}>
          {/*<Text text="Hello World" filter={[blurFilter]} />*/}
          {isFontAvailable && <Text text="Hello PIXI" style={textStyle}/>}
        </Container>

        <Graphics draw={draw}/>

        <Ninja />

      </Stage>
  );
}

export default App
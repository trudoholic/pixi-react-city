import './App.css'
import * as PIXI from 'pixi.js'
import {createContext, useContext, useEffect, useState} from "react"
import { Stage, Container, Graphics, Sprite, Text, useTick, withFilters } from '@inlet/react-pixi'
import FontFaceObserver from "fontfaceobserver"

import AppProvider from './AppProvider.js'
import Keyboard from "./components/Keyboard"
import DragBox from "./components/DragBox"
import SpringBox from "./components/SpringBox"
import { useWindowSize } from "./hooks/useWindowSize"
import green_tile from "./img/green.png"
import Lenna from "./img/Lenna.png"
import StyledText from "./components/StyledText";

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

  // const {isFontAvailable} = useContext(AppContext)
  const [winWidth, winHeight] = useWindowSize()

  const [state, setState] = useState(false)

  useEffect(() => {
    const font = new FontFaceObserver("Barlow Condensed");
    font.load(null, 5000)
      .then(() => {setState(true)})
      .catch(() => console.warn('One or more fonts failed to load'))
  }, [])

  return (
      (winWidth && winHeight) && <Stage
              width={winWidth} height={winHeight}
              options={stageOptions}
              onClick={e => {
                  console.log('Stage:', e.clientX, e.clientY)
              }}
          >
          <AppProvider state={state}>
            <Keyboard />
            <SpringBox x={winWidth/4} y={winHeight/4} width={32} height={32} />
            <DragBox x={winWidth/2} y={winHeight/2} width={32} height={32} />

              {/*<Filters matrix={{ enabled: false }} apply={ ({ matrix }) => matrix.greyscale(0.5, false) }>
              <Sprite
                  image={Lenna} x={winWidth-220-8} y={8}
                  interactive
                  buttonMode
                  click={e => {
                      const pos = e.data.global
                      console.log('click:', pos.x, pos.y)
                  }}
              />
            </Filters>*/}

            <Container x={8} y={8}>
              {/*<Text text="Hello World" filter={[blurFilter]} />*/}
              {/*{state.isFontAvailable && <Text text="Hello PIXI" style={textStyle}/>}*/}
              <StyledText text="Hello PIXI" x={64} y={64} />
            </Container>

            {/*{isFontAvailable && <Text text="Ohayou sekai!" style={textStyle} x={64} y={64}/>}*/}
            <StyledText text={"state:" + state} x={64} y={128} />

            <Graphics draw={draw} cacheAsBitmap={true} />

            {/*<Ninja />*/}
          </AppProvider>

      </Stage>
  )
}

export default App
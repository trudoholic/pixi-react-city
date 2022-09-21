import logo from './logo.svg'
import './App.css'

import * as PIXI from 'pixi.js'
import { Stage, Container, Sprite, Text } from '@inlet/react-pixi'

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

function App() {
  return (
      <Stage width={800} height={600} options={{ backgroundColor: 0x336699, antialias: true }}>
        <Sprite image="./assets/green.png" x={100} y={100} />

        <Container x={8} y={8}>
          {/*<Text text="Hello World" filter={[blurFilter]} />*/}
          <Text text="Hello World" style={textStyle} />
        </Container>
      </Stage>
  );
}

export default App

//{ backgroundAlpha: 0 }

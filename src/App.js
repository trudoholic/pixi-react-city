import logo from './logo.svg';
import './App.css';

import { Stage, Container, Sprite, Text } from '@inlet/react-pixi'

function App() {
  return (
      // <Stage width={300} height={300} options={{ backgroundAlpha: 0 }}>
      <Stage width={300} height={300} options={{ backgroundColor: 0x336699, antialias: true }}>
        {/*<Sprite image="./logo192.png" x={100} y={100} />*/}

        <Container x={150} y={150}>
          {/*<Text text="Hello World" filter={[blurFilter]} />*/}
          <Text text="Hello World" />
        </Container>
      </Stage>
  );
}

export default App;

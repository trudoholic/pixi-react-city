import logo from './logo.svg';
import './App.css';

import { Stage, Sprite } from '@inlet/react-pixi'

function App() {
  return (
      <Stage>
        <Sprite image="./logo192.png" x={100} y={100} />
      </Stage>
  );
}

export default App;

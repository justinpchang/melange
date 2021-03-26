import React, {
  FC,
  ReactElement,
} from 'react';

import Palette from './components/Palette';
import Canvas from './components/Canvas';

const App: FC = (): ReactElement => {
  return (
    <div className="App">
      <Palette />
      <Canvas />
    </div>
  );
}

export default App;

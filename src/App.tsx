import React, {
  FC,
  ReactElement,
} from 'react';

import Palette from './components/Palette';
import Canvas from './components/Canvas';
import Target from './components/Target';

const App: FC = (): ReactElement => {
  return (
    <div className="App">
      <Palette />
      <Target />
      <Canvas />
    </div>
  );
}

export default App;

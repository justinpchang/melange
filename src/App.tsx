import React, {
  FC,
  ReactElement,
} from 'react';

import Pallette from './components/Pallette';
import Canvas from './components/Canvas';

const App: FC = (): ReactElement => {
  return (
    <div className="App">
      <Pallette />
      <Canvas />
    </div>
  );
}

export default App;

import React, {
  FC,
  ReactElement,
} from 'react';

import Palette from './components/Palette';
import Canvas from './components/Canvas';
import Target from './components/Target';
import Picker from './components/Picker';

const App: FC = (): ReactElement => {
  return (
    <div className="App">
      <Palette />
      <div style={{display: 'inline-block'}}>
        <Target />
      </div>
      <div style={{display: 'inline-block', marginLeft: '30px'}}>
        <Picker />
      </div>
      <Canvas />
    </div>
  );
}

export default App;

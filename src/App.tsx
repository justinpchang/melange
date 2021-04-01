import React, {
  FC,
  ReactElement,
} from 'react';

import Palette from './components/Palette';
import Canvas from './components/Canvas';
import Target from './components/Target';
import Picker from './components/Picker';
import Controls from './components/Controls';

import {
  MainContainer,
} from './App.styles';

const App: FC = (): ReactElement => {
  return (
    <MainContainer>
      <div style={{display: 'inline-block'}}>
        <Target />
      </div>
      <div style={{display: 'inline-block', marginLeft: '30px'}}>
        <Picker />
      </div>
      <Canvas />
      <Controls />
      <Palette />
    </MainContainer>
  );
}

export default App;

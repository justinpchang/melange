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
  Top,
  Middle,
  Bottom,
} from './App.styles';

const App: FC = (): ReactElement => {
  return (
    <MainContainer>
      <Top>
        <Target />
        <Picker />
      </Top>
      <Middle>
        <Canvas />
      </Middle>
      <Bottom>
        <Palette />
        <Controls />
      </Bottom>
    </MainContainer>
  );
}

export default App;

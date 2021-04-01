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
  Header,
  Top,
  Middle,
  Bottom,
  Footer,
} from './App.styles';

const App: FC = (): ReactElement => {
  return (
    <div>
      <Header>
        mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange mélange 
      </Header>
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
        <Footer>
          made by justin chang
          <br />
          <a href="https://github.com/justinpchang/melange">view source</a>
        </Footer>
      </MainContainer>
    </div>
  );
}

export default App;

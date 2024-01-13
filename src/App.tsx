import React, {
  FC,
  ReactElement,
  useEffect,
} from 'react';

import Palette from './components/Palette';
import Canvas from './components/Canvas';
import Target from './components/Target';
import Picker from './components/Picker';
import Controls from './components/Controls';

import {
  Container,
  Header,
  Content,
  Footer,
  Top,
  Middle,
  Bottom,
} from './App.styles';

const App: FC = (): ReactElement => {
  const showInstructions = () => {
    alert('Page 1 out of 3\n\nTry to match the target color by mixing colors from your palette.');
    alert('Page 2 out of 3\n\nWhen you are finished, click the eyedropper to select the color that you think is the best match.');
    alert('Page 3 out of 3\n\nMultiplayer coming soon. Thanks for playing!');
  };

  useEffect(() => {
    // Only show instructions once using local storage
    if (!localStorage.getItem('instructionsShown')) {
      localStorage.setItem('instructionsShown', 'true');
      showInstructions();
    }
  }, []);

  return (
    <Container>
      <Header>
        mélange mix mélange mix mélange mix mélange mix mélange mix mélange mix mélange mix mélange mix mélange mix mélange mix mélange mix mélange mix mélange mix mélange mix mélange mix mélange mix mélange mix mélange mix 
      </Header>
      <Content>
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
      </Content>
      <Footer>
        made by justin chang
        <br />
        <a onClick={showInstructions}>instructions</a>
        &nbsp;|&nbsp;
        <a href="https://github.com/justinpchang/melange">view source</a>
      </Footer>
    </Container>
  );
}

export default App;

import React, {
  FC,
  ReactElement,
} from 'react';

import Pallette from './components/Pallette';

const App: FC = (): ReactElement => {
  return (
    <div className="App">
      <Pallette />
    </div>
  );
}

export default App;

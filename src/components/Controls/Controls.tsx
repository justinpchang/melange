import React, {
  FC,
  ReactElement,
} from 'react';
import { Icon } from 'semantic-ui-react';

import {
  ControlsContainer,
  TopControl,
  BottomControl,
} from './Controls.styles';

const Controls: FC = (): ReactElement => {
  const handleSubmit = () => {
    alert('submitting');
  };

  const handleReload = () => {
    alert('reloading');
  };

  return (
    <ControlsContainer>
      <TopControl onClick={handleSubmit}>
        <Icon
          fitted
          name='check'
          size='big'
        />
      </TopControl>
      <BottomControl onClick={handleReload}>
        <Icon
          fitted
          name='redo'
          size='big'
        />
      </BottomControl>
    </ControlsContainer>
  )
};

export default Controls;
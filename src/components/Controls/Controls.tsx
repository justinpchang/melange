import React, {
  FC,
  ReactElement,
} from 'react';
import { Icon } from 'semantic-ui-react';

import useCanvasStore from '../../stores/canvas';
import useGameStore from '../../stores/game';
import {
  calcColorDifference,
  generatePalette,
  deriveTargetColorWithDifference,
} from '../../utils/colors';

import {
  ControlsContainer,
  TopControl,
  BottomControl,
} from './Controls.styles';

const Controls: FC = (): ReactElement => {
  const canvas = useCanvasStore(state => state.canvas);
  const setPalette = useCanvasStore(state => state.setPalette);
  const setColor = useCanvasStore(state => state.setColor);
  const targetColor = useGameStore(state => state.targetColor);
  const setTargetColor = useGameStore(state => state.setTargetColor);
  const pickedColor = useGameStore(state => state.pickedColor);
  const setPickedColor = useGameStore(state => state.setPickedColor);

  const reload = () => {
    const palette = generatePalette();
    setPalette(palette);
    setColor(palette[0]);
    setTargetColor(deriveTargetColorWithDifference(palette));
    setPickedColor('');
    canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmit = () => {
    const accuracy = Math.round(100 - calcColorDifference(
      targetColor.substring(1),
      pickedColor.substring(1),
    ));
    alert(`Accuracy: ${accuracy}%.. Could be better`);
    reload();
  };

  const handleReload = () => {
    reload();
  };

  return (
    <ControlsContainer>
      <TopControl onClick={handleSubmit}>
        <Icon
          fitted
          name='check'
          size='big'
          color='green'
        />
      </TopControl>
      <BottomControl onClick={handleReload}>
        <Icon
          fitted
          name='redo'
          size='big'
          color='red'
        />
      </BottomControl>
    </ControlsContainer>
  )
};

export default Controls;
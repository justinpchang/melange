import React, {
  FC,
  ReactElement,
  useEffect,
} from 'react';

import {
  deriveTargetColorWithDifference,
} from '../../utils/colors';
import useGameStore from '../../stores/game';
import useCanvasStore from '../../stores/canvas';

import {
  TargetColor,
  TargetText,
} from './Target.styles';

const Target: FC = (): ReactElement => {
  const targetColor = useGameStore(state => state.targetColor);
  const setTargetColor = useGameStore(state => state.setTargetColor);
  const palette = useCanvasStore(state => state.palette);

  const generateColor = (): void => {
    const newColor = deriveTargetColorWithDifference(palette);
    setTargetColor(newColor);
  };

  useEffect(() => {
    generateColor();
  }, [palette]);

  return (
    <TargetColor color={targetColor}>
      <TargetText>TARGET</TargetText>
    </TargetColor>
  );
};

export default Target;
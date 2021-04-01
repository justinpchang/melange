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
  }, []);

  return (
    <div>
      <h3>Target:</h3>
      <TargetColor color={targetColor} />
      <br />
      <button onClick={generateColor}>Refresh target</button>
    </div>
  );
};

export default Target;
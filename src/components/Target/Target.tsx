import React, {
  FC,
  ReactElement,
  useEffect,
} from 'react';

import {
  getRandomHexColor,
} from '../../utils/colors';
import useGameStore from '../../stores/game';

import {
  TargetColor,
} from './Target.styles';

const Target: FC = (): ReactElement => {
  const targetColor = useGameStore(state => state.targetColor);
  const setTargetColor = useGameStore(state => state.setTargetColor);

  const generateColor = (): void => {
    const newColor = getRandomHexColor();
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
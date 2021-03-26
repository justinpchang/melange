import React, {
  FC,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import {
  getRandomHexColor,
} from '../../utils/colors';
import SETTINGS from '../../constants/settings';
import useCanvasStore from '../../stores/canvas';

import {
  PalletteColor,
} from './Pallette.styles';

const propTypes = {
  initialColors: PropTypes.arrayOf(PropTypes.string),
};

type Props = PropTypes.InferProps<typeof propTypes>;

const Pallette: FC<Props> = ({
  initialColors = Array(SETTINGS.N_COLORS).fill('white'),
}): ReactElement => {
  const [colors, setColors] = useState(initialColors);
  const currentColor = useCanvasStore(state => state.color);
  const setCurrentColor = useCanvasStore(state => state.setColor);

  // Populate array with random colors
  const generateColors = (): void => {
    const newColors = [];
    for (let i = 0; i < SETTINGS.N_COLORS; i += 1) {
      newColors.push(getRandomHexColor());
    }
    setColors(newColors);
  };

  // Display colors as circles
  const renderPallette = () => {
    return colors?.map((color, i) => color && (
      <PalletteColor
        key={i}
        color={color}
        selected={currentColor === color}
        onClick={() => setCurrentColor(color)}
      />
    ));
  };

  useEffect(() => {
    generateColors();
  }, [])

  return (
    <div>
      {renderPallette()}
      <br />
      <button onClick={generateColors}>Refresh</button>
    </div>
  );
};

Pallette.propTypes = propTypes;

export default Pallette;
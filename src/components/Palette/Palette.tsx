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
  PaletteColor,
} from './Palette.styles';

const propTypes = {
  initialColors: PropTypes.arrayOf(PropTypes.string),
};

type Props = PropTypes.InferProps<typeof propTypes>;

const Palette: FC<Props> = ({
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
  const renderPalette = () => {
    return colors?.map((color, i) => color && (
      <PaletteColor
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
      {renderPalette()}
      <br />
      <button onClick={generateColors}>Refresh</button>
    </div>
  );
};

Palette.propTypes = propTypes;

export default Palette;
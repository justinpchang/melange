import React, {
  FC,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import {
  generatePalette,
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
  initialColors = Array(SETTINGS.CANVAS.N_COLORS).fill('white'),
}): ReactElement => {
  const [colors, setColors] = useState(initialColors);
  const currentColor = useCanvasStore(state => state.color);
  const setCurrentColor = useCanvasStore(state => state.setColor);
  const setPalette = useCanvasStore(state => state.setPalette);

  // Populate array with random colors
  const generateColors = (): void => {
    const newColors = generatePalette();
    setColors(newColors);
    setPalette(newColors);
    setCurrentColor(newColors[0]);
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
      <button onClick={generateColors}>Refresh palette</button>
    </div>
  );
};

Palette.propTypes = propTypes;

export default Palette;
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
  PaletteContainer,
  PaletteColorContainer,
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
  const palette = useCanvasStore(state => state.palette);
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
      <PaletteColorContainer key={i}>
        <PaletteColor
          color={color}
          selected={currentColor === color}
          onClick={() => setCurrentColor(color)}
        />
      </PaletteColorContainer>
    ));
  };

  useEffect(() => {
    generateColors();
  }, [])

  useEffect(() => {
    setColors(palette);
  }, [palette]);

  return (
    <PaletteContainer>
      {renderPalette()}
    </PaletteContainer>
  );
};

Palette.propTypes = propTypes;

export default Palette;
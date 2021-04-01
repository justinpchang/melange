import React, {
  FC,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import getCanvasPixelColor from 'get-canvas-pixel-color';

import useCanvasStore from '../../stores/canvas';
import useGameStore from '../../stores/game';
import {
  rgbToHex,
} from '../../utils/colors';
import {
  Event,
  isMouseEvent,
  isTouchEvent,
} from '../../utils/events';

import {
  PickedColorContainer,
  PickedColorBackground,
  PickedColor,
  Icon,
} from './Picker.styles';

const Picker: FC = (): ReactElement => {
  const canvas = useCanvasStore(state => state.canvas);
  const setCanvasDisabled = useCanvasStore(state => state.setDisabled);
  const pickedColor = useGameStore(state => state.pickedColor);
  const setPickedColor = useGameStore(state => state.setPickedColor);
  const [displayColor, setDisplayColor] = useState('');
  const [pickingColor, setPickingColor] = useState(false);

  const setPickingMode = (isPicking: boolean) => {
    if (document.body) {
      document.body.style.cursor = isPicking ? 'copy' : 'auto';
    }
    setPickingColor(isPicking);
    setCanvasDisabled(isPicking);
  };

  const startPickingColor = () => setPickingMode(true);

  const stopPickingColor = (e: Event) => {
    setPickingMode(false);
    e.preventDefault();
  };

  const pickColor = (e: Event) => {
    const rect = canvas?.getBoundingClientRect();
    let x, y;
    if (isMouseEvent(e)) {
      x = e.clientX;
      y = e.clientY;
    }
    if (isTouchEvent(e)) {
      const touch = e.touches[0];
      x = touch.clientX;
      y = touch.clientY;
    }
    if (x) x -= rect?.x || 0;
    if (y) y -= rect?.y || 0;
    const { r, g, b, a } = getCanvasPixelColor(canvas, x, y);
    setDisplayColor(`rgba(${r}, ${g}, ${b}, ${a / 255})`);
    setPickedColor(rgbToHex(r, g, b));
    e.preventDefault();
  };

  useEffect(() => {
    if (pickingColor) {
      document.addEventListener('mousemove', pickColor);
      document.addEventListener('click', stopPickingColor);
      document.addEventListener('touchmove', pickColor);
      document.addEventListener('touchend', stopPickingColor);
    } else {
      document.removeEventListener('mousemove', pickColor);
      document.removeEventListener('click', stopPickingColor);
      document.removeEventListener('touchmove', pickColor);
      document.removeEventListener('touchend', stopPickingColor);
    }
    return () => {
      document.removeEventListener('mousemove', pickColor);
      document.removeEventListener('click', stopPickingColor);
      document.removeEventListener('touchmove', pickColor);
      document.removeEventListener('touchend', stopPickingColor);
    }
  }, [pickingColor]);

  useEffect(() => {
    setDisplayColor(pickedColor);
  }, [pickedColor]);

  return (
    <PickedColorContainer>
      <PickedColorBackground />
      <PickedColor
        color={displayColor}
        onClick={startPickingColor}
      >
        <Icon
          fitted
          name='eyedropper'
          size='big'
          color={pickingColor ? 'yellow' : 'black'}
        />
        &nbsp;
      </PickedColor>
    </PickedColorContainer>
  );
};

export default Picker;
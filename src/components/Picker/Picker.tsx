import React, {
  FC,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import getCanvasPixelColor from 'get-canvas-pixel-color';

import useCanvasStore from '../../stores/canvas';
import useGameStore from '../../stores/game';
import { rgbToHex } from '../../utils/colors';

import {
  PickedColor,
} from './Picker.styles';

const Picker: FC = (): ReactElement => {
  const canvas = useCanvasStore(state => state.canvas);
  const setCanvasDisabled = useCanvasStore(state => state.setDisabled);
  const pickedColor = useGameStore(state => state.pickedColor);
  const setPickedColor = useGameStore(state => state.setPickedColor);
  const [pickingColor, setPickingColor] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const setPickingMode = (isPicking: boolean) => {
    if (document.body) {
      document.body.style.cursor = isPicking ? 'copy' : 'auto';
    }
    setPickingColor(isPicking);
    setButtonDisabled(isPicking);
    setCanvasDisabled(isPicking);
  };

  const startPickingColor = () => setPickingMode(true);

  const stopPickingColor = () => setPickingMode(false);

  const exitPickByKeyPress = (e: KeyboardEvent) => (e.key == "Escape") && setPickingMode(false);

  const pickColor = (e: MouseEvent) => {
    const rect = canvas?.getBoundingClientRect();
    const x = e.x - (rect?.x || 0);
    const y = e.y - (rect?.y || 0);
    const { r, g, b, a } = getCanvasPixelColor(canvas, x, y);
    console.log(r, g, b, a);
    setPickedColor(`rgba(${r}, ${g}, ${b}, ${a / 255})`);
    stopPickingColor();
  };

  // Set up listener for listening
  useEffect(() => {
    if (pickingColor) {
      document.addEventListener('click', pickColor);
    }
    return () => {
      document.removeEventListener('click', pickColor);
    }
  }, [pickingColor]);

  return (
    <div>
      <h3>Picked:</h3>
      <PickedColor color={pickedColor} />
      <br />
      <button onClick={startPickingColor} disabled={buttonDisabled}>Pick color</button>
    </div>
  );
};

export default Picker;
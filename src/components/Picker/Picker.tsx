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
  calcColorDifference,
} from '../../utils/colors';
import {
  Event,
  isMouseEvent,
  isTouchEvent,
} from '../../utils/events';

import {
  PickedColor,
} from './Picker.styles';

const Picker: FC = (): ReactElement => {
  const canvas = useCanvasStore(state => state.canvas);
  const setCanvasDisabled = useCanvasStore(state => state.setDisabled);
  const targetColor = useGameStore(state => state.targetColor);
  const pickedColor = useGameStore(state => state.pickedColor);
  const setPickedColor = useGameStore(state => state.setPickedColor);
  const [displayColor, setDisplayColor] = useState('');
  const [pickingColor, setPickingColor] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [accuracy, setAccuracy] = useState('--');

  const setPickingMode = (isPicking: boolean) => {
    if (document.body) {
      document.body.style.cursor = isPicking ? 'copy' : 'auto';
    }
    setPickingColor(isPicking);
    setButtonDisabled(isPicking);
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
      setAccuracy('--');
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
    if (!pickingColor && pickedColor && targetColor) {
      setAccuracy((100 - calcColorDifference(pickedColor.substring(1), targetColor.substring(1))).toString());
    }
  }, [pickingColor, pickedColor, targetColor]);

  return (
    <div>
      <div style={{display: 'inline-block'}}>
        <h3>Picked:</h3>
        <PickedColor color={displayColor} />
        <br />
        <button onClick={startPickingColor} disabled={buttonDisabled}>Pick color</button>
      </div>
      <div style={{display: 'inline-block', border: '2px solid black', padding: '10px'}}>
        <h3>Result:</h3>
        <h1>{accuracy}%</h1>
      </div>
    </div>
  );
};

export default Picker;
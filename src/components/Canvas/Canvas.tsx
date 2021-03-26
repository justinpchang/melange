import React, {
  FC,
  ReactElement,
} from 'react';
import CanvasDraw from 'react-canvas-draw';

import useCanvasStore from '../../stores/canvas';

const Canvas: FC = (): ReactElement => {
  const color = useCanvasStore(state => state.color);

  return (
    <div>
      <CanvasDraw
        canvasWidth={600}
        canvasHeight={600}
        lazyRadius={0}
        brushRadius={50}
        brushColor={color + '33'}
      />
    </div>
  );
};

export default Canvas;
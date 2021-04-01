import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';
import { Catenary } from 'catenary-curve';
import ResizeObserver from 'resize-observer-polyfill';

import SETTINGS from '../../constants/settings';
import useCanvasStore from '../../stores/canvas';

const canvasStyle = {
  display: 'block',
  position: 'absolute',
};

const canvasTypes = [
  {
    name: 'interface',
    zIndex: 15,
  },
  {
    name: 'drawing',
    zIndex: 11,
  },
  {
    name: 'temp',
    zIndex: 12,
  },
];

const dimensionsPropTypes = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

class Canvas extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    style: stylePropType,
    onChange: PropTypes.func,
    brushRadius: PropTypes.number,
    brushColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    canvasWidth: dimensionsPropTypes,
    canvasHeight: dimensionsPropTypes,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    style: null,
    onChange: null,
    brushRadius: 10,
    brushColor: '#444',
    backgroundColor: '#FFF',
    canvasWidth: 400,
    canvasHeight: 400,
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.canvas = {};
    this.ctx = {};

    this.catenary = new Catenary();

    this.points = [];
    this.lines = [];

    this.mouseHasMoved = true;
    this.valuesChanged = true;
    this.isDrawing = false;
    this.isPressing = false;
  }

  componentDidMount() {
    this.canvasObserver = new ResizeObserver((entries, observer) =>
      this.handleCanvasResize(entries, observer),
    );
    this.canvasObserver.observe(this.canvasContainer);

    this.loop();

    window.setTimeout(() => {
      const initX = window.innerWidth / 2;
      const initY = window.innerHeight / 2;
      this.lazy.update(
        { x: initX - this.chainLength / 4, y: initY },
        { both: true },
      );
      this.lazy.update(
        { x: initX + this.chainLength / 4, y: initY },
        { both: false },
      );
      this.mouseHasMoved = true;
      this.valuesChanged = true;
      this.clear();
    }, 100);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lazyRadius !== this.props.lazyRadius) {
      // Set new lazyRadius values
      this.chainLength = this.props.lazyRadius * window.devicePixelRatio;
      this.lazy.setRadius(this.props.lazyRadius * window.devicePixelRatio);
    }

    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      // Signal this.loop function that values changed
      this.valuesChanged = true;
    }
  }

  componentWillUnmount = () => {
    this.canvasObserver.unobserve(this.canvasContainer);
  };

  undo = () => {
    const lines = this.lines.slice(0, -1);
    this.clear();
    this.simulateDrawingLines({ lines, immediate: true });
    this.triggerOnChange();
  };

  handleDrawStart = e => {
    e.preventDefault();

    // Start drawing
    this.isPressing = true;

    const { x, y } = this.getPointerPos(e);

    if (e.touches && e.touches.length > 0) {
      // on touch, set catenary position to touch pos
      this.lazy.update({ x, y }, { both: true });
    }

    // Ensure the initial down position gets added to our line
    this.handlePointerMove(x, y);
  };

  handleDrawMove = e => {
    e.preventDefault();

    const { x, y } = this.getPointerPos(e);
    this.handlePointerMove(x, y);
  };

  handleDrawEnd = e => {
    e.preventDefault();

    // Draw to this end pos
    this.handleDrawMove(e);

    // Stop drawing & save the drawn line
    this.isDrawing = false;
    this.isPressing = false;
    this.saveLine();
  };

  handleCanvasResize = (entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      this.setCanvasSize(this.canvas.interface, width, height);
      this.setCanvasSize(this.canvas.drawing, width, height);
      this.setCanvasSize(this.canvas.temp, width, height);

      this.loop({ once: true });
    }
  };

  setCanvasSize = (canvas, width, height) => {
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width;
    canvas.style.height = height;
  };

  getPointerPos = e => {
    const rect = this.canvas.interface.getBoundingClientRect();

    // use cursor pos as default
    let clientX = e.clientX;
    let clientY = e.clientY;

    // use first touch if available
    if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    }

    // return mouse/touch position inside canvas
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  handlePointerMove = (x, y) => {
    if (this.props.disabled) return;

    if (this.isPressing && !this.isDrawing) {
      // Start drawing and add point
      this.isDrawing = true;
      this.points.push({ x, y });
    }

    if (this.isDrawing) {
      // Add new point
      this.points.push({ x, y });

      // Draw current points
      this.drawPoints({
        points: this.points,
        brushColor: this.props.brushColor,
        brushRadius: this.props.brushRadius,
      });
    }

    this.mouseHasMoved = true;
  };

  drawPoints = ({ points, brushColor, brushRadius }) => {
    this.ctx.temp.fillStyle = brushColor;
    this.ctx.temp.globalAlpha = SETTINGS.CANVAS.OPACITY;
    this.ctx.temp.globalCompositeOperation = SETTINGS.CANVAS.BLEND_MODE;

    this.ctx.temp.clearRect(
      0,
      0,
      this.ctx.temp.canvas.width,
      this.ctx.temp.canvas.height,
    );
    this.ctx.temp.lineWidth = brushRadius * 2;

    let p1 = points[0];
    let p2 = points[1];

    for (var i = 1, len = points.length; i < len; i++) {
      const dev = Math.random() * SETTINGS.CANVAS.BRUSH_RADIUS_DEVIATION;
      const r = brushRadius + (dev * 2 - dev);
      this.ctx.temp.beginPath();
      this.ctx.temp.fillRect(p1.x - r, p1.y - r, r * 2, r * 2);
      this.ctx.temp.fill();
      p1 = points[i];
      p2 = points[i + 1];
    }
  };

  saveLine = ({ brushColor, brushRadius } = {}) => {
    if (this.points.length < 2) return;

    // Save as new line
    this.lines.push({
      points: [...this.points],
      brushColor: brushColor || this.props.brushColor,
      brushRadius: brushRadius || this.props.brushRadius,
    });

    // Reset points array
    this.points.length = 0;

    const width = this.canvas.temp.width;
    const height = this.canvas.temp.height;

    // Copy the line to the drawing canvas
    this.ctx.drawing.drawImage(this.canvas.temp, 0, 0, width, height);

    // Clear the temporary line-drawing canvas
    this.ctx.temp.clearRect(0, 0, width, height);

    this.triggerOnChange();
  };

  triggerOnChange = () => {
    this.props.onChange && this.props.onChange(this);
  };

  clear = () => {
    this.lines = [];
    this.valuesChanged = true;
    this.ctx.drawing.clearRect(
      0,
      0,
      this.canvas.drawing.width,
      this.canvas.drawing.height,
    );
    this.ctx.temp.clearRect(
      0,
      0,
      this.canvas.temp.width,
      this.canvas.temp.height,
    );
  };

  loop = ({ once = false } = {}) => {
    if (this.mouseHasMoved || this.valuesChanged) {
      this.mouseHasMoved = false;
      this.valuesChanged = false;
    }

    if (!once) {
      window.requestAnimationFrame(() => {
        this.loop();
      });
    }
  };

  render() {
    return (
      <div
        className={this.props.className}
        style={{
          display: 'block',
          background: this.props.backgroundColor,
          touchAction: 'none',
          width: this.props.canvasWidth,
          height: this.props.canvasHeight,
          ...this.props.style,
        }}
        ref={container => {
          if (container) {
            this.canvasContainer = container;
          }
        }}
      >
        {canvasTypes.map(({ name, zIndex }) => {
          const isInterface = name === 'interface';
          const isDrawing = name === 'drawing';
          return (
            <canvas
              key={name}
              ref={canvas => {
                if (canvas) {
                  this.canvas[name] = canvas;
                  this.ctx[name] = canvas.getContext('2d');
                  if (isDrawing) this.props.setCanvas(canvas);
                }
              }}
              style={{ ...canvasStyle, zIndex }}
              onMouseDown={isInterface ? this.handleDrawStart : undefined}
              onMouseMove={isInterface ? this.handleDrawMove : undefined}
              onMouseUp={isInterface ? this.handleDrawEnd : undefined}
              onMouseOut={isInterface ? this.handleDrawEnd : undefined}
              onTouchStart={isInterface ? this.handleDrawStart : undefined}
              onTouchMove={isInterface ? this.handleDrawMove : undefined}
              onTouchEnd={isInterface ? this.handleDrawEnd : undefined}
              onTouchCancel={isInterface ? this.handleDrawEnd : undefined}
            />
          );
        })}
      </div>
    );
  }
}

const withStore = (props) => {
  const color = useCanvasStore(state => state.color);
  const setCanvas = useCanvasStore(state => state.setCanvas);
  const disabled = useCanvasStore(state => state.disabled);
  return <Canvas
    {...props}
    brushColor={color}
    brushRadius={SETTINGS.CANVAS.BRUSH_RADIUS}
    backgroundColor={SETTINGS.CANVAS.BACKGROUND_COLOR}
    setCanvas={setCanvas}
    disabled={disabled}
    canvasWidth="300px"
    canvasHeight="300px"
  />
};

export default withStore;
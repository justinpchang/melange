import create from 'zustand';

type CanvasState = {
  color: string,
  setColor: (newColor: string) => void,
  opacity: number,
  canvas: HTMLCanvasElement | null,
  setCanvas: (newCanvas: HTMLCanvasElement) => void,
  disabled: boolean,
  setDisabled: (newDisabled: boolean) => void,
  palette: Array<string>,
  setPalette: (newPalette: Array<string>) => void,
};

const useCanvasStore = create<CanvasState>(set => ({
  color: '',
  setColor: (newColor) => set(() => ({ color: newColor })),
  opacity: 0.5,
  canvas: null,
  setCanvas: (newCanvas) => set(() => ({ canvas: newCanvas })),
  disabled: false,
  setDisabled: (newDisabled) => set(() => ({ disabled: newDisabled })),
  palette: ['white', 'white', 'white', 'white', 'white', 'white'],
  setPalette: (newPalette) => set(() => ({ palette: newPalette })),
}));

export default useCanvasStore;
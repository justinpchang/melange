import create from 'zustand';

type CanvasState = {
  color: string,
  setColor: (newColor: string) => void,
  opacity: number,
};

const useCanvasStore = create<CanvasState>(set => ({
  color: '',
  setColor: (newColor) => set(() => ({ color: newColor })),
  opacity: 0.5,
}));

export default useCanvasStore;
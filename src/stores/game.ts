import create from 'zustand';

type GameState = {
  targetColor: string,
  setTargetColor: (newColor: string) => void,
  pickedColor: string,
  setPickedColor: (newColor: string) => void,
};

const useGameStore = create<GameState>(set => ({
  targetColor: '',
  setTargetColor: (newColor) => set(() => ({ targetColor: newColor })),
  pickedColor: '',
  setPickedColor: (newColor) => set(() => ({ pickedColor: newColor })),
}));

export default useGameStore;
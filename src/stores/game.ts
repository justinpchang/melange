import create from 'zustand';

type GameState = {
  targetColor: string,
  setTargetColor: (newColor: string) => void,
};

const useGameStore = create<GameState>(set => ({
  targetColor: '',
  setTargetColor: (newColor) => set(() => ({ targetColor: newColor })),
}));

export default useGameStore;
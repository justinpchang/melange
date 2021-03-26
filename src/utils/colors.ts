export const getRandomHexColor = (): string => {
  const LETTERS = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += LETTERS[Math.floor(Math.random() * 16)];
  }
  return color;
};
const numberToHex = (rgb: number): string => {
  let hex = rgb.toString(16);
  if (hex.length < 2) {
    hex = `0${hex}`;
  }
  return hex;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  const red = numberToHex(r);
  const green = numberToHex(g);
  const blue = numberToHex(b);
  return `#${red}${green}${blue}`;
};

export const getRandomHexColor = (): string => {
  const LETTERS = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += LETTERS[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const calcColorDifference = (color0: string, color1: string): number => {
  if (!color0 || !color1) {
    throw 'No colors provided';
  }
  const rgb0 = {
    r: parseInt(color0.substring(0, 2), 16) / 255 * 100,
    g: parseInt(color0.substring(2, 4), 16) / 255 * 100,
    b: parseInt(color0.substring(4, 6), 16) / 255 * 100,
  };
  const rgb1 = {
    r: parseInt(color1.substring(0, 2), 16) / 255 * 100,
    g: parseInt(color1.substring(2, 4), 16) / 255 * 100,
    b: parseInt(color1.substring(4, 6), 16) / 255 * 100,
  };
  const val0 = Math.round((rgb0.r + rgb0.g + rgb0.b) / 3);
  const val1 = Math.round((rgb1.r + rgb1.g + rgb1.b) / 3);
  return Math.abs(val0 - val1);   
}
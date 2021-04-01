type RGB = {
  r: number,
  g: number,
  b: number,
};

type Hex = string;

const LETTERS = '0123456789ABCDEF';
const DEVIATION = 30;
const P_ADD_COLOR = 0.7;

const numberToHex = (rgb: number): Hex => {
  let hex = rgb.toString(16);
  if (hex.length < 2) {
    hex = `0${hex}`;
  }
  return hex;
};

const hexToRgb = (hex: Hex): RGB => ({
  r: parseInt(hex.substring(1, 3), 16),
  g: parseInt(hex.substring(3, 5), 16),
  b: parseInt(hex.substring(5, 7), 16),
});

const rgbToLab = (rgb: Array<number>) => {
  let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
};

const rgbDeltaE = (rgbA: Array<number>, rgbB: Array<number>) => {
  const labA = rgbToLab(rgbA);
  const labB = rgbToLab(rgbB);
  const deltaL = labA[0] - labB[0];
  const deltaA = labA[1] - labB[1];
  const deltaB = labA[2] - labB[2];
  const c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  const c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  const deltaC = c1 - c2;
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  const sc = 1.0 + 0.045 * c1;
  const sh = 1.0 + 0.015 * c1;
  const deltaLKlsl = deltaL / (1.0);
  const deltaCkcsc = deltaC / (sc);
  const deltaHkhsh = deltaH / (sh);
  const i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
};

const colorChannelMixer = (channelA: number, channelB: number, mixAmount: number) => {
  return Math.round(channelA * mixAmount + channelB * (1 - mixAmount));
};

const mixColors = (rgbA: Array<number>, rgbB: Array<number>, mixAmount: number): RGB => ({
  r: colorChannelMixer(rgbA[0], rgbB[0], mixAmount),
  g: colorChannelMixer(rgbA[1], rgbB[1], mixAmount),
  b: colorChannelMixer(rgbA[2], rgbB[2], mixAmount),
});

const deviateRgb = (rgb: RGB): RGB => {
  const clamp = (num: number, min: number, max: number): number => {
    return num <= min ? min : num >= max ? max : num;
  };

  const deviateChannel = (value: number): number => {
    const plusOrMinus = (Math.random() < 0.5) ? -1 : 1;
    return clamp(value + plusOrMinus * Math.round(Math.random() * DEVIATION), 0, 255);
  };

  return {
    r: deviateChannel(rgb.r),
    g: deviateChannel(rgb.g),
    b: deviateChannel(rgb.b),
  };
};

export const rgbToHex = (r: number, g: number, b: number): Hex => {
  const red = numberToHex(r);
  const green = numberToHex(g);
  const blue = numberToHex(b);
  return `#${red}${green}${blue}`;
};

export const getRandomHexColor = (): Hex => {
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += LETTERS[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const deriveTargetColor = (colors: Array<Hex>): Hex => {
  // Start with random base color (on the lighter side for better mixing)
  let rgb: RGB = {
    r: Math.random() * 128 + 128,
    g: Math.random() * 128 + 128,
    b: Math.random() * 128 + 128,
  };
  for (const color of colors) {
    // Decide if color will be added to the mix
    if (Math.random() < P_ADD_COLOR) {
      // Mix deviated color
      rgb = mixColors(Object.values(rgb), Object.values(deviateRgb(hexToRgb(color))), 0.5);
    }
  }
  return rgbToHex(rgb.r, rgb.g, rgb.b);
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
  return Math.round(rgbDeltaE(Object.values(rgb0), Object.values(rgb1)));
  /*
  const val0 = Math.round((rgb0.r + rgb0.g + rgb0.b) / 3);
  const val1 = Math.round((rgb1.r + rgb1.g + rgb1.b) / 3);
  return Math.abs(val0 - val1);   
  */
}
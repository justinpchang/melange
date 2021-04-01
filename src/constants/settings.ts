const SETTINGS = {
  N_COLORS: 6,
  BRUSH_RADIUS: 30,
  BACKGROUND_COLOR: 'white',
  OPACITY: 0.2,
  BLEND_MODE: 'hard-light',
  GENERATION: {
    DEVIATION: 30, // Randomness to add to palette to derive target
    P_ADD_COLOR: 0.7, // Probability of using each color to derive target
    MIX_SCALAR: 0.2, // Amount of palette influence to derive target
    DIFFERENCE_THRESHOLD: .2, // Minimum difference of every color
    MAX_ITER: 20, // Iterations before giving up generating different color
  },
};

export default SETTINGS;
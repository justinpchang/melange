const SETTINGS = {
  CANVAS: {
    N_COLORS: 6, // Number of colors in palette
    BRUSH_RADIUS: 30, // Base size of rectangle drawn
    BRUSH_RADIUS_DEVIATION: 10, // Shimmer effect of brush
    BACKGROUND_COLOR: 'white', // Background of drawing canvas
    OPACITY: 0.2, // Opacity of brush
    BLEND_MODE: 'hard-light', // Blend mode for color mixing
  },
  GENERATION: {
    DEVIATION: 30, // Randomness to add to palette to derive target
    P_ADD_COLOR: 0.7, // Probability of using each color to derive target
    MIX_SCALAR: 0.2, // Amount of palette influence to derive target
    DIFFERENCE_THRESHOLD: .2, // Minimum difference of every color
    MAX_ITER: 20, // Iterations before giving up generating different color
  },
};

export default SETTINGS;
/**
 * HSLA Color interface representing a color in HSLA color space
 * @interface HSLAColor
 * @property {number} hue - Hue value (0-360 degrees)
 * @property {number} saturation - Saturation percentage (0-100)
 * @property {number} lightness - Lightness percentage (0-100)
 * @property {number} alpha - Alpha/opacity value (0-1)
 */
export interface HSLAColor {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
}

/**
 * Hash function to generate consistent number from string
 * Uses a simple hash algorithm to convert string to deterministic number
 * @private
 * @param {string} str - Input string to hash
 * @returns {number} Positive integer hash value
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Create HSLA color from individual values
 * @param {number} hue - Hue value (0-360 degrees)
 * @param {number} saturation - Saturation percentage (0-100)
 * @param {number} lightness - Lightness percentage (0-100)
 * @param {number} [alpha=1] - Alpha/opacity value (0-1)
 * @returns {HSLAColor} HSLA color object
 * @example
 * ```typescript
 * const red = createHSLA(0, 100, 50, 1);
 * const semiTransparentBlue = createHSLA(240, 100, 50, 0.5);
 * ```
 */
export function createHSLA(
  hue: number,
  saturation: number,
  lightness: number,
  alpha: number = 1
): HSLAColor {
  return { hue, saturation, lightness, alpha };
}

/**
 * Parse HSLA color from CSS string format
 * @param {string} hslaString - CSS HSLA string (e.g., "hsla(240, 100%, 50%, 1)" or "hsl(240, 100%, 50%)")
 * @returns {HSLAColor} Parsed HSLA color object
 * @throws {Error} When string format is invalid
 * @example
 * ```typescript
 * const color1 = parseHSLA("hsla(240, 100%, 50%, 1)");
 * const color2 = parseHSLA("hsl(120, 80%, 60%)");
 * ```
 */
export function parseHSLA(hslaString: string): HSLAColor {
  const regex = /hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*([\d.]+))?\)/;
  const match = hslaString.match(regex);
  if (!match) throw new Error('Invalid HSLA string format');

  const [, h, s, l, a = '1'] = match;
  return createHSLA(Number(h), Number(s), Number(l), Number(a));
}

/**
 * Generate deterministic color from string input
 * Perfect for creating consistent colors for avatars, tags, or any string-based identification
 * @param {string} input - Input string to generate color from (e.g., username, email, ID)
 * @param {Object} [options] - Color generation options
 * @param {number} [options.saturation=70] - Saturation percentage (0-100)
 * @param {number} [options.lightness=50] - Lightness percentage (0-100)
 * @param {number} [options.alpha=1] - Alpha/opacity value (0-1)
 * @returns {HSLAColor} Generated HSLA color object
 * @example
 * ```typescript
 * // Generate avatar color for user
 * const userColor = colorFromString("john.doe@example.com");
 *
 * // Generate with custom saturation and lightness
 * const tagColor = colorFromString("important-tag", {
 *   saturation: 80,
 *   lightness: 40
 * });
 *
 * // Same input always produces same color
 * const color1 = colorFromString("test");
 * const color2 = colorFromString("test");
 * // color1 === color2 (same hue, saturation, lightness, alpha)
 * ```
 */
export function colorFromString(
  input: string,
  options: {
    saturation?: number;
    lightness?: number;
    alpha?: number;
  } = {}
): HSLAColor {
  const {
    saturation = 70, // Good saturation for vibrant colors
    lightness = 50, // Medium lightness for good contrast
    alpha = 1,
  } = options;

  const hash = hashString(input);
  const hue = hash % 360; // Map to 0-359 degrees

  return createHSLA(hue, saturation, lightness, alpha);
}

/**
 * Convert HSLA color to CSS HSLA string format
 * @param {HSLAColor} color - HSLA color object
 * @returns {string} CSS HSLA string (e.g., "hsla(240, 100%, 50%, 1)")
 * @example
 * ```typescript
 * const color = createHSLA(240, 100, 50, 0.8);
 * const cssString = toHSLAString(color);
 * // Result: "hsla(240, 100%, 50%, 0.8)"
 *
 * // Use in CSS or inline styles
 * element.style.backgroundColor = cssString;
 * ```
 */
export function toHSLAString(color: HSLAColor): string {
  return `hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, ${color.alpha})`;
}

/**
 * Convert HSLA color to CSS HSL string format (without alpha)
 * @param {HSLAColor} color - HSLA color object
 * @returns {string} CSS HSL string (e.g., "hsl(240, 100%, 50%)")
 * @example
 * ```typescript
 * const color = createHSLA(240, 100, 50, 0.8);
 * const cssString = toHSLString(color);
 * // Result: "hsl(240, 100%, 50%)" - alpha is ignored
 * ```
 */
export function toHSLString(color: HSLAColor): string {
  return `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`;
}

/**
 * Create a new color with modified hue value
 * @param {HSLAColor} color - Original color object
 * @param {number} hue - New hue value (0-360 degrees)
 * @returns {HSLAColor} New color object with updated hue
 * @example
 * ```typescript
 * const blue = createHSLA(240, 100, 50, 1);
 * const red = withHue(blue, 0);
 * // Changes blue to red while keeping same saturation, lightness, alpha
 * ```
 */
export function withHue(color: HSLAColor, hue: number): HSLAColor {
  return { ...color, hue };
}

/**
 * Create a new color with modified saturation value
 * @param {HSLAColor} color - Original color object
 * @param {number} saturation - New saturation percentage (0-100)
 * @returns {HSLAColor} New color object with updated saturation
 * @example
 * ```typescript
 * const vibrant = createHSLA(240, 100, 50, 1);
 * const muted = withSaturation(vibrant, 30);
 * // Creates a more muted version of the same color
 * ```
 */
export function withSaturation(
  color: HSLAColor,
  saturation: number
): HSLAColor {
  return { ...color, saturation };
}

/**
 * Create a new color with modified lightness value
 * @param {HSLAColor} color - Original color object
 * @param {number} lightness - New lightness percentage (0-100)
 * @returns {HSLAColor} New color object with updated lightness
 * @example
 * ```typescript
 * const normal = createHSLA(240, 100, 50, 1);
 * const darker = withLightness(normal, 25);
 * const lighter = withLightness(normal, 75);
 * ```
 */
export function withLightness(color: HSLAColor, lightness: number): HSLAColor {
  return { ...color, lightness };
}

/**
 * Create a new color with modified alpha/opacity value
 * @param {HSLAColor} color - Original color object
 * @param {number} alpha - New alpha value (0-1, where 0 is transparent and 1 is opaque)
 * @returns {HSLAColor} New color object with updated alpha
 * @example
 * ```typescript
 * const solid = createHSLA(240, 100, 50, 1);
 * const transparent = withAlpha(solid, 0.5);
 * const almostInvisible = withAlpha(solid, 0.1);
 * ```
 */
export function withAlpha(color: HSLAColor, alpha: number): HSLAColor {
  return { ...color, alpha };
}

/**
 * Generate multiple color variations from a base string
 * Creates a color palette by distributing hues evenly around the color wheel
 * @param {string} input - Base string to generate colors from
 * @param {number} [count=5] - Number of colors to generate
 * @param {Object} [options] - Color generation options
 * @param {number} [options.saturation=70] - Saturation percentage for all colors
 * @param {number} [options.lightness=50] - Lightness percentage for all colors
 * @param {number} [options.alpha=1] - Alpha value for all colors
 * @returns {HSLAColor[]} Array of color objects
 * @example
 * ```typescript
 * // Generate 5 colors for a theme
 * const palette = generateColorPalette("my-theme", 5);
 *
 * // Generate 3 muted colors
 * const mutedPalette = generateColorPalette("project-name", 3, {
 *   saturation: 40,
 *   lightness: 60
 * });
 * ```
 */
export function generateColorPalette(
  input: string,
  count: number = 5,
  options: {
    saturation?: number;
    lightness?: number;
    alpha?: number;
  } = {}
): HSLAColor[] {
  const baseColor = colorFromString(input, options);
  const colors: HSLAColor[] = [baseColor];

  const hueStep = 360 / count;

  for (let i = 1; i < count; i++) {
    const newHue = (baseColor.hue + hueStep * i) % 360;
    colors.push(withHue(baseColor, newHue));
  }

  return colors;
}

/**
 * Generate complementary color (opposite on color wheel)
 * @param {HSLAColor} color - Original color object
 * @returns {HSLAColor} Complementary color object
 * @example
 * ```typescript
 * const blue = createHSLA(240, 100, 50, 1);
 * const orange = getComplementaryColor(blue);
 * // Orange is complementary to blue (240° + 180° = 420° % 360° = 60°)
 * ```
 */
export function getComplementaryColor(color: HSLAColor): HSLAColor {
  const complementaryHue = (color.hue + 180) % 360;
  return withHue(color, complementaryHue);
}

/**
 * Generate avatar background color optimized for readability and aesthetics
 * This is the recommended function for creating user avatar backgrounds
 * @param {string} input - User identifier (username, email, ID, etc.)
 * @param {'light' | 'dark'} [theme='light'] - UI theme for optimal contrast
 * @returns {HSLAColor} Optimized avatar color
 * @example
 * ```typescript
 * // For light theme UI
 * const lightAvatar = avatarColorFromString("john.doe@example.com");
 * const lightBg = toHSLAString(lightAvatar);
 *
 * // For dark theme UI
 * const darkAvatar = avatarColorFromString("john.doe@example.com", "dark");
 * const darkBg = toHSLAString(darkAvatar);
 *
 * // Use in React component
 * const AvatarComponent = ({ username, theme }) => (
 *   <div style={{
 *     backgroundColor: toHSLAString(avatarColorFromString(username, theme)),
 *     color: theme === 'light' ? 'white' : 'black',
 *     width: 40,
 *     height: 40,
 *     borderRadius: '50%',
 *     display: 'flex',
 *     alignItems: 'center',
 *     justifyContent: 'center'
 *   }}>
 *     {username.charAt(0).toUpperCase()}
 *   </div>
 * );
 * ```
 */
export function avatarColorFromString(
  input: string,
  theme: 'light' | 'dark' = 'light'
): HSLAColor {
  const saturation = 65; // Good saturation for avatars
  const lightness = theme === 'light' ? 45 : 65; // Darker for light theme, lighter for dark theme

  return colorFromString(input, { saturation, lightness, alpha: 1 });
}

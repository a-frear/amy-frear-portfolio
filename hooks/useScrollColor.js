import { useState, useEffect } from 'react';

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Helper function to convert RGB to hex
function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

// Interpolate between two colors based on progress (0-1)
function interpolateColor(color1, color2, progress) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return color1;

  const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * progress);
  const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * progress);
  const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * progress);

  return rgbToHex(r, g, b);
}

export function useScrollColor(colors) {
  const [currentColor, setCurrentColor] = useState(colors[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercent = scrollHeight > 0 ? scrolled / scrollHeight : 0;

      // Determine which colors to interpolate between
      const colorIndex = scrollPercent * (colors.length - 1);
      const lowerIndex = Math.floor(colorIndex);
      const upperIndex = Math.ceil(colorIndex);
      const progress = colorIndex - lowerIndex;

      // Get the interpolated color
      const color1 = colors[Math.min(lowerIndex, colors.length - 1)];
      const color2 = colors[Math.min(upperIndex, colors.length - 1)];
      const newColor = interpolateColor(color1, color2, progress);

      setCurrentColor(newColor);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [colors]);

  return currentColor;
}

/**
 * Category tile colors. The backend doesn't send colors, so the UI assigns them
 * by the category's position in the list (matches the Figma order).
 */
const palette = [
  { tile: "#e9f5e9", chart: "#8cc795" }, // green
  { tile: "#fde9e9", chart: "#ef9a9a" }, // pink
  { tile: "#fce8e4", chart: "#e0826f" }, // salmon
  { tile: "#e1ecfb", chart: "#8fb3e8" }, // blue
  { tile: "#fdf7d9", chart: "#e8cf6a" }, // yellow
  { tile: "#f6eee2", chart: "#d8b98d" }, // beige
  { tile: "#efe8e1", chart: "#b79f8a" }, // tan
  { tile: "#e3effb", chart: "#7fb6d9" }, // sky
  { tile: "#e8eefc", chart: "#a7b6ee" }, // periwinkle
];

export const categoryColor = (index: number) => palette[index % palette.length];

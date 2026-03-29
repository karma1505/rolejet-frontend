export const COLORS = {
  background: "#0A0A0F",
  surface: "#111118",
  border: "#1E1E2E",
  primary: "#5B6EF5",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  text: {
    primary: "#F0F0F5",
    secondary: "#8888A0",
    tertiary: "#44445A",
  },
} as const;

export const TYPOGRAPHY = {
  fonts: {
    display: "var(--font-space-mono), var(--font-geist-mono), monospace",
    sans: "var(--font-inter), sans-serif",
    data: "var(--font-jetbrains-mono), monospace",
  },
} as const;

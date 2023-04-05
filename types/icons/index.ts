type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export type IconProps = {
  variant: "board" | "light" | "dark" | "hide" | "open" | "options";
  fill?: Color;
  height?: number;
  width?: number;
};

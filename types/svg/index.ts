type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export type iconProps = {
  variant: "board" | "light" | "dark" | "hide" | "open" | "options" | "close" | "delete";
  fill?: Color;
  height?: number;
  width?: number;
};

export type logoProps = {
  fill?: Color;
  height?: number;
  width?: number;
};

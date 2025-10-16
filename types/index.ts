export type scrollDirection = "UP" | "DOWN" | null;

export type onScrollProps = {
  onScrollUp?: () => void;
  onScrollDown?: () => void;
};

// Device/frame shared types
export type ModelType = "iphone" | "galaxy";

export type DeviceFrame = {
  name: string;
  width: number;
  height: number;
};
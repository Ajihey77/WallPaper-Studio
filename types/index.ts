export type scrollDirection = "UP" | "DOWN" | null;

export type onScrollProps = {
  onScrollUp?: () => void;
  onScrollDown?: () => void;
};

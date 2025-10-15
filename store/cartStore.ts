import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  cartImg: string[];
  addImg: (imgUrl: string) => void;
  removeImg: (index: number) => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      cartImg: [],

      addImg: (imgUrl) =>
        set((state) => {
          const newCart = [...state.cartImg, imgUrl];
          console.log(newCart); // 최신 상태 출력
          return { cartImg: newCart };
        }),

      removeImg: (index) =>
        set((state) => ({
          cartImg: state.cartImg.filter((_, i) => i !== index),
        })),
    }),
    { name: "cart-images" }
  )
);

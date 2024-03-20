import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ProductProps } from "@/utils/data/products";
import * as cartInMemory from "./helpers/cart-in-memory";

export type ProductCardProps = ProductProps & {
  quantity: number;
};

type StateProps = {
  products: ProductCardProps[];
  add: (product: ProductProps) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

/*Sem AsyncStorage - sem persistir dados 
export const useCartStore = create<StateProps>((set) => ({
  products: [],
  add: (product: ProductProps) =>
    set((state) => ({
      products: cartInMemory.add(state.products, product),
    })),
  remove: (productId: string) =>
    set((state) => ({
      products: cartInMemory.remove(state.products, productId),
    })),
}));
*/

/**Com AsyncStorage e persistindo os dados */
export const useCartStore = create(
  persist<StateProps>(
    (set) => ({
      products: [],
      add: (product: ProductProps) =>
        set((state) => ({
          products: cartInMemory.add(state.products, product),
        })),
      remove: (productId: string) =>
        set((state) => ({
          products: cartInMemory.remove(state.products, productId),
        })),
      clear: () => set(() => ({ products: [] })),
    }),
    {
      name: "nlw-expert-rn-pedido:card",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

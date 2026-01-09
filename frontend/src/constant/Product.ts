export const ProductStatus = {
  New: "new",
  SecondHand: "second_hand",
} as const;

export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];

export interface BurgerInterface {
  name: string;
  ingredients: string[];
  price: number;
  combos?: {
    content: string[] | null | undefined;
    price: number | null | undefined;
  };
}

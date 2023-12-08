export interface BurgerInterface {
  name: string;
  ingredients: string[];
  price: number;
  combos?: {
    content: string[] | null | undefined;
    price: number | null | undefined;
  };
}

export interface UserInterface {
  username: string;
  passwordHash: string;
  email: string;
}

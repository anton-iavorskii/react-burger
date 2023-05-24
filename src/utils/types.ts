export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TConstructorIngredient = TIngredient & { key: string };

export type TModalProps = {
  isHeader?: boolean;
  handleCloseModal: () => void;
  children: React.ReactNode;
};

export type TOrderResponse = {
  success: boolean;
  order: { number: number };
};

export type TUser = {
  email: string;
  name: string;
};

export type TRegisterBody = {
  email: string;
  name: string;
  password: string;
};

export type TLoginBody = Omit<TRegisterBody, "name">;

export type TUpdateUserBody = Omit<TRegisterBody, "password"> | string | null;

export type TForgotPasswordBody = {
  email: string;
};

export type TResetPasswordBody = {
  password: string;
  token: string;
};

export type TOrderIngredient =
  | TIngredient & {
      quantityInOrder: number;
    };

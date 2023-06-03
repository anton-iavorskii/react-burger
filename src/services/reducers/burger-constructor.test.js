import {
  ADD_CONSTRUCTOR_INGREDIENT,
  REORDER_CONSTRUCTOR_INGREDIENTS,
  DELETE_CONSTRUCTOR_INGREDIENT,
  DELETE_ALL_CONSTRUCTOR_INGREDIENTS,
} from "../actions/ingredients";
import {
  constructorInitialState,
  constructorReducer,
} from "./burger-constructor";

const testIngredient_1 = {
  _id: "643d69a5c3f7b9001cfa0941",
  name: "Биокотлета из марсианской Магнолии",
  type: "main",
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  __v: 0,
  key: "b16a393d-269b-4a5b-813f-d073e84eb8b7",
};

const testIngredient_2 = {
  _id: "643d69a5c3f7b9001cfa093e",
  name: "Филе Люминесцентного тетраодонтимформа",
  type: "main",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/meat-03.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
  __v: 0,
  key: "b16a393d-269b-4a5b-813f-d073e84eb000",
};

describe("check burgerConstructor reducer", () => {
  test("check ADD_CONSTRUCTOR_INGREDIENT", () => {
    expect(
      constructorReducer(constructorInitialState, {
        type: ADD_CONSTRUCTOR_INGREDIENT,
        item: testIngredient_1,
      })
    ).toEqual({
      ...constructorInitialState,
      constructorItems: [
        ...constructorInitialState.constructorItems,
        testIngredient_1,
      ],
    });
  });

  test("check REORDER_CONSTRUCTOR_INGREDIENTS", () => {
    expect(
      constructorReducer(
        { constructorItems: [testIngredient_1, testIngredient_2] },
        {
          type: REORDER_CONSTRUCTOR_INGREDIENTS,
          from: 1,
          to: 0,
        }
      )
    ).toEqual({
      ...constructorInitialState,
      constructorItems: [testIngredient_2, testIngredient_1],
    });
  });

  test("check DELETE_CONSTRUCTOR_INGREDIENT", () => {
    expect(
      constructorReducer(
        { constructorItems: [testIngredient_1, testIngredient_2] },
        {
          type: DELETE_CONSTRUCTOR_INGREDIENT,
          index: 1,
        }
      )
    ).toEqual({
      ...constructorInitialState,
      constructorItems: [testIngredient_1],
    });
  });

  test("check DELETE_ALL_CONSTRUCTOR_INGREDIENTS", () => {
    expect(
      constructorReducer(
        { constructorItems: [testIngredient_1, testIngredient_2] },
        {
          type: DELETE_ALL_CONSTRUCTOR_INGREDIENTS,
        }
      )
    ).toEqual({
      ...constructorInitialState,
      constructorItems: [],
    });
  });
});

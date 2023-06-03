import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENT,
} from "../actions/ingredients";
import {
  allIngredientsReducer,
  allIngredientsInitialState,
} from "./ingredients";

const testIngredients = [
  {
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
  },
  {
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
  },
];

describe("check allIngredients reducer", () => {
  test("check GET_INGREDIENTS_REQUEST", () => {
    expect(
      allIngredientsReducer(undefined, { type: GET_INGREDIENTS_REQUEST })
    ).toEqual({
      ...allIngredientsInitialState,
      itemsRequest: true,
    });
  });

  test("check GET_INGREDIENTS_SUCCESS", () => {
    expect(
      allIngredientsReducer(undefined, {
        type: GET_INGREDIENTS_SUCCESS,
        items: testIngredients,
      })
    ).toEqual({
      ...allIngredientsInitialState,
      items: testIngredients,
    });
  });

  test("check GET_INGREDIENTS_FAILED", () => {
    expect(
      allIngredientsReducer(undefined, { type: GET_INGREDIENTS_FAILED })
    ).toEqual({
      ...allIngredientsInitialState,
      items: [],
      itemsFailed: true,
      itemsRequest: false,
    });
  });

  test("check GET_INGREDIENT", () => {
    expect(
      allIngredientsReducer(
        { ...allIngredientsInitialState, items: testIngredients },
        { type: GET_INGREDIENT, id: "643d69a5c3f7b9001cfa0941" }
      )
    ).toEqual({
      ...allIngredientsInitialState,
      items: testIngredients,
      ingredient: testIngredients[1],
    });
  });
});

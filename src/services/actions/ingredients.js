import getFetch from '../../utils/getFetch';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_BUNS = 'GET_BUNS';
export const GET_SAUCES = 'GET_SAUCES';
export const GET_FILLINGS = 'GET_FILLINGS';
export const GET_INGREDIENT = 'GET_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export const GET_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';
export const UPDATE_CONSTRUCTOR_INGREDIENT = 'UPDATE_CONSTRUCTOR_INGREDIENTS';
export const DELETE_CONSTRUCTOR_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT';

export const GET_ORDER = 'GET_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';

export const GET_MODAL_OPEN = 'GET_MODAL_OPEN';
export const GET_MODAL_CLOSE = 'GET_MODAL_CLOSE';

export const TAB_SWITCH = 'GET_MODAL_CLOSE';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getFetch('ingredients').then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          items: res.data,
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      }
    });
  };
}

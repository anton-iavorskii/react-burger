import IngredientDetailsStyles from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { TIngredient } from "../../utils/types";
import { TStore, useAppSelector } from "../../services/store-types";

function IngredientDetails(): JSX.Element | null {
  const { id } = useParams();
  const getDataStore = (store: TStore) => {
    return {
      allIngredients: store.allIngredients.items,
    };
  };
  const { allIngredients } = useAppSelector(getDataStore);

  const ingredient = allIngredients.find(
    (item: TIngredient) => item._id === id
  );

  if (!ingredient) {
    return null;
  }

  return (
    <div className={IngredientDetailsStyles.wrapper}>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        data-testid={"ingredientImage"}
      />
      <h2
        className="mt-4 mb-8 text text_type_main-medium"
        data-testid={"ingredientName"}
      >
        {ingredient.name}
      </h2>
      <div className={`mb-15 ${IngredientDetailsStyles.compositionContainer}`}>
        <div className={`mr-5 ${IngredientDetailsStyles.compositionWrapper}`}>
          <span
            className={`mb-4 text text_type_main-default text_color_inactive`}
          >
            Калории,ккал
          </span>
          <span
            className={`text text_type_digits-default text_color_inactive`}
            data-testid={"calories"}
          >
            {ingredient.calories}
          </span>
        </div>
        <div className={`mr-5 ${IngredientDetailsStyles.compositionWrapper}`}>
          <span
            className={`mb-4 text text_type_main-default text_color_inactive`}
          >
            Белки, г
          </span>
          <span
            className={`text text_type_digits-default text_color_inactive`}
            data-testid={"proteins"}
          >
            {ingredient.proteins}
          </span>
        </div>
        <div className={`mr-5 ${IngredientDetailsStyles.compositionWrapper}`}>
          <span
            className={`mb-4 text text_type_main-default text_color_inactive`}
          >
            Жиры, г
          </span>
          <span
            className={`text text_type_digits-default text_color_inactive`}
            data-testid={"fat"}
          >
            {ingredient.fat}
          </span>
        </div>
        <div className={`${IngredientDetailsStyles.compositionWrapper}`}>
          <span
            className={`mb-4 text text_type_main-default text_color_inactive`}
          >
            Углеводы, г
          </span>
          <span
            className={`text text_type_digits-default text_color_inactive`}
            data-testid={"carbohydrates"}
          >
            {ingredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;

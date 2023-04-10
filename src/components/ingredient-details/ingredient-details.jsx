import React from 'react';

import IngredientDetailsStyles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function IngredientDetails() {
  const { ingredientId } = useParams();
  const { allIngredients } = useSelector((store) => {
    return {
      allIngredients: store.allIngredients.items,
    };
  });
  const ingredient = allIngredients.find((item) => item._id === ingredientId);

  if (!ingredient) {
    return null;
  }

  return (
    <div className={IngredientDetailsStyles.wrapper}>
      <img src={ingredient.image_large} alt="булка" />
      <h2 className="mt-4 mb-8 text text_type_main-medium">
        {ingredient.name}
      </h2>
      <div className={`mb-15 ${IngredientDetailsStyles.compositionContainer}`}>
        <div className={`mr-5 ${IngredientDetailsStyles.compositionWrapper}`}>
          <span
            className={`mb-4 text text_type_main-default text_color_inactive`}
          >
            Калории,ккал
          </span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingredient.calories}
          </span>
        </div>
        <div className={`mr-5 ${IngredientDetailsStyles.compositionWrapper}`}>
          <span
            className={`mb-4 text text_type_main-default text_color_inactive`}
          >
            Белки, г
          </span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingredient.proteins}
          </span>
        </div>
        <div className={`mr-5 ${IngredientDetailsStyles.compositionWrapper}`}>
          <span
            className={`mb-4 text text_type_main-default text_color_inactive`}
          >
            Жиры, г
          </span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingredient.fat}
          </span>
        </div>
        <div className={`${IngredientDetailsStyles.compositionWrapper}`}>
          <span
            className={`mb-4 text text_type_main-default text_color_inactive`}
          >
            Углеводы, г
          </span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;

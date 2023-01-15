import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IngredientDetailsStyles from './ingredient-details.module.css';

const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
});

function IngredientDetails({ ingredient }) {
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

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};

export default IngredientDetails;

import React, { useState, useEffect } from 'react';
import OrderDetailsStyles from './order-details.module.css';
import DoneIcon from '../../images/graphics.svg';

function OrderDetails() {
  return (
    <div className={OrderDetailsStyles.wrapper}>
      <span className="mt-30 text text_type_digits-large">034536</span>
      <span className="mt-8 mb-15 text text_type_main-medium">
        идентификатор заказа
      </span>
      <img src={DoneIcon} alt="image" />
      <span className="mt-15 mb-2 text text_type_main-default">
        Ваш заказ начали готовить
      </span>
      <span className="mb-30 text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
}

export default OrderDetails;

import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './constructor-card.module.css';
import {
  DELETE_CONSTRUCTOR_INGREDIENT,
  REORDER_CONSTRUCTOR_INGREDIENTS,
} from '../../services/actions/ingredients';
import { dataIngredientsPropTypes } from '../../utils/common-types';

const ConstructorCard = ({ item, index }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop({
    accept: ['constructor'],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: REORDER_CONSTRUCTOR_INGREDIENTS,
        from: dragIndex,
        to: hoverIndex,
      });

      item.index = hoverIndex;
    },
  });
  const [{ opacity }, drag] = useDrag({
    type: 'constructor',
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  drag(drop(ref));

  const handleDeleteIngredient = () => {
    dispatch({ type: DELETE_CONSTRUCTOR_INGREDIENT, index });
  };

  return (
    <div
      className={`${BurgerConstructorStyles.constructorCard}`}
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        extraClass="mr-2 ml-2"
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={handleDeleteIngredient}
      />
    </div>
  );
};

export default ConstructorCard;

ConstructorCard.propTypes = {
  index: PropTypes.number.isRequired,
  item: dataIngredientsPropTypes.isRequired,
};

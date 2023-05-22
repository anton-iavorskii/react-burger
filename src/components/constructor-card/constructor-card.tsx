import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./constructor-card.module.css";
import {
  DELETE_CONSTRUCTOR_INGREDIENT,
  REORDER_CONSTRUCTOR_INGREDIENTS,
} from "../../services/actions/ingredients";

import { TConstructorIngredient } from "../../utils/types";
import { useAppDispatch } from "../../services/store-types";

type TConstructorCardProps = {
  item: TConstructorIngredient;
  index: number;
};

type TDragProps = {
  index: number;
};

type Identifier = string | symbol;

const ConstructorCard = ({
  item,
  index,
}: TConstructorCardProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [{ handlerId }, drop] = useDrop<
    TDragProps,
    unknown,
    { handlerId: Identifier | null }
  >({
    accept: ["constructor"],
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
      const hoverClientY =
        clientOffset && clientOffset.y - hoverBoundingRect.top;

      if (hoverClientY) {
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      }

      dispatch({
        type: REORDER_CONSTRUCTOR_INGREDIENTS,
        from: dragIndex,
        to: hoverIndex,
      });

      item.index = hoverIndex;
    },
  });

  const [{ opacity }, drag] = useDrag<TDragProps, unknown, { opacity: number }>(
    {
      type: "constructor",
      item: () => {
        return { index };
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }
  );

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

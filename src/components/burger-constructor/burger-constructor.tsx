import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";
import BurgerConstructorStyles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {
  GET_MODAL_ORDER_OPEN,
  GET_MODAL_ORDER_CLOSE,
  getOrder,
  addConstructorItem,
} from "../../services/actions/ingredients";
import ConstructorCard from "../constructor-card/constructor-card";
import { BUN, loginPath } from "../../utils/consts";
import { TConstructorIngredient } from "../../utils/types";
import {
  TStore,
  useAppDispatch,
  useAppSelector,
} from "../../services/store-types";

const BurgerConstructor = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getDataStore = (store: TStore) => {
    return {
      constructorItems: store.constructorBurger.constructorItems,
      isVisibleModal: store.modal.isVisibleOrderModal,
      order: store.order.order,
      user: store.user.user,
    };
  };
  const { constructorItems, isVisibleModal, order, user } =
    useAppSelector(getDataStore);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: TConstructorIngredient) {
      dispatch(addConstructorItem(item));
    },
  });

  const handleOpenModal = () => {
    if (!user) {
      navigate(loginPath);
    } else {
      const itemsId = constructorItems.map(
        (item: TConstructorIngredient) => item._id
      );
      dispatch(
        getOrder({ ingredients: bun ? [...itemsId, bun._id] : [itemsId] })
      );
      dispatch({ type: GET_MODAL_ORDER_OPEN });
    }
  };

  const handleCloseModal = () => {
    dispatch({ type: GET_MODAL_ORDER_CLOSE });
  };

  const totalSum = useMemo(() => {
    return constructorItems.reduce(
      (accum: number, item: TConstructorIngredient) =>
        item.type === BUN ? accum + item.price * 2 : accum + item.price,
      0
    );
  }, [constructorItems]);

  const bun = useMemo(() => {
    return constructorItems.find(
      (item: TConstructorIngredient) => item.type === "bun"
    );
  }, [constructorItems]);

  const constructorContent = useMemo(() => {
    return constructorItems.map(
      (item: TConstructorIngredient, index: number) => {
        return (
          item.type !== BUN && (
            <ConstructorCard key={item.key} item={item} index={index} />
          )
        );
      }
    );
  }, [constructorItems]);

  return (
    <>
      <section
        className={`pt-25 pr-4 pl-4 ml-10 ${BurgerConstructorStyles.wrapper}`}
      >
        <div
          className={BurgerConstructorStyles.constructorItemContainer}
          ref={dropTarget}
        >
          <div
            className={`custom-scroll ${BurgerConstructorStyles.itemWrapper}`}
          >
            {bun && (
              <div
                className={`pl-8 ${BurgerConstructorStyles.constructorCard}`}
              >
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={bun.name + " верх"}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </div>
            )}
            {constructorContent}
            {bun && (
              <div
                className={`pl-8 ${BurgerConstructorStyles.constructorCard}`}
              >
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={bun.name + " низ"}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </div>
            )}
          </div>
        </div>
        <div
          className={`mt-10 ${BurgerConstructorStyles.bottomBlockContainer}`}
        >
          <div className={`mr-10 ${BurgerConstructorStyles.totalContainer}`}>
            <span className={`text text_type_digits-medium mr-2`}>
              {totalSum}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={handleOpenModal}
            disabled={totalSum > 0 ? false : true}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {isVisibleModal && order && (
        <Modal handleCloseModal={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;

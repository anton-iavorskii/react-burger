import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { TModalProps } from "../../utils/types";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const Modal = ({
  children,
  isHeader,
  handleCloseModal,
}: TModalProps): JSX.Element => {
  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay handleCloseModal={handleCloseModal}>
      <div className={ModalStyles.modal} onClick={(e) => e.stopPropagation()}>
        {isHeader ? (
          <header className={`mt-10 mr-10 ml-10 ${ModalStyles.header}`}>
            <h1 className="text text_type_main-large">Детали ингредиента</h1>
            <div className={ModalStyles.closeIconWrapper}>
              <CloseIcon type="secondary" onClick={handleCloseModal} />
            </div>
          </header>
        ) : (
          <div
            className={`mr-10 mt-15 ${ModalStyles.closeIconWrapperNoHeader}`}
          >
            <CloseIcon type="secondary" onClick={handleCloseModal} />
          </div>
        )}
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
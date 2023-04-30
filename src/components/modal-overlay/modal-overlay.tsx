import ModalOverlayStyles from "./modal-overlay.module.css";
import { TModalProps } from "../../utils/types";

const ModalOverlay = ({
  children,
  handleCloseModal,
}: TModalProps): JSX.Element => {
  return (
    <div className={ModalOverlayStyles.modalOverlay} onClick={handleCloseModal}>
      {children}
    </div>
  );
};

export default ModalOverlay;

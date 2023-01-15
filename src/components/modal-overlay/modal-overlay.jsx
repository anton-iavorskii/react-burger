import React from 'react';
import PropTypes from 'prop-types';
import ModalOverlayStyles from './modal-overlay.module.css';
import {
  handleCloseModalPropTypes,
  childrenPropTypes,
} from '../../utils/common-types';

function ModalOverlay({ children, handleCloseModal }) {
  return (
    <div className={ModalOverlayStyles.modalOverlay} onClick={handleCloseModal}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: childrenPropTypes.isRequired,
  handleCloseModal: handleCloseModalPropTypes.isRequired,
};

export default ModalOverlay;

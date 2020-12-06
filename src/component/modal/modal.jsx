import React from "react";
import PropTypes from "prop-types";
import useNoScroll from "../../hooks/use-no-scroll";
import styles from "./modal.module.css";

function Modal({ open, children, close = null, footer = true, header = true }) {
  useNoScroll(open);

  function handleClose() {
    close();
  }

  if (!open) {
    return null;
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-hidden="true"
      className={styles.shadowModal}
      onClick={handleClose}
    >
      <div
        role="button"
        tabIndex={0}
        aria-hidden="true"
        className={styles.containerModal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeModalButton}
          onClick={close}
        >
          X
        </button>
        {header && <div className={styles.modalHeader}>Header</div>}
        {children}
        {footer && <div className={styles.modalFooter}>FOOTER</div>}
      </div>
    </div>
  );
}
Modal.propTypes = {
  footer: PropTypes.bool,
  header: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  footer: true,
  header: true,
};
export default Modal;

import classes from './ModalContainer.module.css';
import { ReactComponent as CloseIcon } from '../../img/ui/close_icon.svg';

export const ModalTypes = {
  WITHOUT_HEADER: 'withoutHeader'
};

const ModalTypesStyles = {
  [ModalTypes.WITHOUT_HEADER]: {
    header: classes.headerWithoutHeader,
    body: classes.bodyWithoutHeader
  }
};

export const ModalContainer = ({
  isOpen,
  setIsOpen,
  header,
  headerText,
  modalClass = '',
  headerClass = '',
  containerClass = '',
  bodyClass = '',
  children,
  preventClose,
  hideCloseButton,
  hideHeader,
  type = '',
  modalRef = null
}) => {
  const onClick = (e) => {
    if (preventClose) return;
    if (e.target.classList) {
      if (e.target.classList.contains(classes.modal)) {
        setIsOpen(false);
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`${classes.modal} ${modalClass}`}
      onClick={onClick}
      style={{ display: isOpen ? 'block' : 'none' }}
      ref={modalRef}
    >
      <div className={`${classes.container} ${containerClass}`}>
        {!hideHeader ? (
          <div
            className={`${classes.header} ${
              ModalTypesStyles[type] ? ModalTypesStyles[type].header : ''
            } ${headerClass}`}
          >
            {headerText ? <b>{headerText}</b> : header}
            {!hideCloseButton && (
              <CloseIcon onClick={handleClose} className={classes.closeIcon} />
            )}
          </div>
        ) : null}
        <div
          className={`${classes.body} ${
            ModalTypesStyles[type] ? ModalTypesStyles[type].body : ''
          } ${bodyClass}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

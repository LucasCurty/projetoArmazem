import React from 'react';
import { 
  Overlay,
  Container,

} from './styles';

export function Modal({ 
  isOpen, 
  onClose, 
  children, 
  title,
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick) {
      onClose(e);
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Container>
        <h2>{title}</h2>
        {children}
      </Container>
    </Overlay>
  );
}

export default Modal;

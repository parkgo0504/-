// Modal.jsx

import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  width: 500px;
  overflow: auto;
  text-align: left;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  background: none;
  border: none;
`;

const Modal = ({ onClose, children }) => {
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {children}
        </ModalContent>
      </ModalOverlay>
    );
  };

export default Modal;
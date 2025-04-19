import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import { theme, spacing, borderRadius, shadows, transitions } from '../../assets/styles';

// Modal backdrop
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 15, 15, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity ${transitions.normal}, visibility ${transitions.normal};
`;

// Modal container
const ModalContainer = styled.div`
  background-color: white;
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.lg};
  width: 100%;
  max-width: ${props => {
    switch (props.size) {
      case 'sm': return '400px';
      case 'lg': return '800px';
      default: return '600px';
    }
  }};
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-20px)'};
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: transform ${transitions.normal}, opacity ${transitions.normal};
`;

// Modal header
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.md} ${spacing.lg};
  border-bottom: 1px solid ${theme.border};
`;

// Modal title
const ModalTitle = styled.h3`
  margin: 0;
  font-weight: 600;
  color: ${theme.text.primary};
`;

// Close button
const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.text.secondary};
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xs};
  border-radius: ${borderRadius.md};
  
  &:hover {
    background-color: ${theme.surface};
    color: ${theme.text.primary};
  }
`;

// Modal content
const ModalContent = styled.div`
  padding: ${spacing.lg};
  overflow-y: auto;
  flex: 1;
`;

// Modal footer
const ModalFooter = styled.div`
  padding: ${spacing.md} ${spacing.lg};
  border-top: 1px solid ${theme.border};
  display: flex;
  justify-content: flex-end;
  gap: ${spacing.sm};
`;

// Modal component
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  actions
}) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  // Close modal when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Render modal in portal
  return ReactDOM.createPortal(
    <Backdrop isOpen={isOpen} onClick={handleBackdropClick}>
      <ModalContainer isOpen={isOpen} size={size}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>
            <FiX />
          </CloseButton>
        </ModalHeader>
        
        <ModalContent>
          {children}
        </ModalContent>
        
        {actions && (
          <ModalFooter>
            {actions}
          </ModalFooter>
        )}
      </ModalContainer>
    </Backdrop>,
    document.body
  );
};

export default Modal; 
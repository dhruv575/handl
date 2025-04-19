import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { theme, typography, spacing, borderRadius, transitions } from '../../assets/styles';

// Input sizes - updated for cleaner look
const sizes = {
  sm: css`
    padding: ${spacing.xs} ${spacing.md};
    font-size: ${typography.body.small};
    height: 32px;
  `,
  md: css`
    padding: ${spacing.sm} ${spacing.md};
    font-size: ${typography.body.medium};
    height: 40px;
  `,
  lg: css`
    padding: ${spacing.md} ${spacing.md};
    font-size: ${typography.body.medium};
    height: 48px;
  `,
};

// Input container
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${spacing.md};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

// Label styling - updated for Notion-like style
const Label = styled.label`
  font-size: ${typography.body.small};
  font-weight: ${typography.fontWeight.medium};
  margin-bottom: ${spacing.xs};
  color: ${theme.text.secondary};
`;

// Helper text styling
const HelperText = styled.div`
  font-size: ${typography.body.small};
  margin-top: ${spacing.xs};
  color: ${props => props.error ? theme.danger : theme.text.light};
`;

// Input styling - updated for Notion-like minimal look
const StyledInput = styled.input`
  display: block;
  width: 100%;
  border-radius: ${borderRadius.md};
  border: 1px solid ${props => props.error ? theme.danger : theme.border};
  background-color: ${theme.background};
  color: ${theme.text.primary};
  transition: all ${transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? theme.danger : theme.text.secondary};
    box-shadow: ${props => 
      props.error 
        ? 'rgba(225, 98, 89, 0.2) 0px 0px 0px 2px' 
        : 'rgba(55, 53, 47, 0.16) 0px 0px 0px 1px'
    };
  }
  
  &::placeholder {
    color: ${theme.text.light};
  }
  
  &:disabled {
    background-color: ${theme.surface};
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  /* Apply sizes */
  ${props => sizes[props.size] || sizes.md}
  
  /* Apply icon padding if there's an icon */
  ${props => props.hasLeftIcon && css`
    padding-left: ${spacing.xl};
  `}
  
  ${props => props.hasRightIcon && css`
    padding-right: ${spacing.xl};
  `}
`;

// Input wrapper for icons
const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

// Icon container
const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.text.light};
  z-index: 1;
  
  ${props => props.position === 'left' && css`
    left: ${spacing.sm};
  `}
  
  ${props => props.position === 'right' && css`
    right: ${spacing.sm};
  `}
`;

// Input component
const Input = forwardRef(({
  label,
  helperText,
  error,
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  ...rest
}, ref) => {
  const hasLeftIcon = !!leftIcon;
  const hasRightIcon = !!rightIcon;
  
  return (
    <InputContainer fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        {hasLeftIcon && (
          <IconContainer position="left">
            {leftIcon}
          </IconContainer>
        )}
        <StyledInput
          ref={ref}
          size={size}
          error={error}
          hasLeftIcon={hasLeftIcon}
          hasRightIcon={hasRightIcon}
          {...rest}
        />
        {hasRightIcon && (
          <IconContainer position="right">
            {rightIcon}
          </IconContainer>
        )}
      </InputWrapper>
      {(helperText || error) && (
        <HelperText error={error}>
          {error || helperText}
        </HelperText>
      )}
    </InputContainer>
  );
});

export default Input; 
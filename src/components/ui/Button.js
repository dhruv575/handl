import React from 'react';
import styled, { css } from 'styled-components';
import { theme, typography, spacing, borderRadius, transitions } from '../../assets/styles';

// Button variants - updated for Notion-like style
const variants = {
  primary: css`
    background: ${theme.primary};
    color: white;
    border: 1px solid ${theme.primary};
    
    &:hover {
      background: ${props => props.theme.info || theme.info};
      border-color: ${props => props.theme.info || theme.info};
    }
    
    &:active {
      background: ${theme.primary};
      border-color: ${theme.primary};
    }
  `,
  secondary: css`
    background: ${theme.secondary};
    color: white;
    border: 1px solid ${theme.secondary};
    
    &:hover {
      background: ${props => props.theme.success || theme.success};
      border-color: ${props => props.theme.success || theme.success};
      filter: brightness(105%);
    }
    
    &:active {
      background: ${theme.secondary};
      border-color: ${theme.secondary};
    }
  `,
  outline: css`
    background: transparent;
    color: ${theme.text.primary};
    border: 1px solid ${theme.border};
    
    &:hover {
      background: rgba(55, 53, 47, 0.05);
      border-color: ${theme.text.light};
    }
    
    &:active {
      background: rgba(55, 53, 47, 0.08);
    }
  `,
  ghost: css`
    background: transparent;
    color: ${theme.text.primary};
    border: 1px solid transparent;
    
    &:hover {
      background: rgba(55, 53, 47, 0.04);
    }
    
    &:active {
      background: rgba(55, 53, 47, 0.08);
    }
  `,
  danger: css`
    background: ${theme.danger};
    color: white;
    border: 1px solid ${theme.danger};
    
    &:hover {
      filter: brightness(105%);
    }
    
    &:active {
      filter: brightness(95%);
    }
  `,
};

// Button sizes - slightly updated for cleaner look
const sizes = {
  sm: css`
    padding: ${spacing.xs} ${spacing.md};
    font-size: ${typography.body.small};
    height: 32px;
  `,
  md: css`
    padding: ${spacing.sm} ${spacing.lg};
    font-size: ${typography.body.medium};
    height: 40px;
  `,
  lg: css`
    padding: ${spacing.md} ${spacing.xl};
    font-size: ${typography.body.medium};
    height: 48px;
  `,
};

// Styled button component - updated for Notion-like minimal style
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${typography.fontWeight.medium};
  border-radius: ${borderRadius.md};
  transition: all ${transitions.fast};
  cursor: pointer;
  outline: none;
  text-align: center;
  line-height: 1;
  white-space: nowrap;
  box-shadow: none;
  
  /* Apply variants */
  ${props => variants[props.variant] || variants.primary}
  
  /* Apply sizes */
  ${props => sizes[props.size] || sizes.md}
  
  /* Apply full width */
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  /* Apply disabled state */
  ${props => props.disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  `}
  
  /* Apply icon styles */
  ${props => props.hasIcon && css`
    gap: ${spacing.xs};
  `}
`;

// Button component
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  leftIcon,
  rightIcon,
  ...rest
}) => {
  const hasIcon = leftIcon || rightIcon;
  
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      type={type}
      hasIcon={hasIcon}
      {...rest}
    >
      {leftIcon && leftIcon}
      {children}
      {rightIcon && rightIcon}
    </StyledButton>
  );
};

export default Button; 
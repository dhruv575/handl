import React from 'react';
import styled, { css } from 'styled-components';
import { theme, spacing, borderRadius, shadows } from '../../assets/styles';

// Card elevation levels - more subtle for Notion-like appearance
const elevations = {
  flat: css`
    box-shadow: none;
    border: 1px solid ${theme.border};
  `,
  low: css`
    box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, 
                rgba(15, 15, 15, 0.1) 0px 3px 6px, 
                rgba(15, 15, 15, 0.2) 0px 9px 24px;
  `,
  medium: css`
    box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, 
                rgba(15, 15, 15, 0.1) 0px 5px 10px, 
                rgba(15, 15, 15, 0.2) 0px 15px 40px;
  `,
  high: css`
    box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, 
                rgba(15, 15, 15, 0.1) 0px 7px 14px, 
                rgba(15, 15, 15, 0.2) 0px 24px 48px;
  `,
};

// Card container - updated for Notion-like appearance
const CardContainer = styled.div`
  background-color: ${theme.background};
  border-radius: ${borderRadius.md};
  overflow: hidden;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  /* Apply elevation styles */
  ${props => elevations[props.elevation] || elevations.low}
  
  /* Apply hover effect - more subtle */
  ${props => props.hoverable && css`
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      ${elevations.medium}
    }
  `}
`;

// Card header - updated with more subtle styling
const CardHeader = styled.div`
  padding: ${spacing.md} ${spacing.lg};
  border-bottom: ${props => props.divider ? `1px solid ${theme.border}` : 'none'};
  display: flex;
  align-items: center;
  justify-content: ${props => props.centered ? 'center' : 'space-between'};
`;

// Card content - updated with more space
const CardContent = styled.div`
  padding: ${spacing.md} ${spacing.lg};
`;

// Card footer - updated with more space
const CardFooter = styled.div`
  padding: ${spacing.md} ${spacing.lg};
  border-top: ${props => props.divider ? `1px solid ${theme.border}` : 'none'};
  display: flex;
  align-items: center;
  justify-content: ${props => props.centered ? 'center' : 'flex-end'};
  gap: ${spacing.sm};
`;

// Card media
const CardMedia = styled.div`
  width: 100%;
  height: ${props => props.height || '200px'};
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

// Card component
const Card = ({
  children,
  elevation = 'medium',
  hoverable = false,
  fullWidth = false,
  className,
  ...rest
}) => {
  return (
    <CardContainer 
      elevation={elevation}
      hoverable={hoverable}
      fullWidth={fullWidth}
      className={className}
      {...rest}
    >
      {children}
    </CardContainer>
  );
};

// Export all card components
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Media = CardMedia;

export default Card; 
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { theme, spacing, typography } from '../../assets/styles';
import Button from '../ui/Button';
import Input from '../ui/Input';

// Form container
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

// Form section
const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

// Form group
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

// Form label
const FormLabel = styled.label`
  font-size: ${typography.body.small};
  font-weight: ${typography.fontWeight.medium};
  color: ${theme.text.secondary};
`;

// Form error
const FormError = styled.div`
  color: ${theme.danger};
  font-size: ${typography.body.small};
`;

// Text area
const TextArea = styled.textarea`
  font-family: inherit;
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${props => props.error ? theme.danger : theme.border};
  border-radius: 4px;
  font-size: ${typography.body.medium};
  color: ${theme.text.primary};
  resize: vertical;
  min-height: 120px;
  background-color: ${theme.background};
  transition: all 0.2s ease;
  
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
`;

// Score selector
const ScoreSelector = styled.div`
  display: flex;
  gap: ${spacing.xs};
  flex-wrap: wrap;
  margin-top: ${spacing.xs};
`;

// Score button
const ScoreButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${props => props.selected ? 'transparent' : theme.border};
  background-color: ${props => {
    if (!props.selected) return 'white';
    if (props.value >= 8) return theme.success;
    if (props.value >= 5) return theme.warning;
    return theme.danger;
  }};
  color: ${props => props.selected ? 'white' : theme.text.primary};
  font-weight: ${typography.fontWeight.bold};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: ${props => props.selected ? 'none' : 'translateY(-2px)'};
    border-color: ${props => props.selected ? 'transparent' : theme.primary};
  }
`;

// Date display
const DateDisplay = styled.div`
  font-size: ${typography.body.medium};
  color: ${theme.text.primary};
  font-weight: ${typography.fontWeight.medium};
  margin-bottom: ${spacing.sm};
`;

// Form actions
const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing.sm};
  margin-top: ${spacing.md};
`;

// DayForm component
const DayForm = ({ initialData, onSubmit, onCancel, date }) => {
  const [formData, setFormData] = useState({
    score: 7,
    high: '',
    low: ''
  });
  const [errors, setErrors] = useState({});
  
  // Set initial data if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        score: initialData.score,
        high: initialData.high,
        low: initialData.low
      });
    }
  }, [initialData]);
  
  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Handle score selection
  const handleScoreSelect = (score) => {
    setFormData({
      ...formData,
      score
    });
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.high.trim()) {
      newErrors.high = 'Please share your high point';
    }
    
    if (!formData.low.trim()) {
      newErrors.low = 'Please share your low point';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  // Create score buttons 1-10
  const scoreButtons = [];
  for (let i = 1; i <= 10; i++) {
    scoreButtons.push(
      <ScoreButton 
        key={i} 
        value={i}
        selected={formData.score === i}
        onClick={() => handleScoreSelect(i)}
        type="button"
      >
        {i}
      </ScoreButton>
    );
  }
  
  return (
    <FormContainer onSubmit={handleSubmit}>
      {date && (
        <DateDisplay>
          {format(date, 'EEEE, MMMM d, yyyy')}
        </DateDisplay>
      )}
      
      <FormSection>
        <FormLabel>How would you rate your day? (1-10)</FormLabel>
        <ScoreSelector>
          {scoreButtons}
        </ScoreSelector>
      </FormSection>
      
      <FormSection>
        <FormGroup>
          <FormLabel htmlFor="high">What was your high point today?</FormLabel>
          <TextArea
            id="high"
            name="high"
            value={formData.high}
            onChange={handleInputChange}
            placeholder="Share something positive that happened today..."
            error={errors.high}
          />
          {errors.high && <FormError>{errors.high}</FormError>}
        </FormGroup>
      </FormSection>
      
      <FormSection>
        <FormGroup>
          <FormLabel htmlFor="low">What was your low point today?</FormLabel>
          <TextArea
            id="low"
            name="low"
            value={formData.low}
            onChange={handleInputChange}
            placeholder="Share a challenging moment from today..."
            error={errors.low}
          />
          {errors.low && <FormError>{errors.low}</FormError>}
        </FormGroup>
      </FormSection>
      
      <FormActions>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update Entry' : 'Save Entry'}
        </Button>
      </FormActions>
    </FormContainer>
  );
};

export default DayForm; 
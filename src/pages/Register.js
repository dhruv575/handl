import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiUser, FiMail, FiLock, FiPhone, FiAlertCircle } from 'react-icons/fi';
import { theme, spacing, borderRadius, typography } from '../assets/styles';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

// Page container
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${spacing.lg};
  margin: ${spacing.xl} 0;
`;

// Registration form card
const RegisterCard = styled(Card)`
  width: 100%;
  max-width: 480px;
`;

// Card header with logo
const CardHeader = styled(Card.Header)`
  flex-direction: column;
  align-items: center;
  padding: ${spacing.lg} ${spacing.lg} ${spacing.md};
`;

// Logo image
const LogoImage = styled.img`
  height: 48px;
  margin-bottom: ${spacing.sm};
`;

// Welcome text
const WelcomeText = styled.h1`
  font-size: ${typography.heading[3]};
  text-align: center;
  margin-bottom: ${spacing.xs};
`;

// Subtitle text
const SubtitleText = styled.p`
  color: ${theme.text.secondary};
  text-align: center;
  font-size: ${typography.body.small};
`;

// Form container
const FormContainer = styled(Card.Content)`
  padding: ${spacing.lg};
`;

// Form element
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

// Form row (for side-by-side inputs)
const FormRow = styled.div`
  display: flex;
  gap: ${spacing.md};
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

// Error alert
const ErrorAlert = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  background-color: rgba(255, 92, 92, 0.1);
  border-radius: ${borderRadius.md};
  color: ${theme.danger};
  margin-bottom: ${spacing.md};
`;

// Form footer
const FormFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${spacing.md};
`;

// Login link
const LoginLink = styled(Link)`
  color: ${theme.primary};
  font-weight: ${typography.fontWeight.medium};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const { register, error, loading } = useAuth();
  const navigate = useNavigate();
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    
    // Username validation
    if (!formData.username) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    } else if (formData.username.length > 20) {
      errors.username = 'Username cannot be more than 20 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Username can only contain letters, numbers and underscores';
    }
    
    // Name validation
    if (!formData.name) {
      errors.name = 'Name is required';
    } else if (formData.name.length > 50) {
      errors.name = 'Name cannot be more than 50 characters';
    }
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    // Phone number validation
    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{9,14}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number is invalid (e.g. +1234567890)';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Remove confirmPassword before sending to API
        const { confirmPassword, ...registerData } = formData;
        await register(registerData);
        navigate('/dashboard');
      } catch (err) {
        console.error('Registration error:', err);
      }
    }
  };
  
  return (
    <PageContainer>
      <RegisterCard>
        <CardHeader centered>
          <LogoImage src="/logo192.png" alt="HandL Logo" />
          <WelcomeText>Create Your Account</WelcomeText>
          <SubtitleText>Sign up to start tracking your daily highs and lows</SubtitleText>
        </CardHeader>
        
        <FormContainer>
          {error && (
            <ErrorAlert>
              <FiAlertCircle />
              <span>{error}</span>
            </ErrorAlert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <Input
                label="Username"
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                error={formErrors.username}
                leftIcon={<FiUser />}
                fullWidth
              />
              
              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                error={formErrors.name}
                leftIcon={<FiUser />}
                fullWidth
              />
            </FormRow>
            
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              leftIcon={<FiMail />}
              fullWidth
            />
            
            <Input
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number (e.g. +1234567890)"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={formErrors.phoneNumber}
              leftIcon={<FiPhone />}
              fullWidth
            />
            
            <FormRow>
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password}
                leftIcon={<FiLock />}
                fullWidth
              />
              
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={formErrors.confirmPassword}
                leftIcon={<FiLock />}
                fullWidth
              />
            </FormRow>
            
            <Button
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Form>
          
          <FormFooter>
            <p>
              Already have an account? <LoginLink to="/login">Log in</LoginLink>
            </p>
          </FormFooter>
        </FormContainer>
      </RegisterCard>
    </PageContainer>
  );
};

export default Register; 
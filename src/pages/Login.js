import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { theme, spacing, borderRadius, shadows, typography } from '../assets/styles';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

// Page container
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: ${spacing.lg};
`;

// Login form card
const LoginCard = styled(Card)`
  width: 100%;
  max-width: 420px;
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

// Register link
const RegisterLink = styled(Link)`
  color: ${theme.primary};
  font-weight: ${typography.fontWeight.medium};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const { login, error, loading } = useAuth();
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
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const result = await login(formData);
        
        // Small delay to ensure state updates are complete
        setTimeout(() => {
          // Only navigate if user data is available
          if (result && result.token) {
            navigate('/dashboard');
          }
        }, 100);
      } catch (err) {
        console.error('Login error:', err);
      }
    }
  };
  
  return (
    <PageContainer>
      <LoginCard>
        <CardHeader centered>
          <LogoImage src="/logo192.png" alt="HandL Logo" />
          <WelcomeText>Welcome Back</WelcomeText>
          <SubtitleText>Log in to track your daily highs and lows</SubtitleText>
        </CardHeader>
        
        <FormContainer>
          {error && (
            <ErrorAlert>
              <FiAlertCircle />
              <span>{error}</span>
            </ErrorAlert>
          )}
          
          <Form onSubmit={handleSubmit}>
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
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
              leftIcon={<FiLock />}
              fullWidth
            />
            
            <Button
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </Form>
          
          <FormFooter>
            <p>
              Don't have an account? <RegisterLink to="/register">Sign up</RegisterLink>
            </p>
          </FormFooter>
        </FormContainer>
      </LoginCard>
    </PageContainer>
  );
};

export default Login; 
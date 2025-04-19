import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiUsers, FiCalendar, FiBarChart2, FiArrowRight } from 'react-icons/fi';
import { theme, spacing, typography, media, borderRadius, shadows } from '../assets/styles';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import heroImage from '../assets/images/logo.png';

// Hero section container - updated for a cleaner, more modern look
const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${spacing.xxl} ${spacing.lg};
  background: white;
  color: ${theme.text.primary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${theme.border};
  }
`;

// Hero content wrapper - updated for better spacing
const HeroContent = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing.xl} 0;
`;

// Hero title - updated for Notion-like typography
const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: ${spacing.lg};
  letter-spacing: -0.03em;
  color: ${theme.text.primary};
  line-height: 1.2;
  
  ${media.tablet} {
    font-size: 2.75rem;
  }
  
  ${media.mobile} {
    font-size: 2.25rem;
  }
`;

// Hero subtitle - cleaner, more readable
const HeroSubtitle = styled.p`
  font-size: ${typography.body.large};
  margin-bottom: ${spacing.xl};
  line-height: 1.6;
  color: ${theme.text.secondary};
  max-width: 600px;
  
  ${media.mobile} {
    font-size: ${typography.body.medium};
  }
`;

// Hero buttons container - better spacing
const HeroButtons = styled.div`
  display: flex;
  gap: ${spacing.md};
  margin-bottom: ${spacing.xxl};
  
  ${media.mobile} {
    flex-direction: column;
    width: 100%;
  }
  
  a {
    display: flex;
    align-items: center;
    gap: ${spacing.xs};
  }
`;

// Hero image - updated styling for cleaner look
const HeroImage = styled.img`
  max-width: 80%;
  height: auto;
  margin-top: ${spacing.lg};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
  max-height: 400px;
  background: white;
  padding: 20px;
`;

// Features section
const FeaturesSection = styled.section`
  padding: ${spacing.xxl} ${spacing.md};
  background-color: ${theme.background};
`;

// Section title
const SectionTitle = styled.h2`
  font-size: ${typography.heading[2]};
  text-align: center;
  margin-bottom: ${spacing.xl};
  color: ${theme.text.primary};
  
  ${media.mobile} {
    font-size: ${typography.heading[3]};
  }
`;

// Features container
const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

// Feature card - updated for more subtle Notion-like style
const FeatureCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${spacing.xl};
  transition: all 0.2s ease;
  border: 1px solid ${theme.border};
  box-shadow: none;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px;
    border-color: ${theme.text.light};
  }
`;

// Feature icon - updated for more subtle styling
const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(46, 117, 204, 0.1);
  border-radius: 8px;
  margin-bottom: ${spacing.md};
  color: ${theme.primary};
  font-size: 1.5rem;
`;

// Feature title - updated typography
const FeatureTitle = styled.h3`
  margin-bottom: ${spacing.sm};
  color: ${theme.text.primary};
  font-weight: ${typography.fontWeight.semibold};
  font-size: 1.25rem;
`;

// Feature description - improved readability
const FeatureDescription = styled.p`
  color: ${theme.text.secondary};
  line-height: 1.6;
  margin-bottom: 0;
`;

// How it works section
const HowItWorksSection = styled.section`
  padding: ${spacing.xxl} ${spacing.md};
  background-color: ${theme.surface};
`;

// Steps container
const StepsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

// Step
const Step = styled.div`
  display: flex;
  margin-bottom: ${spacing.xl};
  
  ${media.mobile} {
    flex-direction: column;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

// Step number
const StepNumber = styled.div`
  min-width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.primary};
  color: white;
  border-radius: 50%;
  font-size: ${typography.heading[3]};
  font-weight: ${typography.fontWeight.bold};
  margin-right: ${spacing.md};
  
  ${media.mobile} {
    margin-bottom: ${spacing.sm};
    align-self: center;
  }
`;

// Step content
const StepContent = styled.div`
  flex: 1;
`;

// Step title
const StepTitle = styled.h3`
  margin-bottom: ${spacing.sm};
  color: ${theme.text.primary};
`;

// Step description
const StepDescription = styled.p`
  color: ${theme.text.secondary};
  line-height: 1.6;
`;

// CTA section - updated with neutral colors instead of green gradient
const CTASection = styled.section`
  padding: ${spacing.xxl} ${spacing.md};
  background: ${theme.background};
  color: ${theme.text.primary};
  text-align: center;
  border-top: 1px solid ${theme.border};
`;

// CTA container
const CTAContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

// CTA title
const CTATitle = styled.h2`
  font-size: ${typography.heading[2]};
  margin-bottom: ${spacing.md};
  
  ${media.mobile} {
    font-size: ${typography.heading[3]};
  }
`;

// CTA subtitle
const CTASubtitle = styled.p`
  font-size: ${typography.body.large};
  margin-bottom: ${spacing.lg};
  opacity: 0.9;
  
  ${media.mobile} {
    font-size: ${typography.body.medium};
  }
`;

// Home component
const Home = () => {
  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Track Your Daily Highs and Lows</HeroTitle>
          <HeroSubtitle>
            HandL helps you keep track of your daily emotional experiences, connect with friends,
            and gain insights into your well-being over time.
          </HeroSubtitle>
          <HeroButtons>
            <Button size="lg" as={Link} to="/register">
              Get Started <FiArrowRight />
            </Button>
            <Button size="lg" variant="outline" as={Link} to="/login">
              Log In
            </Button>
          </HeroButtons>
          <HeroImage src={heroImage} alt="HandL App" />
        </HeroContent>
      </HeroSection>
      
      <FeaturesSection>
        <SectionTitle>Why Use HandL?</SectionTitle>
        <FeaturesContainer>
          <FeatureCard hoverable elevation="flat">
            <FeatureIcon>
              <FiCheckCircle />
            </FeatureIcon>
            <FeatureTitle>Easy Daily Tracking</FeatureTitle>
            <FeatureDescription>
              Quickly log your daily high and low moments with a simple score from 1-10.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard hoverable elevation="flat">
            <FeatureIcon>
              <FiUsers />
            </FeatureIcon>
            <FeatureTitle>Connect with Friends</FeatureTitle>
            <FeatureDescription>
              Share your experiences with friends and view their highs and lows in your feed.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard hoverable elevation="flat">
            <FeatureIcon>
              <FiCalendar />
            </FeatureIcon>
            <FeatureTitle>Never Miss a Day</FeatureTitle>
            <FeatureDescription>
              Daily reminders and the ability to backfill past days ensure a complete record.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard hoverable elevation="flat">
            <FeatureIcon>
              <FiBarChart2 />
            </FeatureIcon>
            <FeatureTitle>Gain Insights</FeatureTitle>
            <FeatureDescription>
              View statistics and patterns in your emotional well-being through your dashboard.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesContainer>
      </FeaturesSection>
      
      <HowItWorksSection>
        <SectionTitle>How It Works</SectionTitle>
        <StepsContainer>
          <Step>
            <StepNumber>1</StepNumber>
            <StepContent>
              <StepTitle>Create Your Account</StepTitle>
              <StepDescription>
                Sign up with your email, choose a username, and set up your profile to get started.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepTitle>Record Your Day</StepTitle>
              <StepDescription>
                Each day, score your day from 1-10 and write about your high point and low point.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepTitle>Connect with Friends</StepTitle>
              <StepDescription>
                Search for friends, send requests, and start seeing their entries in your feed.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>4</StepNumber>
            <StepContent>
              <StepTitle>Track Your Progress</StepTitle>
              <StepDescription>
                Use the calendar and dashboard to track your moods and see how they change over time.
              </StepDescription>
            </StepContent>
          </Step>
        </StepsContainer>
      </HowItWorksSection>
      
      <CTASection>
        <CTAContainer>
          <CTATitle>Ready to Start Tracking?</CTATitle>
          <CTASubtitle>
            Join thousands of users who are gaining insights into their daily emotional experiences.
          </CTASubtitle>
          <Button size="lg" as={Link} to="/register">
            Create Your Account
          </Button>
        </CTAContainer>
      </CTASection>
    </>
  );
};

export default Home; 
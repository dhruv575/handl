import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiHeart, FiGithub, FiMail } from 'react-icons/fi';
import { theme, spacing, typography, media, transitions } from '../../assets/styles';

// Footer container
const FooterContainer = styled.footer`
  background-color: ${theme.surface};
  padding: ${spacing.lg} ${spacing.lg};
  margin-top: auto;
`;

// Footer content wrapper
const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.xl};
  
  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

// Footer section
const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

// Footer heading
const FooterHeading = styled.h3`
  color: ${theme.text.primary};
  font-size: ${typography.body.large};
  margin-bottom: ${spacing.md};
  font-weight: ${typography.fontWeight.semibold};
`;

// Footer links list
const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Footer link item
const FooterLinkItem = styled.li`
  margin-bottom: ${spacing.sm};
`;

// Footer link
const FooterLink = styled(Link)`
  color: ${theme.text.secondary};
  text-decoration: none;
  transition: color ${transitions.fast};
  
  &:hover {
    color: ${theme.primary};
  }
`;

// External link
const ExternalLink = styled.a`
  color: ${theme.text.secondary};
  text-decoration: none;
  transition: color ${transitions.fast};
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  
  &:hover {
    color: ${theme.primary};
  }
`;

// Footer text
const FooterText = styled.p`
  color: ${theme.text.secondary};
  font-size: ${typography.body.small};
  line-height: 1.6;
`;

// Copyright bar
const CopyrightBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${spacing.lg};
  margin-top: ${spacing.lg};
  border-top: 1px solid ${theme.border};
  
  ${media.mobile} {
    flex-direction: column;
    gap: ${spacing.md};
    text-align: center;
  }
`;

// Copyright text
const Copyright = styled.p`
  color: ${theme.text.light};
  font-size: ${typography.body.small};
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`;

// Social links
const SocialLinks = styled.div`
  display: flex;
  gap: ${spacing.md};
`;

// Social link
const SocialLink = styled.a`
  color: ${theme.text.secondary};
  font-size: 1.2rem;
  transition: color ${transitions.fast};
  
  &:hover {
    color: ${theme.primary};
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterHeading>HandL</FooterHeading>
          <FooterText>
            Track your daily highs and lows, connect with friends, and gain insights into your emotional well-being.
          </FooterText>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>Links</FooterHeading>
          <FooterLinks>
            <FooterLinkItem>
              <FooterLink to="/">Home</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/about">About</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/dashboard">Dashboard</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/calendar">Calendar</FooterLink>
            </FooterLinkItem>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>Contact</FooterHeading>
          <FooterLinks>
            <FooterLinkItem>
              <ExternalLink href="mailto:dhruvgup@seas.upenn.edu">
                <FiMail /> dhruvgup@seas.upenn.edu
              </ExternalLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <ExternalLink href="https://github.com/dhruv575/handl" target="_blank" rel="noopener noreferrer">
                <FiGithub /> GitHub Repository
              </ExternalLink>
            </FooterLinkItem>
          </FooterLinks>
        </FooterSection>
      </FooterContent>
      
      <CopyrightBar>
        <Copyright>
          © {currentYear} HandL. Made with <FiHeart style={{ color: theme.danger }} /> by Dhruv Gupta
        </Copyright>
        
        <SocialLinks>
          <SocialLink href="https://github.com/dhruv575/handl" target="_blank" rel="noopener noreferrer">
            <FiGithub />
          </SocialLink>
          <SocialLink href="mailto:dhruvgup@seas.upenn.edu">
            <FiMail />
          </SocialLink>
        </SocialLinks>
      </CopyrightBar>
    </FooterContainer>
  );
};

export default Footer; 
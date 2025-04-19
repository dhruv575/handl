import React from 'react';
import styled from 'styled-components';
import { theme, media } from '../../assets/styles';
import Header from './Header';
import Footer from './Footer';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${theme.surface};
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  
  ${media.tablet} {
    padding: 20px 16px;
  }
  
  ${media.mobile} {
    padding: 16px 12px;
  }
`;

const Layout = ({ children }) => {
  return (
    <PageContainer>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </PageContainer>
  );
};

export default Layout; 
import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { theme, spacing, typography, borderRadius } from '../../assets/styles';

// View container
const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

// Score display
const ScoreDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

// Score label
const ScoreLabel = styled.span`
  font-size: ${typography.body.medium};
  color: ${theme.text.secondary};
`;

// Score badge
const ScoreBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => {
    if (props.score >= 8) return 'rgba(55, 161, 105, 0.1)';
    if (props.score >= 5) return 'rgba(247, 185, 85, 0.1)';
    return 'rgba(225, 98, 89, 0.1)';
  }};
  color: ${props => {
    if (props.score >= 8) return theme.success;
    if (props.score >= 5) return theme.warning;
    return theme.danger;
  }};
  font-size: ${typography.heading[4]};
  font-weight: ${typography.fontWeight.bold};
`;

// Section
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

// Section title
const SectionTitle = styled.h4`
  margin: 0;
  font-size: ${typography.body.medium};
  color: ${theme.text.secondary};
  font-weight: ${typography.fontWeight.medium};
`;

// Section content
const SectionContent = styled.div`
  background-color: ${theme.surface};
  padding: ${spacing.md};
  border-radius: ${borderRadius.md};
`;

// Text content
const TextContent = styled.p`
  margin: 0;
  line-height: 1.6;
  color: ${theme.text.primary};
  white-space: pre-wrap;
`;

// Meta info
const MetaInfo = styled.div`
  font-size: ${typography.body.small};
  color: ${theme.text.light};
  margin-top: ${spacing.md};
`;

// DayView component
const DayView = ({ entry }) => {
  if (!entry) return null;
  
  const { score, high, low, date, createdAt } = entry;
  
  // Format dates
  const formattedDate = format(new Date(date), 'EEEE, MMMM d, yyyy');
  const createdDate = format(new Date(createdAt), 'MMMM d, yyyy h:mm a');
  
  return (
    <ViewContainer>
      <ScoreDisplay>
        <ScoreLabel>Day Rating:</ScoreLabel>
        <ScoreBadge score={score}>{score}</ScoreBadge>
      </ScoreDisplay>
      
      <Section>
        <SectionTitle>High Point</SectionTitle>
        <SectionContent>
          <TextContent>{high}</TextContent>
        </SectionContent>
      </Section>
      
      <Section>
        <SectionTitle>Low Point</SectionTitle>
        <SectionContent>
          <TextContent>{low}</TextContent>
        </SectionContent>
      </Section>
      
      <MetaInfo>
        Created on {createdDate}
      </MetaInfo>
    </ViewContainer>
  );
};

export default DayView; 
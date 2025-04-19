import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiUser, FiCalendar, FiFilter, FiRefreshCw } from 'react-icons/fi';
import { theme, spacing, typography, borderRadius, shadows, media } from '../assets/styles';
import { daysAPI, userAPI } from '../data/api';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// Feed container
const FeedContainer = styled.div`
  padding: ${spacing.lg};
  max-width: 900px;
  margin: 0 auto;
  
  ${media.mobile} {
    padding: ${spacing.md} ${spacing.sm};
  }
`;

// Page header
const PageHeader = styled.div`
  margin-bottom: ${spacing.lg};
`;

// Page title
const PageTitle = styled.h1`
  font-size: ${typography.heading[1]};
  color: ${theme.text.primary};
  margin-bottom: ${spacing.xs};
  
  ${media.mobile} {
    font-size: ${typography.heading[2]};
  }
`;

// Page description
const PageDescription = styled.p`
  color: ${theme.text.secondary};
  font-size: ${typography.body.medium};
`;

// Feed controls
const FeedControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.lg};
  
  ${media.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: ${spacing.md};
  }
`;

// Filter button
const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  background: ${theme.surface};
  border: 1px solid ${theme.border};
  color: ${theme.text.primary};
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${borderRadius.md};
  font-size: ${typography.body.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }
  
  ${media.mobile} {
    width: 100%;
    justify-content: center;
  }
`;

// Refresh button
const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  background: none;
  border: none;
  color: ${theme.primary};
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${borderRadius.md};
  font-size: ${typography.body.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(76, 111, 255, 0.05);
  }
  
  ${media.mobile} {
    width: 100%;
    justify-content: center;
    border: 1px solid ${theme.primary};
  }
`;

// Feed entries list
const FeedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

// Feed entry card
const FeedEntryCard = styled(Card)`
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
  
  ${media.mobile} {
    &:hover {
      transform: none;
    }
  }
`;

// Entry user header
const EntryUserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md};
  border-bottom: 1px solid ${theme.border};
  cursor: pointer;
  
  ${media.mobile} {
    padding: ${spacing.sm};
    gap: ${spacing.sm};
  }
`;

// User avatar
const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${borderRadius.circle};
  background-color: ${theme.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  svg {
    color: ${theme.text.secondary};
    font-size: 1.2rem;
  }
`;

// User info
const UserInfo = styled.div`
  flex: 1;
`;

// User name
const UserName = styled.div`
  font-weight: ${typography.fontWeight.medium};
  color: ${theme.text.primary};
  margin-bottom: 2px;
`;

// Username and date
const UserMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  color: ${theme.text.secondary};
  font-size: ${typography.body.small};
`;

// Score badge
const ScoreBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: ${props => {
    // Score colors based on value
    if (props.score >= 8) return 'rgba(72, 187, 120, 0.1)';
    if (props.score >= 5) return 'rgba(255, 188, 66, 0.1)';
    return 'rgba(255, 92, 92, 0.1)';
  }};
  color: ${props => {
    // Score colors based on value
    if (props.score >= 8) return theme.success;
    if (props.score >= 5) return theme.warning;
    return theme.danger;
  }};
  border-radius: ${borderRadius.circle};
  font-weight: ${typography.fontWeight.bold};
`;

// Entry content
const EntryContent = styled(Card.Content)`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  padding: ${spacing.md} ${spacing.lg};
  
  ${media.mobile} {
    padding: ${spacing.sm};
    gap: ${spacing.sm};
  }
`;

// Entry section
const EntrySection = styled.div`
  display: flex;
  flex-direction: column;
`;

// Entry section title
const EntrySectionTitle = styled.div`
  font-size: ${typography.body.small};
  color: ${theme.text.secondary};
  margin-bottom: ${spacing.xs};
`;

// Entry text
const EntryText = styled.p`
  color: ${theme.text.primary};
  line-height: 1.5;
`;

// Loading state
const LoadingState = styled.div`
  text-align: center;
  padding: ${spacing.xl};
  color: ${theme.text.secondary};
  font-size: ${typography.body.large};
`;

// Empty state
const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing.xl};
  color: ${theme.text.secondary};
  
  p {
    margin-bottom: ${spacing.md};
  }
`;

// Helper function to format date
const formatDate = (date) => {
  const entryDate = new Date(date);
  const now = new Date();
  const diff = now - entryDate;
  const dayDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (dayDiff === 0) {
    return 'Today';
  } else if (dayDiff === 1) {
    return 'Yesterday';
  } else if (dayDiff < 7) {
    return `${dayDiff} days ago`;
  } else {
    return entryDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
};

// Feed component
const Feed = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [feedEntries, setFeedEntries] = useState([]);
  const [friends, setFriends] = useState([]);
  
  // Fetch feed data
  const fetchFeed = async () => {
    setLoading(true);
    try {
      // First get all friends
      const friendsRes = await userAPI.getFriends();
      setFriends(friendsRes.data.data || []);
      
      if (friendsRes.data.data.length === 0) {
        setLoading(false);
        return;
      }
      
      // Get recent entries from each friend
      const entriesPromises = friendsRes.data.data.map(async friend => {
        try {
          // Get the user's most recent entries
          const profileRes = await userAPI.getProfile(friend.username);
          
          if (profileRes.data.data.recentDays && profileRes.data.data.recentDays.length > 0) {
            // Add user info to each day entry
            return profileRes.data.data.recentDays.map(day => ({
              ...day,
              user: {
                _id: friend._id,
                name: friend.name,
                username: friend.username,
                profilePictureUrl: friend.profilePictureUrl
              }
            }));
          }
          return [];
        } catch (err) {
          console.error(`Error fetching entries for ${friend.username}:`, err);
          return [];
        }
      });
      
      // Wait for all promises to resolve
      const allEntries = await Promise.all(entriesPromises);
      
      // Flatten arrays and sort by date (newest first)
      const flattenedEntries = allEntries.flat().sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      
      setFeedEntries(flattenedEntries);
    } catch (err) {
      console.error('Error fetching feed:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Navigate to user profile
  const goToUserProfile = (username) => {
    navigate(`/profile/${username}`);
  };
  
  // Handle refresh
  const handleRefresh = () => {
    fetchFeed();
  };
  
  // Load data on component mount
  useEffect(() => {
    fetchFeed();
  }, []);
  
  return (
    <FeedContainer>
      <PageHeader>
        <PageTitle>Feed</PageTitle>
        <PageDescription>See what your friends are sharing.</PageDescription>
      </PageHeader>
      
      <FeedControls>
        <FilterButton>
          <FiFilter />
          Filter
        </FilterButton>
        
        <RefreshButton onClick={handleRefresh}>
          <FiRefreshCw />
          Refresh
        </RefreshButton>
      </FeedControls>
      
      {loading ? (
        <LoadingState>Loading feed...</LoadingState>
      ) : friends.length === 0 ? (
        <EmptyState>
          <FiUser size={48} />
          <p>You haven't added any friends yet.</p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/friends')}
          >
            Find Friends
          </Button>
        </EmptyState>
      ) : feedEntries.length === 0 ? (
        <EmptyState>
          <FiCalendar size={48} />
          <p>Your friends haven't shared any entries yet.</p>
          <Button 
            variant="outline" 
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </EmptyState>
      ) : (
        <FeedList>
          {feedEntries.map(entry => (
            <FeedEntryCard key={entry._id}>
              <EntryUserHeader onClick={() => goToUserProfile(entry.user.username)}>
                <UserAvatar>
                  {entry.user.profilePictureUrl ? (
                    <img src={entry.user.profilePictureUrl} alt={entry.user.name} />
                  ) : (
                    <FiUser />
                  )}
                </UserAvatar>
                <UserInfo>
                  <UserName>{entry.user.name}</UserName>
                  <UserMeta>
                    <span>@{entry.user.username}</span>
                    <span>•</span>
                    <span>{formatDate(entry.date)}</span>
                  </UserMeta>
                </UserInfo>
                <ScoreBadge score={entry.score}>{entry.score}</ScoreBadge>
              </EntryUserHeader>
              <EntryContent>
                <EntrySection>
                  <EntrySectionTitle>High</EntrySectionTitle>
                  <EntryText>{entry.high}</EntryText>
                </EntrySection>
                <EntrySection>
                  <EntrySectionTitle>Low</EntrySectionTitle>
                  <EntryText>{entry.low}</EntryText>
                </EntrySection>
              </EntryContent>
            </FeedEntryCard>
          ))}
        </FeedList>
      )}
    </FeedContainer>
  );
};

export default Feed; 
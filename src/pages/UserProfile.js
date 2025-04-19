import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiUser, FiCalendar, FiBarChart2, FiTrendingUp, FiUserPlus, FiUserCheck, FiUserX } from 'react-icons/fi';
import { theme, spacing, typography, borderRadius, shadows, media } from '../assets/styles';
import { userAPI } from '../data/api';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// Profile container
const ProfileContainer = styled.div`
  padding: ${spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  
  ${media.mobile} {
    padding: ${spacing.md} ${spacing.sm};
  }
`;

// Page header
const PageHeader = styled.div`
  margin-bottom: ${spacing.md};
  
  ${media.mobile} {
    text-align: center;
  }
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

// Profile header
const ProfileHeader = styled(Card)`
  display: flex;
  padding: ${spacing.lg};
  margin-bottom: ${spacing.xl};
  box-shadow: ${shadows.sm};
  
  ${media.tablet} {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  ${media.mobile} {
    padding: ${spacing.md};
    margin-bottom: ${spacing.lg};
  }
`;

// Profile avatar container
const ProfileAvatarContainer = styled.div`
  margin-right: ${spacing.xl};
  
  ${media.tablet} {
    margin-right: 0;
    margin-bottom: ${spacing.lg};
  }
`;

// Profile avatar
const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: ${borderRadius.circle};
  background-color: ${theme.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: ${shadows.sm};
  border: 3px solid white;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  svg {
    color: ${theme.text.secondary};
    font-size: 3rem;
  }
`;

// Profile info
const ProfileInfo = styled.div`
  flex: 1;
`;

// Profile name
const ProfileName = styled.h1`
  font-size: ${typography.heading[1]};
  margin-bottom: ${spacing.xs};
  
  ${media.mobile} {
    font-size: ${typography.heading[2]};
  }
`;

// Profile username
const ProfileUsername = styled.div`
  color: ${theme.text.secondary};
  font-size: ${typography.body.large};
  margin-bottom: ${spacing.md};
  
  ${media.mobile} {
    font-size: ${typography.body.medium};
  }
`;

// Profile actions
const ProfileActions = styled.div`
  display: flex;
  gap: ${spacing.md};
  align-items: center;
  
  ${media.mobile} {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
`;

// Stats section
const StatsSection = styled.section`
  margin-bottom: ${spacing.xl};
  
  ${media.mobile} {
    margin-bottom: ${spacing.lg};
  }
`;

// Stats grid
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.md};
  
  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${spacing.sm};
  }
`;

// Stats card
const StatsCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${spacing.lg};
  transition: transform 0.2s ease;
  box-shadow: ${shadows.sm};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.md};
  }
  
  ${media.mobile} {
    padding: ${spacing.md};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    
    &:hover {
      transform: none;
    }
  }
`;

// Stats icon
const StatsIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: ${props => props.backgroundColor || 'rgba(76, 111, 255, 0.1)'};
  color: ${props => props.color || theme.primary};
  border-radius: 50%;
  font-size: 1.5rem;
  margin-bottom: ${spacing.md};
  
  ${media.mobile} {
    margin-bottom: 0;
  }
`;

// Stats value
const StatsValue = styled.div`
  font-size: 2rem;
  font-weight: ${typography.fontWeight.bold};
  color: ${theme.text.primary};
  line-height: 1;
  margin-bottom: ${spacing.xs};
  
  ${media.mobile} {
    font-size: 1.75rem;
    margin-bottom: 0;
    margin-left: ${spacing.md};
  }
`;

// Stats label
const StatsLabel = styled.div`
  color: ${theme.text.secondary};
  font-size: ${typography.body.small};
`;

// Stats content wrapper (for mobile layout)
const StatsContent = styled.div`
  ${media.mobile} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Section title
const SectionTitle = styled.h2`
  font-size: ${typography.heading[3]};
  margin-bottom: ${spacing.md};
  padding-bottom: ${spacing.xs};
  border-bottom: 1px solid ${theme.border};
  
  ${media.mobile} {
    font-size: ${typography.heading[4]};
  }
`;

// Recent entries section
const EntriesSection = styled.section`
  margin-bottom: ${spacing.xl};
  
  ${media.mobile} {
    margin-bottom: ${spacing.lg};
  }
`;

// Recent entries grid
const RecentEntriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${spacing.md};
  
  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${spacing.sm};
  }
`;

// Entry card
const EntryCard = styled(Card)`
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  box-shadow: ${shadows.sm};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.md};
  }
  
  ${media.mobile} {
    &:hover {
      transform: none;
    }
  }
`;

// Entry header
const EntryHeader = styled(Card.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.md};
  border-bottom: 1px solid ${theme.border};
  
  ${media.mobile} {
    padding: ${spacing.sm};
  }
`;

// Entry date
const EntryDate = styled.div`
  font-weight: ${typography.fontWeight.medium};
  color: ${theme.text.primary};
`;

// Entry score
const EntryScore = styled.div`
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
  padding: ${spacing.md};
  
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
  font-weight: ${typography.fontWeight.medium};
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
  grid-column: 1 / -1;
  
  p {
    margin-bottom: ${spacing.md};
  }
`;

// Helper function to format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};

// UserProfile component
const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [stats, setStats] = useState({
    streak: 0,
    weeklyAverage: 0,
    totalEntries: 0
  });
  const [recentDays, setRecentDays] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [friendRelation, setFriendRelation] = useState('none'); // 'none', 'friend', 'pending'
  
  // Check if profile is the current user
  const isCurrentUser = currentUser?.username === username;
  
  // Helper function to render a stats card
  const renderStatsCard = (icon, value, label, color, bgColor) => (
    <StatsCard key={label}>
      <StatsIcon backgroundColor={bgColor} color={color}>
        {icon}
      </StatsIcon>
      <StatsContent>
        <StatsValue>{value}</StatsValue>
        <StatsLabel>{label}</StatsLabel>
      </StatsContent>
    </StatsCard>
  );
  
  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await userAPI.getProfile(username);
      const { user, stats, recentDays } = response.data.data;
      
      setUserProfile(user);
      setStats(stats);
      setRecentDays(recentDays);
      
      // Check if the user is a friend of the current user
      if (currentUser) {
        const friendsRes = await userAPI.getFriends();
        const isFriend = friendsRes.data.data.some(friend => friend.username === username);
        
        if (isFriend) {
          setFriendRelation('friend');
        } else {
          // Check if a friend request has been sent
          const requestRes = await userAPI.getFriendRequests();
          const isPending = requestRes.data.data.some(request => 
            request.from.username === username
          );
          
          setFriendRelation(isPending ? 'pending' : 'none');
        }
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('Failed to load user profile. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Send friend request
  const handleSendFriendRequest = async () => {
    try {
      await userAPI.sendFriendRequest(username);
      setRequestSent(true);
    } catch (err) {
      console.error('Error sending friend request:', err);
    }
  };
  
  // Remove friend
  const handleRemoveFriend = async () => {
    try {
      if (userProfile && userProfile._id) {
        await userAPI.removeFriend(userProfile._id);
        setFriendRelation('none');
      }
    } catch (err) {
      console.error('Error removing friend:', err);
    }
  };
  
  // Load data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, [username]);
  
  if (loading) {
    return <LoadingState>Loading profile...</LoadingState>;
  }
  
  if (error) {
    return (
      <EmptyState>
        <p>{error}</p>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
      </EmptyState>
    );
  }
  
  return (
    <ProfileContainer>
      <PageHeader>
        <PageTitle>{isCurrentUser ? 'My Profile' : 'User Profile'}</PageTitle>
      </PageHeader>
      
      {userProfile && (
        <>
          <ProfileHeader>
            <ProfileAvatarContainer>
              <ProfileAvatar>
                {userProfile.profilePictureUrl ? (
                  <img src={userProfile.profilePictureUrl} alt={userProfile.name} />
                ) : (
                  <FiUser />
                )}
              </ProfileAvatar>
            </ProfileAvatarContainer>
            
            <ProfileInfo>
              <ProfileName>{userProfile.name}</ProfileName>
              <ProfileUsername>@{userProfile.username}</ProfileUsername>
              
              {!isCurrentUser && (
                <ProfileActions>
                  {friendRelation === 'none' && (
                    <Button 
                      leftIcon={<FiUserPlus />} 
                      onClick={handleSendFriendRequest}
                      disabled={requestSent}
                    >
                      {requestSent ? 'Request Sent' : 'Add Friend'}
                    </Button>
                  )}
                  
                  {friendRelation === 'pending' && (
                    <Button 
                      variant="outline" 
                      leftIcon={<FiUserCheck />}
                      disabled
                    >
                      Request Pending
                    </Button>
                  )}
                  
                  {friendRelation === 'friend' && (
                    <Button 
                      variant="danger-outline" 
                      leftIcon={<FiUserX />}
                      onClick={handleRemoveFriend}
                    >
                      Remove Friend
                    </Button>
                  )}
                </ProfileActions>
              )}
            </ProfileInfo>
          </ProfileHeader>
          
          <StatsSection>
            <SectionTitle>Stats</SectionTitle>
            <StatsGrid>
              {renderStatsCard(
                <FiTrendingUp />,
                stats.streak,
                'Current Streak',
                theme.primary,
                'rgba(76, 111, 255, 0.1)'
              )}
              
              {renderStatsCard(
                <FiBarChart2 />,
                stats.weeklyAverage?.toFixed(1) || 0,
                'Weekly Average',
                theme.accent,
                'rgba(255, 138, 101, 0.1)'
              )}
              
              {renderStatsCard(
                <FiCalendar />,
                stats.totalEntries,
                'Total Entries',
                theme.secondary,
                'rgba(111, 220, 140, 0.1)'
              )}
            </StatsGrid>
          </StatsSection>
          
          <EntriesSection>
            <SectionTitle>Recent Entries</SectionTitle>
            
            <RecentEntriesGrid>
              {recentDays && recentDays.length > 0 ? (
                recentDays.map(day => (
                  <EntryCard key={day._id}>
                    <EntryHeader>
                      <EntryDate>{formatDate(day.date)}</EntryDate>
                      <EntryScore score={day.score}>{day.score}</EntryScore>
                    </EntryHeader>
                    <EntryContent>
                      <EntrySection>
                        <EntrySectionTitle>High</EntrySectionTitle>
                        <EntryText>{day.high}</EntryText>
                      </EntrySection>
                      <EntrySection>
                        <EntrySectionTitle>Low</EntrySectionTitle>
                        <EntryText>{day.low}</EntryText>
                      </EntrySection>
                    </EntryContent>
                  </EntryCard>
                ))
              ) : (
                <EmptyState>
                  <FiCalendar size={48} />
                  <p>No entries yet</p>
                </EmptyState>
              )}
            </RecentEntriesGrid>
          </EntriesSection>
        </>
      )}
    </ProfileContainer>
  );
};

export default UserProfile; 
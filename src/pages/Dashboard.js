import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiCalendar, FiBarChart2, FiPlus, FiTrendingUp, FiStar, FiUsers, FiArrowRight, FiUser, FiActivity } from 'react-icons/fi';
import { theme, spacing, typography, borderRadius, shadows, media } from '../assets/styles';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { daysAPI } from '../data/api';
import { userAPI } from '../data/api';
import DayForm from '../components/days/DayForm';

// Dashboard container
const DashboardContainer = styled.div`
  padding: ${spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

// Dashboard header
const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.lg};
  
  ${media.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${spacing.md};
  }
  
  ${media.mobile} {
    margin-bottom: ${spacing.md};
  }
`;

// Welcome message
const Welcome = styled.div`
  display: flex;
  flex-direction: column;
`;

// User name
const UserName = styled.h1`
  font-size: ${typography.heading[2]};
  color: ${theme.text.primary};
  margin-bottom: ${spacing.xs};
`;

// Today's date
const TodayDate = styled.p`
  color: ${theme.text.secondary};
  font-size: ${typography.body.medium};
`;

// Dashboard grid layout
const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: ${spacing.lg};
  margin-bottom: ${spacing.xl};
  
  ${media.desktop} {
    grid-template-columns: 1fr 1fr;
  }
  
  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

// Stats card container
const StatsCard = styled(Card)`
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${spacing.lg};
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
`;

// Stats value
const StatsValue = styled.div`
  font-size: 2.5rem;
  font-weight: ${typography.fontWeight.bold};
  color: ${theme.text.primary};
  line-height: 1;
  margin-bottom: ${spacing.xs};
`;

// Stats label
const StatsLabel = styled.div`
  color: ${theme.text.secondary};
  font-size: ${typography.body.small};
`;

// Form card
const FormCard = styled(Card)`
  grid-column: span 3;
  padding: ${spacing.lg};
  
  ${media.desktop} {
    grid-column: span 2;
  }
  
  ${media.tablet} {
    grid-column: span 1;
  }
`;

// Form title
const FormTitle = styled.h2`
  font-size: ${typography.heading[3]};
  margin-bottom: ${spacing.md};
  color: ${theme.text.primary};
`;

// Form layout
const FormLayout = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.md};
  
  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

// Textarea input
const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${props => props.error ? theme.danger : theme.border};
  border-radius: ${borderRadius.md};
  font-family: ${typography.fontFamily};
  font-size: ${typography.body.medium};
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? theme.danger : theme.primary};
    box-shadow: 0 0 0 3px ${props => 
      props.error 
        ? 'rgba(255, 92, 92, 0.2)' 
        : 'rgba(76, 111, 255, 0.2)'
    };
  }
`;

// Form actions
const FormActions = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  margin-top: ${spacing.md};
`;

// Recent entries section
const RecentEntriesSection = styled.div`
  margin-bottom: ${spacing.xl};
`;

// Section header
const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.md};
`;

// Section title
const SectionTitle = styled.h2`
  font-size: ${typography.heading[3]};
  color: ${theme.text.primary};
`;

// View all link
const ViewAllLink = styled.a`
  color: ${theme.primary};
  font-size: ${typography.body.small};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  
  &:hover {
    text-decoration: underline;
  }
`;

// Recent entries list
const EntryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${spacing.md};
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

// Entry card
const EntryCard = styled(Card)`
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

// Entry header
const EntryHeader = styled(Card.Header)`
  justify-content: space-between;
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

// Helper function to format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};

// Friends section
const FriendsSection = styled.div`
  margin-bottom: ${spacing.xl};
  
  ${media.mobile} {
    margin-bottom: ${spacing.lg};
  }
`;

// Friends cards container
const FriendsPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${spacing.md};
  
  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${spacing.sm};
  }
`;

// User card
const UserCard = styled(Card)`
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

// Badge
const Badge = styled.div`
  background-color: ${props => props.backgroundColor || theme.primary};
  color: ${props => props.color || 'white'};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typography.body.xsmall};
`;

// Create a new component for the action buttons in the header
const HeaderActions = styled.div`
  display: flex;
  gap: ${spacing.md};
  
  ${media.tablet} {
    width: 100%;
  }
  
  ${media.mobile} {
    flex-direction: column;
    gap: ${spacing.sm};
    
    > button {
      width: 100%;
    }
  }
`;

// Dashboard component
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    score: 7,
    high: '',
    low: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [recentEntries, setRecentEntries] = useState([]);
  const [stats, setStats] = useState({
    streak: 0,
    avgScore: 0,
    totalEntries: 0
  });
  const [todayEntry, setTodayEntry] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(false);
  
  // Get current date
  const currentDate = formatDate(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Fetch recent entries
  const fetchRecentEntries = async () => {
    try {
      const res = await daysAPI.getDays({ limit: 5 });
      setRecentEntries(res.data.data);
      
      // Check if there's an entry for today
      const todayEntry = res.data.data.find(entry => {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === today.getTime();
      });
      
      setTodayEntry(todayEntry);
    } catch (err) {
      console.error('Error fetching entries:', err);
    }
  };
  
  // Fetch stats
  const fetchStats = async () => {
    try {
      // Get streak
      const streakRes = await daysAPI.getStreak();
      
      // Get weekly average
      const avgRes = await daysAPI.getWeeklyAverage();
      
      // Get total entries count
      const entriesRes = await daysAPI.getDays({ limit: 1 });
      
      setStats({
        streak: streakRes.data.data.streak,
        avgScore: avgRes.data.data.average,
        totalEntries: entriesRes.data.pagination.total
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };
  
  // Fetch friends and friend requests
  const fetchFriendsData = async () => {
    setLoadingFriends(true);
    try {
      // Fetch friends
      const friendsRes = await userAPI.getFriends();
      setFriends(friendsRes.data.data);
      
      // Fetch friend requests
      const requestsRes = await userAPI.getFriendRequests();
      setFriendRequests(requestsRes.data.data);
    } catch (err) {
      console.error('Error fetching friends data:', err);
    } finally {
      setLoadingFriends(false);
    }
  };
  
  // Load data
  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchRecentEntries(),
        fetchStats(),
        fetchFriendsData()
      ]);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };
  
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
    
    if (!formData.high.trim()) {
      errors.high = 'Please share your high point for today';
    }
    
    if (!formData.low.trim()) {
      errors.low = 'Please share your low point for today';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitting(true);
      
      try {
        // Create new day entry
        await daysAPI.createDay({
          date: new Date().toISOString(),
          score: parseInt(formData.score),
          high: formData.high,
          low: formData.low
        });
        
        // Reset form
        setFormData({
          score: 7,
          high: '',
          low: ''
        });
        
        // Reload data
        await loadData();
      } catch (err) {
        console.error('Error saving entry:', err);
      } finally {
        setSubmitting(false);
      }
    }
  };
  
  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);
  
  return (
    <DashboardContainer>
      <DashboardHeader>
        <Welcome>
          <UserName>Hi, {user?.name || 'there'}!</UserName>
          <TodayDate>{currentDate}</TodayDate>
        </Welcome>
        
        <HeaderActions>
          <Button 
            variant="outline"
            leftIcon={<FiActivity />}
            onClick={() => navigate('/feed')}
          >
            View Feed
          </Button>
          <Button 
            variant="primary"
            leftIcon={<FiCalendar />}
            onClick={() => navigate('/calendar')}
          >
            View Calendar
          </Button>
        </HeaderActions>
      </DashboardHeader>
      
      <DashboardGrid>
        <StatsCard>
          <StatsIcon backgroundColor="rgba(76, 111, 255, 0.1)" color={theme.primary}>
            <FiTrendingUp />
          </StatsIcon>
          <StatsValue>{stats.streak}</StatsValue>
          <StatsLabel>Current Streak</StatsLabel>
        </StatsCard>
        
        <StatsCard>
          <StatsIcon backgroundColor="rgba(255, 138, 101, 0.1)" color={theme.accent}>
            <FiBarChart2 />
          </StatsIcon>
          <StatsValue>{stats.avgScore.toFixed(1)}</StatsValue>
          <StatsLabel>Average Score</StatsLabel>
        </StatsCard>
        
        <StatsCard>
          <StatsIcon backgroundColor="rgba(111, 220, 140, 0.1)" color={theme.secondary}>
            <FiStar />
          </StatsIcon>
          <StatsValue>{stats.totalEntries}</StatsValue>
          <StatsLabel>Total Entries</StatsLabel>
        </StatsCard>
        
        {todayEntry ? (
          <FormCard>
            <FormTitle>Today's Entry</FormTitle>
            <EntryContent>
              <EntryScore score={todayEntry.score}>{todayEntry.score}</EntryScore>
              
              <EntrySection>
                <EntrySectionTitle>High</EntrySectionTitle>
                <EntryText>{todayEntry.high}</EntryText>
              </EntrySection>
              
              <EntrySection>
                <EntrySectionTitle>Low</EntrySectionTitle>
                <EntryText>{todayEntry.low}</EntryText>
              </EntrySection>
              
              <Button 
                variant="outline"
                onClick={() => navigate('/calendar')}
                fullWidth
              >
                View All Entries
              </Button>
            </EntryContent>
          </FormCard>
        ) : (
          <FormCard>
            <FormTitle>How was your day?</FormTitle>
            <FormLayout onSubmit={handleSubmit}>
              <div>
                <Input
                  label="Today's Score (1-10)"
                  type="number"
                  name="score"
                  min="1"
                  max="10"
                  value={formData.score}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
              
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: spacing.xs, color: theme.text.secondary }}>
                  What was your high point today?
                </label>
                <TextArea
                  name="high"
                  value={formData.high}
                  onChange={handleChange}
                  placeholder="Share the best part of your day..."
                  error={formErrors.high}
                />
                {formErrors.high && (
                  <div style={{ color: theme.danger, fontSize: typography.body.small, marginTop: spacing.xs }}>
                    {formErrors.high}
                  </div>
                )}
              </div>
              
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: spacing.xs, color: theme.text.secondary }}>
                  What was your low point today?
                </label>
                <TextArea
                  name="low"
                  value={formData.low}
                  onChange={handleChange}
                  placeholder="Share a challenging moment from your day..."
                  error={formErrors.low}
                />
                {formErrors.low && (
                  <div style={{ color: theme.danger, fontSize: typography.body.small, marginTop: spacing.xs }}>
                    {formErrors.low}
                  </div>
                )}
              </div>
              
              <FormActions>
                <Button 
                  type="submit"
                  disabled={submitting}
                  leftIcon={<FiPlus />}
                >
                  {submitting ? 'Saving...' : 'Save Entry'}
                </Button>
              </FormActions>
            </FormLayout>
          </FormCard>
        )}
      </DashboardGrid>
      
      <RecentEntriesSection>
        <SectionHeader>
          <SectionTitle>Recent Entries</SectionTitle>
          <ViewAllLink href="/calendar">
            View all <FiCalendar />
          </ViewAllLink>
        </SectionHeader>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: spacing.xl }}>
            Loading entries...
          </div>
        ) : recentEntries.length === 0 ? (
          <EmptyState>
            <p>You haven't added any entries yet.</p>
            <Button variant="primary" leftIcon={<FiPlus />}>
              Add Your First Entry
            </Button>
          </EmptyState>
        ) : (
          <EntryList>
            {recentEntries.map(entry => (
              <EntryCard key={entry._id} hoverable>
                <EntryHeader>
                  <EntryDate>{formatDate(entry.date)}</EntryDate>
                  <EntryScore score={entry.score}>{entry.score}</EntryScore>
                </EntryHeader>
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
              </EntryCard>
            ))}
          </EntryList>
        )}
      </RecentEntriesSection>
      
      {/* Friends Section */}
      <FriendsSection>
        <SectionHeader>
          <SectionTitle>Friends</SectionTitle>
          <ViewAllLink onClick={() => navigate('/friends')}>
            View All
            <FiArrowRight />
          </ViewAllLink>
        </SectionHeader>
        
        <FriendsPreview>
          {friends.length === 0 ? (
            <EmptyState>
              <FiUsers size={48} />
              <p>You haven't added any friends yet.</p>
              <Button 
                variant="outline"
                onClick={() => navigate('/friends')}
              >
                Find Friends
              </Button>
            </EmptyState>
          ) : (
            // Only show first 3 friends
            friends.slice(0, 3).map(friend => (
              <UserCard key={friend._id}>
                <Card.Header>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: spacing.md 
                  }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      backgroundColor: theme.surface,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}>
                      {friend.profilePictureUrl ? (
                        <img 
                          src={friend.profilePictureUrl} 
                          alt={friend.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      ) : (
                        <FiUser style={{ color: theme.text.secondary }} />
                      )}
                    </div>
                    <div>
                      <div style={{ 
                        fontWeight: typography.fontWeight.medium,
                        color: theme.text.primary,
                        marginBottom: '2px'
                      }}>
                        {friend.name}
                      </div>
                      <div style={{ 
                        color: theme.text.secondary,
                        fontSize: typography.body.small 
                      }}>
                        @{friend.username}
                      </div>
                    </div>
                  </div>
                </Card.Header>
                <Card.Footer>
                  <Button 
                    variant="outline"
                    size="small"
                    onClick={() => navigate(`/profile/${friend.username}`)}
                    fullWidth
                  >
                    View Profile
                  </Button>
                </Card.Footer>
              </UserCard>
            ))
          )}
          
          {friendRequests.length > 0 && (
            <Card>
              <Card.Header>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.sm
                }}>
                  <Badge style={{ 
                    backgroundColor: theme.primary,
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: typography.body.xsmall
                  }}>
                    {friendRequests.length}
                  </Badge>
                  <div style={{ fontWeight: typography.fontWeight.medium }}>
                    Friend Requests
                  </div>
                </div>
              </Card.Header>
              <Card.Content>
                <p style={{ 
                  color: theme.text.secondary,
                  fontSize: typography.body.small,
                  marginBottom: spacing.md
                }}>
                  You have {friendRequests.length} pending friend request{friendRequests.length > 1 ? 's' : ''}.
                </p>
              </Card.Content>
              <Card.Footer>
                <Button 
                  variant="outline"
                  size="small"
                  onClick={() => navigate('/friends')}
                  fullWidth
                >
                  View Requests
                </Button>
              </Card.Footer>
            </Card>
          )}
        </FriendsPreview>
      </FriendsSection>
    </DashboardContainer>
  );
};

export default Dashboard; 
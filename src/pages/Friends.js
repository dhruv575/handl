import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiUsers, FiUserPlus, FiSearch, FiUserCheck, FiUserX, FiUser } from 'react-icons/fi';
import { theme, spacing, typography, borderRadius, shadows, media } from '../assets/styles';
import { userAPI } from '../data/api';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import { useNavigate } from 'react-router-dom';

// Friends page container
const FriendsContainer = styled.div`
  padding: ${spacing.lg};
  max-width: 1200px;
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

// Tabs container
const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${theme.border};
  margin-bottom: ${spacing.lg};
  
  ${media.mobile} {
    flex-wrap: wrap;
    gap: ${spacing.xs};
  }
`;

// Tab button
const TabButton = styled.button`
  padding: ${spacing.md} ${spacing.lg};
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? theme.primary : 'transparent'};
  color: ${props => props.active ? theme.primary : theme.text.secondary};
  font-weight: ${props => props.active ? typography.fontWeight.semibold : typography.fontWeight.regular};
  font-size: ${typography.body.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  
  &:hover {
    color: ${props => props.active ? theme.primary : theme.text.primary};
  }
  
  ${media.mobile} {
    flex: 1;
    padding: ${spacing.sm};
    font-size: ${typography.body.small};
    justify-content: center;
    gap: ${spacing.xs};
  }
`;

// Badge for notification count
const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.primary};
  color: white;
  border-radius: ${borderRadius.circle};
  min-width: 20px;
  height: 20px;
  padding: 0 ${spacing.xs};
  font-size: ${typography.body.xsmall};
  font-weight: ${typography.fontWeight.semibold};
`;

// Search section
const SearchSection = styled.div`
  margin-bottom: ${spacing.xl};
`;

// Search form
const SearchForm = styled.form`
  display: flex;
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
  
  ${media.mobile} {
    flex-direction: column;
    gap: ${spacing.sm};
  }
`;

// Search results container
const SearchResults = styled.div`
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
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid ${theme.border};
  box-shadow: ${shadows.sm};
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.md};
    border-color: ${theme.primary}20;
  }
  
  ${media.mobile} {
    &:hover {
      transform: none;
    }
  }
`;

// User card header
const UserCardHeader = styled(Card.Header)`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md};
  border-bottom: 1px solid ${theme.border};
  background-color: ${theme.background.card};
  
  ${media.mobile} {
    gap: ${spacing.sm};
  }
`;

// User avatar
const UserAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${borderRadius.circle};
  background-color: ${theme.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid ${theme.primary}20;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  svg {
    color: ${theme.text.secondary};
    font-size: 1.5rem;
  }
`;

// User info
const UserInfo = styled.div`
  flex: 1;
  overflow: hidden;
`;

// User name
const UserName = styled.div`
  font-weight: ${typography.fontWeight.medium};
  color: ${theme.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Username
const Username = styled.div`
  color: ${theme.text.secondary};
  font-size: ${typography.body.small};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Friend list
const FriendList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${spacing.md};
  
  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${spacing.sm};
  }
`;

// Friend requests list
const RequestList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${spacing.md};
  
  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${spacing.sm};
  }
`;

// Friend request card
const RequestCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

// Request actions
const RequestActions = styled(Card.Footer)`
  display: flex;
  gap: ${spacing.sm};
  justify-content: flex-end;
  
  ${media.mobile} {
    flex-direction: row;
    justify-content: space-between;
    
    > button {
      flex: 1;
    }
  }
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

// User profile modal
const UserProfile = styled.div`
  padding: ${spacing.lg};
  text-align: center;
  
  ${media.mobile} {
    padding: ${spacing.md} ${spacing.sm};
  }
`;

const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${borderRadius.circle};
  background-color: ${theme.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${spacing.lg} auto;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  svg {
    color: ${theme.text.secondary};
    font-size: 2rem;
  }
`;

const ProfileName = styled.h2`
  font-size: ${typography.heading[3]};
  margin-bottom: ${spacing.xs};
`;

const ProfileUsername = styled.div`
  color: ${theme.text.secondary};
  margin-bottom: ${spacing.lg};
`;

const ProfileActions = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing.md};
  
  ${media.mobile} {
    flex-direction: column;
    gap: ${spacing.sm};
    
    > button {
      width: 100%;
    }
  }
`;

// Update Card.Footer for UserCard to stack buttons vertically
const CardFooter = styled(Card.Footer)`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  padding: ${spacing.md};
  
  > button {
    width: 100%;
  }
`;

// Friends component
const Friends = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [submittingRequest, setSubmittingRequest] = useState(false);
  const [respondingToRequest, setRespondingToRequest] = useState(false);
  const [removingFriend, setRemovingFriend] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Fetch friends and friend requests
  const fetchFriendsAndRequests = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };
  
  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    try {
      const res = await userAPI.searchUsers(searchQuery);
      setSearchResults(res.data.data);
    } catch (err) {
      console.error('Error searching users:', err);
    } finally {
      setSearching(false);
    }
  };
  
  // Send friend request
  const sendFriendRequest = async (username) => {
    setSubmittingRequest(true);
    try {
      await userAPI.sendFriendRequest(username);
      // Update search results to show pending status
      setSearchResults(results => 
        results.map(user => 
          user.username === username 
            ? { ...user, requestSent: true }
            : user
        )
      );
    } catch (err) {
      console.error('Error sending friend request:', err);
    } finally {
      setSubmittingRequest(false);
    }
  };
  
  // Respond to friend request
  const respondToRequest = async (userId, action) => {
    setRespondingToRequest(true);
    try {
      await userAPI.respondToFriendRequest(userId, action);
      // Remove the request from the list
      setFriendRequests(requests => 
        requests.filter(request => request.from._id !== userId)
      );
      
      // If accepted, refresh friends list
      if (action === 'accept') {
        const friendsRes = await userAPI.getFriends();
        setFriends(friendsRes.data.data);
      }
    } catch (err) {
      console.error('Error responding to friend request:', err);
    } finally {
      setRespondingToRequest(false);
    }
  };
  
  // Remove friend
  const removeFriend = async (friendId) => {
    setRemovingFriend(true);
    try {
      await userAPI.removeFriend(friendId);
      // Remove from friends list
      setFriends(friends => 
        friends.filter(friend => friend._id !== friendId)
      );
    } catch (err) {
      console.error('Error removing friend:', err);
    } finally {
      setRemovingFriend(false);
    }
  };
  
  // Open user profile page in a new tab
  const openUserProfile = (user) => {
    window.open(`/profile/${user.username}`, '_blank');
  };
  
  // Load data on component mount
  useEffect(() => {
    fetchFriendsAndRequests();
  }, []);
  
  // Determine if a user already has a pending request
  const hasPendingRequest = (username) => {
    return searchResults.some(user => 
      user.username === username && user.requestSent
    );
  };
  
  // Determine if a user is already a friend
  const isFriend = (userId) => {
    return friends.some(friend => friend._id === userId);
  };
  
  return (
    <FriendsContainer>
      <PageHeader>
        <PageTitle>Friends</PageTitle>
        <PageDescription>Connect with friends and see their daily highs and lows.</PageDescription>
      </PageHeader>
      
      <TabsContainer>
        <TabButton 
          active={activeTab === 'friends'} 
          onClick={() => setActiveTab('friends')}
        >
          <FiUsers />
          Friends ({friends.length})
        </TabButton>
        
        <TabButton 
          active={activeTab === 'requests'} 
          onClick={() => setActiveTab('requests')}
        >
          <FiUserCheck />
          Requests
          {friendRequests.length > 0 && <Badge>{friendRequests.length}</Badge>}
        </TabButton>
        
        <TabButton 
          active={activeTab === 'find'} 
          onClick={() => setActiveTab('find')}
        >
          <FiUserPlus />
          Find Friends
        </TabButton>
      </TabsContainer>
      
      {activeTab === 'find' && (
        <SearchSection>
          <SearchForm onSubmit={handleSearch}>
            <Input
              placeholder="Search by username or name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<FiSearch />}
              fullWidth
            />
            <Button 
              type="submit" 
              disabled={!searchQuery.trim() || searching}
              loading={searching}
            >
              Search
            </Button>
          </SearchForm>
          
          <SearchResults>
            {searchResults.length === 0 ? (
              <EmptyState>
                <FiSearch size={48} />
                <p>Search for users to add as friends.</p>
              </EmptyState>
            ) : (
              searchResults.map(user => (
                <UserCard key={user._id}>
                  <UserCardHeader>
                    <UserAvatar>
                      {user.profilePictureUrl ? (
                        <img src={user.profilePictureUrl} alt={user.name} />
                      ) : (
                        <FiUser />
                      )}
                    </UserAvatar>
                    <UserInfo>
                      <UserName>{user.name}</UserName>
                      <Username>@{user.username}</Username>
                    </UserInfo>
                  </UserCardHeader>
                  <CardFooter>
                    <Button 
                      variant="outline"
                      size="small"
                      onClick={() => openUserProfile(user)}
                    >
                      View Profile
                    </Button>
                    
                    {!isFriend(user._id) ? (
                      <Button 
                        size="small"
                        disabled={hasPendingRequest(user.username) || submittingRequest}
                        onClick={() => sendFriendRequest(user.username)}
                      >
                        {hasPendingRequest(user.username) ? 'Request Sent' : 'Add Friend'}
                      </Button>
                    ) : (
                      <Button 
                        variant="danger-outline"
                        size="small"
                        onClick={() => removeFriend(user._id)}
                        disabled={removingFriend}
                      >
                        Remove Friend
                      </Button>
                    )}
                  </CardFooter>
                </UserCard>
              ))
            )}
          </SearchResults>
        </SearchSection>
      )}
      
      {activeTab === 'requests' && (
        <RequestList>
          {friendRequests.length === 0 ? (
            <EmptyState>
              <FiUserCheck size={48} />
              <p>You don't have any friend requests right now.</p>
            </EmptyState>
          ) : (
            friendRequests.map(request => (
              <RequestCard key={request.from._id}>
                <UserCardHeader>
                  <UserAvatar>
                    {request.from.profilePictureUrl ? (
                      <img src={request.from.profilePictureUrl} alt={request.from.name} />
                    ) : (
                      <FiUser />
                    )}
                  </UserAvatar>
                  <UserInfo>
                    <UserName>{request.from.name}</UserName>
                    <Username>@{request.from.username}</Username>
                  </UserInfo>
                </UserCardHeader>
                <Card.Content>
                  <p style={{ color: theme.text.secondary, fontSize: typography.body.small }}>
                    Sent a friend request
                  </p>
                </Card.Content>
                <RequestActions>
                  <Button 
                    variant="danger-outline"
                    size="small"
                    onClick={() => respondToRequest(request.from._id, 'reject')}
                    disabled={respondingToRequest}
                  >
                    Decline
                  </Button>
                  <Button 
                    size="small"
                    onClick={() => respondToRequest(request.from._id, 'accept')}
                    disabled={respondingToRequest}
                  >
                    Accept
                  </Button>
                </RequestActions>
              </RequestCard>
            ))
          )}
        </RequestList>
      )}
      
      {activeTab === 'friends' && (
        <FriendList>
          {friends.length === 0 ? (
            <EmptyState>
              <FiUsers size={48} />
              <p>You haven't added any friends yet.</p>
              <Button 
                variant="outline"
                onClick={() => setActiveTab('find')}
              >
                Find Friends
              </Button>
            </EmptyState>
          ) : (
            friends.map(friend => (
              <UserCard key={friend._id}>
                <UserCardHeader>
                  <UserAvatar>
                    {friend.profilePictureUrl ? (
                      <img src={friend.profilePictureUrl} alt={friend.name} />
                    ) : (
                      <FiUser />
                    )}
                  </UserAvatar>
                  <UserInfo>
                    <UserName>{friend.name}</UserName>
                    <Username>@{friend.username}</Username>
                  </UserInfo>
                </UserCardHeader>
                <CardFooter>
                  <Button 
                    variant="outline"
                    size="small"
                    onClick={() => openUserProfile(friend)}
                  >
                    View Profile
                  </Button>
                  <Button 
                    variant="danger-outline"
                    size="small"
                    onClick={() => removeFriend(friend._id)}
                    disabled={removingFriend}
                  >
                    Remove Friend
                  </Button>
                </CardFooter>
              </UserCard>
            ))
          )}
        </FriendList>
      )}
    </FriendsContainer>
  );
};

export default Friends; 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiCalendar, FiUsers, FiActivity, FiEdit } from 'react-icons/fi';
import { theme, spacing, shadows, media, borderRadius, typography } from '../../assets/styles';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import logo from '../../assets/images/logo.png';
import { 
  HiOutlineHome, 
  HiOutlineViewGrid, 
  HiOutlineNewspaper, 
  HiOutlineCalendar, 
  HiOutlineUser, 
  HiOutlineCog, 
  HiOutlineLogout, 
  HiOutlineLogin, 
  HiOutlineUserAdd,
  HiX,
  HiMenu,
  HiOutlinePencil
} from 'react-icons/hi';
import { uploadAPI } from '../../data/api';

// Header container - updated for a more distinct header look
const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.sm} ${spacing.xl};
  background-color: white;
  border-bottom: 1px solid ${theme.border};
  position: sticky;
  top: 0;
  z-index: 100;
  height: 64px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px;
  width: 100%;
`;

// Header content wrapper for max-width and centering
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

// Logo container with better styling
const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  text-decoration: none;
  color: ${theme.text.primary};
  font-weight: 600;
  font-size: 1.25rem;
`;

// Logo image with better sizing
const Logo = styled.img`
  height: 32px;
  width: auto;
`;

// Logo text component
const LogoText = styled.span`
  font-weight: 600;
  color: ${theme.text.primary};
`;

// Navigation - updated for better spacing
const Nav = styled.nav`
  display: flex;
  
  ${media.tablet} {
    display: none;
  }
`;

// Mobile menu button
const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.text.primary};
  font-size: 1.5rem;
  cursor: pointer;
  
  ${media.tablet} {
    display: block;
  }
`;

// Mobile navigation
const MobileNav = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.background};
  z-index: 99;
  padding: ${spacing.md};
  transform: ${props => (props.isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease;
  overflow-y: auto;
  display: none;
  
  ${media.tablet} {
    display: block;
  }
`;

// Mobile navigation close button
const CloseButton = styled.button`
  position: absolute;
  top: ${spacing.md};
  right: ${spacing.md};
  background: none;
  border: none;
  color: ${theme.text.primary};
  font-size: 1.5rem;
  cursor: pointer;
`;

// Mobile navigation link container
const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  margin-top: ${spacing.xl};
`;

// Navigation link - updated for better visual hierarchy
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  color: ${theme.text.primary};
  font-weight: 500;
  text-decoration: none;
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.hover};
  }
  
  & svg {
    font-size: 1.25rem;
  }
`;

// User menu container
const UserMenu = styled.div`
  position: relative;
  cursor: pointer;
`;

// User menu button
const UserMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: ${spacing.xs} ${spacing.sm};
  background: none;
  border: none;
  border-radius: ${borderRadius.md};
  cursor: pointer;
  color: ${theme.text.primary};
  
  &:hover {
    background-color: ${theme.surface};
  }
`;

// User menu dropdown
const UserMenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: ${spacing.xs};
  background-color: ${theme.surface};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.md};
  overflow: hidden;
  width: 200px;
  z-index: 100;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transform: ${props => (props.isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition: all 0.2s ease;
`;

// User info in dropdown
const UserInfo = styled.div`
  padding: ${spacing.md};
  border-bottom: 1px solid ${theme.border};
  text-align: center;
`;

// User name
const UserName = styled.div`
  font-weight: 600;
  color: ${theme.text.primary};
`;

// User email
const UserEmail = styled.div`
  font-size: 0.9rem;
  color: ${theme.text.secondary};
`;

// Dropdown menu items
const DropdownMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.text.primary};
  
  &:hover {
    background-color: ${theme.surface};
  }
  
  &.danger {
    color: ${theme.danger};
  }
`;

// Mobile optimized dropdown content
const UserDropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacing.xs} 0;
  
  ${media.mobile} {
    padding: ${spacing.sm} 0;
  }
`;

// Mobile menu content with improved spacing
const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  padding: ${spacing.md} 0;
  
  ${media.mobile} {
    gap: ${spacing.sm};
    padding: ${spacing.sm} 0;
  }
`;

// Mobile nav button with consistent styling
const MobileNavButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  justify-content: flex-start;
  padding: ${spacing.md};
  font-size: 1rem;
  
  ${media.mobile} {
    padding: ${spacing.sm} ${spacing.md};
    font-size: 0.9rem;
  }
  
  & svg {
    font-size: 1.25rem;
  }
`;

// NavLinks container for desktop navigation
const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.lg};
  
  ${media.desktop} {
    gap: ${spacing.xl};
  }
  
  ${media.tablet} {
    flex-direction: column;
    gap: ${spacing.md};
  }
`;

// User section
const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

// User avatar
const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${theme.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.text.primary};
  font-size: 1.25rem;
  font-weight: 600;
`;

// Auth buttons
const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

// Mobile menu button
const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.text.primary};
  font-size: 1.5rem;
  cursor: pointer;
  
  ${media.tablet} {
    display: block;
  }
`;

// User menu item
const UserMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  color: ${theme.text.primary};
  text-decoration: none;
  transition: background-color 0.2s ease;
  font-weight: 500;
  
  &:hover {
    background-color: ${theme.hover};
  }
  
  &[as="button"] {
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
  }
`;

// Profile form container
const ProfileFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

// Form group
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

// Form label
const FormLabel = styled.label`
  font-weight: ${typography.fontWeight.medium};
  color: ${theme.text.secondary};
`;

// Profile image upload
const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

// Profile image preview
const ImagePreview = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${borderRadius.circle};
  background-color: ${theme.surface};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
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

// Upload button wrapper
const UploadButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

// Upload input
const UploadInput = styled.input`
  display: none;
`;

// Checkbox wrapper
const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  margin-top: ${spacing.xs};
`;

// Checkbox input
const CheckboxInput = styled.input`
  margin: 0;
`;

// Checkbox label
const CheckboxLabel = styled.label`
  color: ${theme.text.secondary};
  font-size: ${typography.body.small};
`;

// Form footer
const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing.sm};
  margin-top: ${spacing.md};
`;

// Status message component
const StatusMessage = styled.div`
  padding: ${spacing.sm};
  margin-top: ${spacing.md};
  border-radius: ${borderRadius.md};
  font-size: ${typography.body.small};
  background-color: ${props => props.isError ? 'rgba(255, 92, 92, 0.1)' : 'rgba(72, 187, 120, 0.1)'};
  color: ${props => props.isError ? theme.danger : theme.success};
`;

// Header component
const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    username: '',
    phoneNumber: '',
    receiveTexts: true
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ show: false, isError: false, text: '' });
  
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  
  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Close mobile menu after navigation
  const handleNavigation = (path) => {
    setMobileNavOpen(false);
    navigate(path);
  };
  
  // Open profile edit modal
  const handleOpenProfileModal = () => {
    setUserMenuOpen(false);
    // Reset status message
    setStatusMessage({ show: false, isError: false, text: '' });
    // Initialize form with current user data
    setProfileForm({
      name: user?.name || '',
      username: user?.username || '',
      phoneNumber: user?.phoneNumber || '',
      receiveTexts: true // Default to true
    });
    setProfileImagePreview(user?.profilePictureUrl || null);
    setIsProfileModalOpen(true);
  };
  
  // Handle profile form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle profile image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Reset status message
    setStatusMessage({ show: false, isError: false, text: '' });
    
    try {
      // First upload image if selected
      let profileImageUrl = user?.profilePictureUrl;
      
      if (profileImage) {
        try {
          const formData = new FormData();
          formData.append('image', profileImage);
          
          const imageRes = await uploadAPI.uploadImage(formData, 'profile');
          profileImageUrl = imageRes.data.data.url;
        } catch (uploadError) {
          console.error('Failed to upload image:', uploadError);
          setStatusMessage({
            show: true,
            isError: true,
            text: 'Failed to upload image. Please try again with a smaller image or different format.'
          });
          setIsSubmitting(false);
          return;
        }
      }
      
      // Update user profile
      await updateProfile({
        ...profileForm,
        profilePictureUrl: profileImageUrl
      });
      
      // Show success message
      setStatusMessage({
        show: true,
        isError: false,
        text: 'Profile updated successfully!'
      });
      
      // Close modal after 1.5 seconds
      setTimeout(() => {
        setIsProfileModalOpen(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setStatusMessage({
        show: true,
        isError: true,
        text: 'Failed to update profile. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer to="/">
          <Logo src={logo} alt="Handl" />
          <LogoText>Handl</LogoText>
        </LogoContainer>
        
        <Nav>
          <NavLinks>
            {isAuthenticated && (
              <>
                <NavLink to="/dashboard">
                  <HiOutlineViewGrid />
                  Dashboard
                </NavLink>
                
                <NavLink to="/feed">
                  <HiOutlineNewspaper />
                  Feed
                </NavLink>
                
                <NavLink to="/friends">
                  <HiOutlineUser />
                  Friends
                </NavLink>
                
                <NavLink to="/calendar">
                  <HiOutlineCalendar />
                  Calendar
                </NavLink>
              </>
            )}
          </NavLinks>
        </Nav>
        
        <UserSection>
          {isAuthenticated ? (
            <UserMenu onClick={toggleUserMenu}>
              <UserAvatar>
                {user?.name?.charAt(0) || 'U'}
              </UserAvatar>
              
              <UserMenuDropdown isOpen={userMenuOpen}>
                <UserDropdownContent>
                  <UserMenuItem to={`/profile/${user?.username}`} onClick={() => setUserMenuOpen(false)}>
                    <HiOutlineUser />
                    Profile
                  </UserMenuItem>
                  <UserMenuItem as="button" onClick={handleOpenProfileModal}>
                    <HiOutlinePencil />
                    Edit Profile
                  </UserMenuItem>
                  <UserMenuItem as="button" onClick={() => {
                    setUserMenuOpen(false);
                    handleLogout();
                  }}>
                    <HiOutlineLogout />
                    Logout
                  </UserMenuItem>
                </UserDropdownContent>
              </UserMenuDropdown>
            </UserMenu>
          ) : (
            // Only show auth buttons on desktop, not mobile
            <Nav>
              <AuthButtons>
                <Button as={Link} to="/login" variant="text">
                  Login
                </Button>
                <Button as={Link} to="/register" variant="primary">
                  Sign Up
                </Button>
              </AuthButtons>
            </Nav>
          )}
          
          <MobileMenuButton onClick={toggleMobileNav}>
            {mobileNavOpen ? <HiX /> : <HiMenu />}
          </MobileMenuButton>
        </UserSection>
      </HeaderContent>
      
      <MobileNav isOpen={mobileNavOpen}>
        <MobileMenuContent>
          {isAuthenticated ? (
            <>
              <MobileNavButton as="button" onClick={() => handleNavigation('/dashboard')} variant="text">
                <HiOutlineViewGrid />
                Dashboard
              </MobileNavButton>
              
              <MobileNavButton as="button" onClick={() => handleNavigation('/feed')} variant="text">
                <HiOutlineNewspaper />
                Feed
              </MobileNavButton>
              
              <MobileNavButton as="button" onClick={() => handleNavigation('/friends')} variant="text">
                <HiOutlineUser />
                Friends
              </MobileNavButton>
              
              <MobileNavButton as="button" onClick={() => handleNavigation('/calendar')} variant="text">
                <HiOutlineCalendar />
                Calendar
              </MobileNavButton>
              
              <MobileNavButton as="button" onClick={() => handleNavigation(`/profile/${user?.username}`)} variant="text">
                <HiOutlineUser />
                Profile
              </MobileNavButton>
              
              <MobileNavButton as="button" onClick={() => {
                setMobileNavOpen(false);
                handleOpenProfileModal();
              }} variant="text">
                <HiOutlinePencil />
                Edit Profile
              </MobileNavButton>
              
              <MobileNavButton as="button" variant="text" onClick={() => {
                setMobileNavOpen(false);
                handleLogout();
              }}>
                <HiOutlineLogout />
                Logout
              </MobileNavButton>
            </>
          ) : (
            <>
              <MobileNavButton as="button" onClick={() => handleNavigation('/login')} variant="text">
                <HiOutlineLogin />
                Login
              </MobileNavButton>
              
              <MobileNavButton as="button" onClick={() => handleNavigation('/register')} variant="primary">
                <HiOutlineUserAdd />
                Sign Up
              </MobileNavButton>
            </>
          )}
        </MobileMenuContent>
      </MobileNav>
      
      {/* Profile Edit Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => !isSubmitting && setIsProfileModalOpen(false)}
        title="Edit Profile"
        size="md"
        actions={
          <>
            <Button 
              variant="outline"
              onClick={() => setIsProfileModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleProfileSubmit}
              loading={isSubmitting}
            >
              Save Changes
            </Button>
          </>
        }
      >
        <ProfileFormContainer onSubmit={handleProfileSubmit}>
          <ImageUploadContainer>
            <ImagePreview>
              {profileImagePreview ? (
                <img src={profileImagePreview} alt="Profile Preview" />
              ) : (
                <FiUser />
              )}
            </ImagePreview>
            
            <UploadButtonWrapper>
              <label htmlFor="profile-image">
                <Button 
                  as="span" 
                  variant="outline" 
                  size="small"
                  type="button"
                >
                  Choose Image
                </Button>
              </label>
              <UploadInput
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <span style={{ fontSize: typography.body.small, color: theme.text.secondary }}>
                Max size: 5MB
              </span>
            </UploadButtonWrapper>
          </ImageUploadContainer>
          
          <FormGroup>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              name="name"
              value={profileForm.name}
              onChange={handleInputChange}
              placeholder="Your name"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              name="username"
              value={profileForm.username}
              onChange={handleInputChange}
              placeholder="Your username"
              disabled
            />
            <span style={{ fontSize: typography.body.small, color: theme.text.secondary }}>
              Username cannot be changed
            </span>
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={profileForm.phoneNumber}
              onChange={handleInputChange}
              placeholder="Your phone number"
            />
            
            <CheckboxWrapper>
              <CheckboxInput
                id="receiveTexts"
                name="receiveTexts"
                type="checkbox"
                checked={profileForm.receiveTexts}
                onChange={handleInputChange}
              />
              <CheckboxLabel htmlFor="receiveTexts">
                Receive text reminders to fill out daily entries
              </CheckboxLabel>
            </CheckboxWrapper>
          </FormGroup>
          
          {statusMessage.show && (
            <StatusMessage isError={statusMessage.isError}>
              {statusMessage.text}
            </StatusMessage>
          )}
        </ProfileFormContainer>
      </Modal>
    </HeaderContainer>
  );
};

export default Header; 
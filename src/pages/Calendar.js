import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore } from 'date-fns';
import { FiChevronLeft, FiChevronRight, FiEdit2, FiEye } from 'react-icons/fi';
import { theme, spacing, typography, media, borderRadius, shadows } from '../assets/styles';
import { daysAPI } from '../data/api';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import DayForm from '../components/days/DayForm';
import DayView from '../components/days/DayView';

// Calendar container
const CalendarContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.md};
  
  ${media.mobile} {
    padding: ${spacing.sm};
  }
`;

// Calendar header
const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.lg};
  
  ${media.mobile} {
    flex-direction: column;
    gap: ${spacing.md};
    align-items: center;
    margin-bottom: ${spacing.md};
    
    h1 {
      font-size: ${typography.heading[3]};
      margin-bottom: 0;
    }
  }
`;

// Month navigation
const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

// Month title
const MonthTitle = styled.h2`
  font-size: ${typography.heading[2]};
  font-weight: ${typography.fontWeight.semibold};
  margin: 0;
  min-width: 200px;
  text-align: center;
`;

// Nav button
const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${theme.border};
  background: white;
  color: ${theme.text.primary};
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${theme.surface};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Calendar grid
const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${spacing.sm};
  
  ${media.mobile} {
    gap: ${spacing.xs};
  }
`;

// Calendar day name header
const DayName = styled.div`
  text-align: center;
  font-weight: ${typography.fontWeight.medium};
  color: ${theme.text.secondary};
  padding: ${spacing.sm} 0;
  
  ${media.mobile} {
    font-size: ${typography.body.small};
    padding: ${spacing.xs} 0;
  }
`;

// Calendar day
const Day = styled.div`
  aspect-ratio: 1;
  border: 1px solid ${props => 
    props.isToday ? theme.primary : 
    props.isSelected ? theme.primary : 
    theme.border};
  border-radius: ${borderRadius.md};
  padding: ${spacing.sm};
  display: flex;
  flex-direction: column;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  position: relative;
  background-color: ${props => 
    props.hasEntry ? 'rgba(46, 117, 204, 0.05)' : 
    props.isToday ? 'rgba(46, 117, 204, 0.02)' : 
    'white'};
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.disabled ? theme.border : theme.primary};
    box-shadow: ${props => props.disabled ? 'none' : shadows.sm};
  }
  
  ${media.mobile} {
    padding: ${spacing.xs};
    min-height: 40px;
  }
`;

// Day date
const DayDate = styled.div`
  font-size: ${typography.body.medium};
  font-weight: ${props => props.isToday ? typography.fontWeight.bold : typography.fontWeight.regular};
  color: ${props => props.isToday ? theme.primary : theme.text.primary};
  margin-bottom: ${spacing.xs};
  
  ${media.mobile} {
    font-size: ${typography.body.small};
    margin-bottom: 2px;
  }
`;

// Day score
const DayScore = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
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
  font-weight: ${typography.fontWeight.bold};
  font-size: ${typography.body.small};
  
  ${media.mobile} {
    height: 24px;
    width: 24px;
    font-size: ${typography.body.xsmall};
  }
`;

// Action buttons for each day entry
const DayActions = styled.div`
  position: absolute;
  top: ${spacing.xs};
  right: ${spacing.xs};
  display: flex;
  gap: ${spacing.xs};
  
  ${media.mobile} {
    opacity: 0;
    top: auto;
    right: auto;
    bottom: 2px;
    left: 2px;
    width: calc(100% - 4px);
    justify-content: space-around;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: ${borderRadius.sm};
    padding: 2px;
    
    ${Day}:active & {
      opacity: 1;
    }
  }
`;

// Action button
const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(55, 53, 47, 0.08);
  border: none;
  color: ${theme.text.secondary};
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: rgba(55, 53, 47, 0.16);
    color: ${theme.text.primary};
  }
  
  ${media.mobile} {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }
`;

// Calendar component
const Calendar = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  
  // Get the days for the current month
  const firstDay = startOfMonth(currentDate);
  const lastDay = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });
  
  // Get weekday names
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Fetch entries from the API
  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await daysAPI.getDays({
        start: format(firstDay, 'yyyy-MM-dd'),
        end: format(lastDay, 'yyyy-MM-dd'),
        limit: 31 // Max days in a month
      });
      setEntries(res.data.data);
    } catch (err) {
      console.error('Error fetching entries:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    // Only allow navigation to future months up to the current month
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    if (isBefore(nextMonth, new Date()) || isSameDay(nextMonth, new Date(new Date().getFullYear(), new Date().getMonth(), 1))) {
      setCurrentDate(nextMonth);
    }
  };
  
  // Handle day click
  const handleDayClick = (day) => {
    // Don't allow selecting future dates
    if (isBefore(day, new Date()) || isToday(day)) {
      setSelectedDay(day);
      
      // Check if there's an entry for this day
      const entry = entries.find(entry => 
        isSameDay(new Date(entry.date), day)
      );
      
      if (entry) {
        setSelectedEntry(entry);
        setIsViewModalOpen(true);
      } else {
        setSelectedEntry(null);
        setIsFormModalOpen(true);
      }
    }
  };
  
  // Handle edit entry
  const handleEditEntry = () => {
    setIsViewModalOpen(false);
    setIsFormModalOpen(true);
  };
  
  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      if (selectedEntry) {
        // Update existing entry
        await daysAPI.updateDay(selectedEntry._id, formData);
      } else {
        // Create new entry
        await daysAPI.createDay({
          ...formData,
          date: selectedDay
        });
      }
      
      setIsFormModalOpen(false);
      fetchEntries();
    } catch (err) {
      console.error('Error saving entry:', err);
    }
  };
  
  // Handle delete entry
  const handleDeleteEntry = async () => {
    try {
      await daysAPI.deleteDay(selectedEntry._id);
      setIsViewModalOpen(false);
      fetchEntries();
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };
  
  // Load entries when the current month changes
  useEffect(() => {
    fetchEntries();
  }, [currentDate]);
  
  return (
    <CalendarContainer>
      <CalendarHeader>
        <h1>Calendar</h1>
        <MonthNavigation>
          <NavButton onClick={goToPreviousMonth}>
            <FiChevronLeft />
          </NavButton>
          <MonthTitle>
            {format(currentDate, 'MMMM yyyy')}
          </MonthTitle>
          <NavButton 
            onClick={goToNextMonth}
            disabled={currentDate.getMonth() === new Date().getMonth() && 
                     currentDate.getFullYear() === new Date().getFullYear()}
          >
            <FiChevronRight />
          </NavButton>
        </MonthNavigation>
      </CalendarHeader>
      
      <Card elevation="flat">
        <CalendarGrid>
          {/* Weekday headers */}
          {weekdays.map(weekday => (
            <DayName key={weekday}>{media.isMobile ? weekday.charAt(0) : weekday}</DayName>
          ))}
          
          {/* Empty cells for days before the first day of the month */}
          {Array.from({ length: firstDay.getDay() }).map((_, index) => (
            <div key={`empty-start-${index}`} />
          ))}
          
          {/* Days of the month */}
          {daysInMonth.map(day => {
            const dayDate = day.getDate();
            const isCurrentDay = isToday(day);
            const isFutureDay = !isBefore(day, new Date()) && !isCurrentDay;
            const entry = entries.find(entry => 
              isSameDay(new Date(entry.date), day)
            );
            
            return (
              <Day 
                key={dayDate}
                isToday={isCurrentDay}
                disabled={isFutureDay}
                hasEntry={!!entry}
                onClick={() => !isFutureDay && handleDayClick(day)}
              >
                <DayDate isToday={isCurrentDay}>
                  {dayDate}
                </DayDate>
                
                {entry && (
                  <>
                    <DayScore score={entry.score}>
                      {entry.score}
                    </DayScore>
                    <DayActions>
                      <ActionButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEntry(entry);
                          setIsViewModalOpen(true);
                        }}
                      >
                        <FiEye />
                      </ActionButton>
                      <ActionButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEntry(entry);
                          setSelectedDay(day);
                          setIsFormModalOpen(true);
                        }}
                      >
                        <FiEdit2 />
                      </ActionButton>
                    </DayActions>
                  </>
                )}
              </Day>
            );
          })}
          
          {/* Empty cells for days after the last day of the month */}
          {Array.from({ length: 6 - lastDay.getDay() }).map((_, index) => (
            <div key={`empty-end-${index}`} />
          ))}
        </CalendarGrid>
      </Card>
      
      {/* View Modal */}
      {selectedEntry && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={format(new Date(selectedEntry.date), 'MMMM d, yyyy')}
          actions={
            <>
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
              <Button onClick={handleEditEntry}>
                Edit
              </Button>
              <Button variant="danger" onClick={handleDeleteEntry}>
                Delete
              </Button>
            </>
          }
        >
          <DayView entry={selectedEntry} />
        </Modal>
      )}
      
      {/* Form Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={selectedEntry ? 'Edit Entry' : 'New Entry'}
        size="lg"
      >
        <DayForm 
          initialData={selectedEntry}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormModalOpen(false)}
          date={selectedDay}
        />
      </Modal>
    </CalendarContainer>
  );
};

export default Calendar; 
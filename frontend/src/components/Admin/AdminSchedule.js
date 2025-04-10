import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminSchedule.css';

const AdminSchedule = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [adminName, setAdminName] = useState('');
  const [timeSlots, setTimeSlots] = useState([
    { time: '08:45 - 10:15', checked: false },
    { time: '10:15 - 11:00', checked: false },
    { time: '11:00 - 11:30', checked: false, isBreak: true },
    { time: '11:30 - 12:15', checked: false },
    { time: '12:15 - 13:45', checked: false },
    { time: '13:45 - 14:30', checked: false, isBreak: true },
    { time: '14:30 - 16:45', checked: false }
  ]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    // Get faculty name from local storage
    const facultyName = localStorage.getItem('adminName');
    if (facultyName) {
      setAdminName(facultyName);
      loadSchedule(facultyName, selectedDay);
    }
  }, [selectedDay]);

  const loadSchedule = async (facultyName, day) => {
    try {
      const response = await axios.get(`http://localhost:5000/get-schedule`, {
        params: {
          facultyName,
          day
        }
      });

      if (response.data.success) {
        const availableSlots = response.data.schedule;
        
        // Update timeSlots based on available slots from backend
        setTimeSlots(prevSlots => 
          prevSlots.map(slot => ({
            ...slot,
            checked: availableSlots.includes(slot.time)
          }))
        );
      }
    } catch (error) {
      console.error('Error loading schedule:', error);
      alert('Failed to load schedule. Please try again.');
    }
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleTimeSlotChange = (index) => {
    setTimeSlots(prevSlots => {
      const newSlots = [...prevSlots];
      if (!newSlots[index].isBreak) {
        newSlots[index] = {
          ...newSlots[index],
          checked: !newSlots[index].checked
        };
      }
      return newSlots;
    });
  };

  const handleUpdateSchedule = async () => {
    try {
      const availableSlots = timeSlots
        .filter(slot => slot.checked && !slot.isBreak)
        .map(slot => slot.time);

      const response = await axios.post('http://localhost:5000/update-schedule', {
        facultyName: adminName,
        day: selectedDay,
        availableSlots
      });

      if (response.data.success) {
        alert('Schedule updated successfully!');
        // Reload the schedule to ensure we display the latest data
        loadSchedule(adminName, selectedDay);
      } else {
        alert('Failed to update schedule. Please try again.');
      }
    } catch (error) {
      console.error('Error updating schedule:', error);
      alert('Failed to update schedule. Please try again.');
    }
  };

  return (
    <div className="admin-schedule-container">
      <h2>Schedule Management</h2>
      <h3>Faculty: {adminName}</h3>
      
      <div className="schedule-form">
        <div className="day-select">
          <label>Select Day:</label>
          <select value={selectedDay} onChange={handleDayChange}>
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div className="time-slots">
          <h4>Available Time Slots:</h4>
          {timeSlots.map((slot, index) => (
            <div key={index} className={`time-slot ${slot.isBreak ? 'break' : ''}`}>
              <label>
                <input
                  type="checkbox"
                  checked={slot.checked}
                  onChange={() => handleTimeSlotChange(index)}
                  disabled={slot.isBreak}
                />
                {slot.time} {slot.isBreak && '(Break)'}
              </label>
            </div>
          ))}
        </div>

        <button 
          className="update-button"
          onClick={handleUpdateSchedule}
          disabled={!adminName}
        >
          Update Schedule
        </button>
      </div>
    </div>
  );
};

export default AdminSchedule; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FacultyInfo.css';

function FacultyInfo() {
  const [facultySchedule, setFacultySchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFacultyTable, setShowFacultyTable] = useState(false);
  const [formData, setFormData] = useState({
    selectedDay: '',
    facultyName: '',
    selectedTime: '08:45'
  });
  const [availabilityInfo, setAvailabilityInfo] = useState(null);

  const facultyRooms = {
    'chetana srinivas': { block: 'B BLOCK', room: '312' },
    'pawan': { block: 'B BLOCK', room: '421' },
    'prakash': { block: 'B BLOCK', room: '113' },
    'nage gowda': { block: 'B BLOCK', room: '415' },
    'manikandan': { block: 'B BLOCK', room: '216' },
    'anuradha': { block: 'B BLOCK', room: '324' },
    'chandar': { block: 'B BLOCK', room: '428' },
    'nirmala': { block: 'B BLOCK', room: '119' },
    'rajeshwari': { block: 'B BLOCK', room: '425' },
    'divyashree': { block: 'B BLOCK', room: '218' },
    'likhita': { block: 'B BLOCK', room: '316' },
    'suresh': { block: 'B BLOCK', room: '412' },
    'mahesh': { block: 'B BLOCK', room: '223' },
    'kavitha': { block: 'B BLOCK', room: '427' },
    'venkatesh': { block: 'B BLOCK', room: '117' },
    'ramesh': { block: 'B BLOCK', room: '423' },
    'lakshmi': { block: 'B BLOCK', room: '220' },
    'sudha': { block: 'B BLOCK', room: '314' },
    'ganesh': { block: 'B BLOCK', room: '419' },
    'harini': { block: 'B BLOCK', room: '225' },
    'shanthi': { block: 'B BLOCK', room: '115' },
    'satish': { block: 'B BLOCK', room: '221' },
    'yashwanth': { block: 'B BLOCK', room: '410' },
    'neelima': { block: 'B BLOCK', room: '318' },
    'raghav': { block: 'B BLOCK', room: '417' }
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const timeSlots = [
    { time: 'NULL', label: 'Show All Slots' },
    { time: '08:45', label: '08:45 - 10:15' },
    { time: '10:15', label: '10:15 - 11:00' },
    { time: '11:00', label: '11:00 - 11:30 (Break Time)' },
    { time: '11:30', label: '11:30 - 12:15' },
    { time: '12:15', label: '12:15 - 13:45' },
    { time: '13:45', label: '13:45 - 14:30 (Lunch Break)' },
    { time: '14:30', label: '14:30 - 16:45' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setAvailabilityInfo(null);
    setError(null);
  };

  const isBreakTime = (time) => {
    return time === '11:00' || time === '13:45';
  };

  const fetchFacultySchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:5000/faculty-info`, {
        params: {
          name: formData.facultyName,
          day: formData.selectedDay
        }
      });
      
      const scheduleData = Array.isArray(response.data) ? response.data : [];
      setFacultySchedule(scheduleData);
    } catch (err) {
      console.error('Error fetching schedule:', err);
      setError(err.response?.data?.reason || 'Error fetching faculty schedule');
      setFacultySchedule([]);
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (formData.selectedTime === 'NULL') {
        // If NULL is selected, fetch all slots for the day
        const response = await axios.get(`http://localhost:5000/faculty-info`, {
          params: {
            name: formData.facultyName,
            day: formData.selectedDay
          }
        });
        setFacultySchedule(Array.isArray(response.data) ? response.data : []);
        setAvailabilityInfo(null);
      } else {
        // For specific time slot check
        const response = await axios.get(`http://localhost:5000/faculty-info`, {
          params: {
            name: formData.facultyName,
            day: formData.selectedDay,
            time: formData.selectedTime
          }
        });
        setAvailabilityInfo(response.data);
        setFacultySchedule([]);
      }
    } catch (err) {
      console.error('Error checking availability:', err);
      setError(err.response?.data?.reason || 'Error checking faculty availability');
      setAvailabilityInfo(null);
      setFacultySchedule([]);
    } finally {
      setLoading(false);
    }
  };

  const getAvailabilityMessage = () => {
    if (!availabilityInfo) return null;

    if (isBreakTime(formData.selectedTime)) {
      return {
        message: 'BREAK TIME',
        className: 'break-time'
      };
    }

    if (availabilityInfo.available) {
      const facultyName = formData.facultyName.toLowerCase().trim();
      let roomInfo = null;
      
      // Check for partial matches
      if (facultyName.includes('chetana') || facultyName.includes('srinivas')) {
        roomInfo = facultyRooms['chetana srinivas'];
      } else if (facultyName.includes('pawan')) {
        roomInfo = facultyRooms['pawan'];
      } else if (facultyName.includes('prakash')) {
        roomInfo = facultyRooms['prakash'];
      } else if (facultyName.includes('nage') || facultyName.includes('gowda')) {
        roomInfo = facultyRooms['nage gowda'];
      } else if (facultyName.includes('manikandan')) {
        roomInfo = facultyRooms['manikandan'];
      } else if (facultyName.includes('anuradha')) {
        roomInfo = facultyRooms['anuradha'];
      } else if (facultyName.includes('chandar')) {
        roomInfo = facultyRooms['chandar'];
      } else if (facultyName.includes('nirmala')) {
        roomInfo = facultyRooms['nirmala'];
      } else if (facultyName.includes('rajeshwari')) {
        roomInfo = facultyRooms['rajeshwari'];
      } else if (facultyName.includes('divyashree')) {
        roomInfo = facultyRooms['divyashree'];
      } else if (facultyName.includes('likhita')) {
        roomInfo = facultyRooms['likhita'];
      } else if (facultyName.includes('suresh')) {
        roomInfo = facultyRooms['suresh'];
      } else if (facultyName.includes('mahesh')) {
        roomInfo = facultyRooms['mahesh'];
      } else if (facultyName.includes('kavitha')) {
        roomInfo = facultyRooms['kavitha'];
      } else if (facultyName.includes('venkatesh')) {
        roomInfo = facultyRooms['venkatesh'];
      } else if (facultyName.includes('ramesh')) {
        roomInfo = facultyRooms['ramesh'];
      } else if (facultyName.includes('lakshmi')) {
        roomInfo = facultyRooms['lakshmi'];
      } else if (facultyName.includes('sudha')) {
        roomInfo = facultyRooms['sudha'];
      } else if (facultyName.includes('ganesh')) {
        roomInfo = facultyRooms['ganesh'];
      } else if (facultyName.includes('harini')) {
        roomInfo = facultyRooms['harini'];
      } else if (facultyName.includes('shanthi')) {
        roomInfo = facultyRooms['shanthi'];
      } else if (facultyName.includes('satish')) {
        roomInfo = facultyRooms['satish'];
      } else if (facultyName.includes('yashwanth')) {
        roomInfo = facultyRooms['yashwanth'];
      } else if (facultyName.includes('neelima')) {
        roomInfo = facultyRooms['neelima'];
      } else if (facultyName.includes('raghav')) {
        roomInfo = facultyRooms['raghav'];
      }

      const locationInfo = roomInfo ? `\n${roomInfo.block}, Room No. ${roomInfo.room}` : '';
      
      return {
        message: `AVAILABLE FOR CONSULTATION${locationInfo}`,
        className: 'available'
      };
    }

    return {
      message: availabilityInfo.reason || 'NOT AVAILABLE',
      className: 'busy'
    };
  };

  const renderScheduleGrid = () => {
    if (loading) {
      return <div className="loading-message">Loading schedule...</div>;
    }

    if (!availabilityInfo || !formData.facultyName || !formData.selectedDay) {
      return null;
    }

    return (
      <div className="schedule-grid">
        <h2>Schedule for {formData.facultyName} on {formData.selectedDay}</h2>
        <div className="schedule-header">
          <div>Time</div>
          <div>Reason</div>
        </div>
        {facultySchedule.length > 0 ? (
          facultySchedule.map((schedule, index) => (
            <div key={index} className={`schedule-row ${schedule.isAvailable ? 'available' : 'busy'}`}>
              <div>{schedule.time}</div>
              <div>{schedule.reason}</div>
            </div>
          ))
        ) : (
          <div className="schedule-row empty">
            <div>No schedule information available</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="faculty-info-container">
      <h1 className="faculty-info-title">Faculty Schedule</h1>
      
      <form onSubmit={checkAvailability} className="availability-form">
        <div className="form-group">
          <label htmlFor="selectedDay">Select Day:</label>
          <select
            id="selectedDay"
            name="selectedDay"
            value={formData.selectedDay}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a day</option>
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="facultyName">Faculty Name:</label>
          <input
            type="text"
            id="facultyName"
            name="facultyName"
            value={formData.facultyName}
            onChange={handleInputChange}
            placeholder="Enter faculty name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="selectedTime">Select Time:</label>
          <select
            id="selectedTime"
            name="selectedTime"
            value={formData.selectedTime}
            onChange={handleInputChange}
            required
          >
            {timeSlots.map(({ time, label }) => (
              <option key={time} value={time} className={isBreakTime(time) ? 'break-time' : ''}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Checking...' : 'Check Availability'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      
      {formData.selectedTime !== 'NULL' && availabilityInfo && (
        <div className={`availability-result ${availabilityInfo.available ? 'available' : 'busy'}`}>
          <div className="availability-message">
            {availabilityInfo.available ? (
              <>
                <div>AVAILABLE FOR CONSULTATION</div>
                {(() => {
                  const facultyName = formData.facultyName.toLowerCase();
                  if (facultyName.includes('chetana') || facultyName.includes('srinivas')) {
                    return (
                      <>
                        <div>B BLOCK</div>
                        <div>Room No. 312</div>
                      </>
                    );
                  } else if (facultyName.includes('pawan')) {
                    return (
                      <>
                        <div>B BLOCK</div>
                        <div>Room No. 421</div>
                      </>
                    );
                  } else if (facultyName.includes('prakash')) {
                    return (
                      <>
                        <div>B BLOCK</div>
                        <div>Room No. 113</div>
                      </>
                    );
                  } else if (facultyName.includes('nage') || facultyName.includes('gowda')) {
                    return (
                      <>
                        <div>B BLOCK</div>
                        <div>Room No. 415</div>
                      </>
                    );
                  }
                  return null;
                })()}
              </>
            ) : (
              <div>{availabilityInfo.reason || 'NOT AVAILABLE'}</div>
            )}
          </div>
        </div>
      )}

      {formData.selectedTime === 'NULL' && facultySchedule.length > 0 && (
        <div className="schedule-grid">
          <h2>Available Slots for {formData.facultyName} on {formData.selectedDay}</h2>
          <div className="schedule-header">
            <div>Time</div>
            <div>Status</div>
          </div>
          {facultySchedule.map((schedule, index) => (
            <div key={index} className={`schedule-row ${schedule.isAvailable ? 'available' : 'busy'}`}>
              <div>{schedule.time}</div>
              <div>{schedule.isAvailable ? 'Available' : schedule.reason}</div>
            </div>
          ))}
        </div>
      )}

      <div className="faculty-table-section">
        <button 
          className="know-faculty-btn"
          onClick={() => {
            const facultyName = formData.facultyName.toLowerCase().trim();
            let roomInfo = null;
            
            // Check for partial matches
            if (facultyName.includes('chetana') || facultyName.includes('srinivas')) {
              roomInfo = facultyRooms['chetana srinivas'];
            } else if (facultyName.includes('pawan')) {
              roomInfo = facultyRooms['pawan'];
            } else if (facultyName.includes('prakash')) {
              roomInfo = facultyRooms['prakash'];
            } else if (facultyName.includes('nage') || facultyName.includes('gowda')) {
              roomInfo = facultyRooms['nage gowda'];
            } else if (facultyName.includes('manikandan')) {
              roomInfo = facultyRooms['manikandan'];
            } else if (facultyName.includes('anuradha')) {
              roomInfo = facultyRooms['anuradha'];
            } else if (facultyName.includes('chandar')) {
              roomInfo = facultyRooms['chandar'];
            } else if (facultyName.includes('nirmala')) {
              roomInfo = facultyRooms['nirmala'];
            } else if (facultyName.includes('rajeshwari')) {
              roomInfo = facultyRooms['rajeshwari'];
            } else if (facultyName.includes('divyashree')) {
              roomInfo = facultyRooms['divyashree'];
            } else if (facultyName.includes('likhita')) {
              roomInfo = facultyRooms['likhita'];
            } else if (facultyName.includes('suresh')) {
              roomInfo = facultyRooms['suresh'];
            } else if (facultyName.includes('mahesh')) {
              roomInfo = facultyRooms['mahesh'];
            } else if (facultyName.includes('kavitha')) {
              roomInfo = facultyRooms['kavitha'];
            } else if (facultyName.includes('venkatesh')) {
              roomInfo = facultyRooms['venkatesh'];
            } else if (facultyName.includes('ramesh')) {
              roomInfo = facultyRooms['ramesh'];
            } else if (facultyName.includes('lakshmi')) {
              roomInfo = facultyRooms['lakshmi'];
            } else if (facultyName.includes('sudha')) {
              roomInfo = facultyRooms['sudha'];
            } else if (facultyName.includes('ganesh')) {
              roomInfo = facultyRooms['ganesh'];
            } else if (facultyName.includes('harini')) {
              roomInfo = facultyRooms['harini'];
            } else if (facultyName.includes('shanthi')) {
              roomInfo = facultyRooms['shanthi'];
            } else if (facultyName.includes('satish')) {
              roomInfo = facultyRooms['satish'];
            } else if (facultyName.includes('yashwanth')) {
              roomInfo = facultyRooms['yashwanth'];
            } else if (facultyName.includes('neelima')) {
              roomInfo = facultyRooms['neelima'];
            } else if (facultyName.includes('raghav')) {
              roomInfo = facultyRooms['raghav'];
            }

            if (roomInfo) {
              setShowFacultyTable(true);
              setAvailabilityInfo({
                available: true,
                roomInfo: roomInfo
              });
            } else {
              setError('Faculty not found. Please enter a valid faculty name.');
            }
          }}
        >
          Know Your Faculty
        </button>

        {showFacultyTable && availabilityInfo?.roomInfo && (
          <div className="faculty-info-result">
            <div className="room-info">
              <div>Faculty: {formData.facultyName}</div>
              <div>Block: {availabilityInfo.roomInfo.block}</div>
              <div>Room No: {availabilityInfo.roomInfo.room}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FacultyInfo; 
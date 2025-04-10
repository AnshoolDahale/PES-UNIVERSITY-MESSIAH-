const mongoose = require('mongoose');

const timeSlots = [
  '08:45 - 10:15',
  '10:15 - 11:00',
  '11:00 - 11:30',  // Break Time
  '11:30 - 12:15',
  '12:15 - 13:45',
  '13:45 - 14:30',  // Lunch Break
  '14:30 - 16:45'
];

const facultyInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  schedules: [{
    day: {
      type: String,
      required: true,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    time: {
      type: String,
      required: true,
      enum: timeSlots
    },
    status: {
      type: String,
      required: true,
      enum: ['Busy', 'Available'],
      default: 'Busy'
    },
    reason: {
      type: String,
      default: ''  // e.g., "Class", "Meeting", "Research"
    }
  }],
  defaultAvailability: {
    type: Boolean,
    default: true  // true means faculty is generally available unless scheduled
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Helper method to check if faculty is available
facultyInfoSchema.methods.isAvailable = function(day, time) {
  // Break times are always unavailable for meetings
  if (time === '11:00 - 11:30' || time === '13:45 - 14:30') {
    return false;
  }

  const schedule = this.schedules.find(s => s.day === day && s.time === time);
  if (!schedule) {
    return this.defaultAvailability;
  }
  return schedule.status === 'Available';
};

module.exports = mongoose.model('FacultyInfo', facultyInfoSchema); 
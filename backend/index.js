const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
const FacultyInfo = require('./facultyInfoSchema');

app.use(cors());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection with better error handling
mongoose
  .connect("mongodb://localhost:27017/webtechnology", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    retryWrites: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    // Initialize faculty data after successful connection
    initializeFacultyData();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Initialize default faculty data if not exists
const initializeFacultyData = async () => {
  try {
    // First, clear existing data
    await FacultyInfo.deleteMany({});
    
    const timeSlots = [
      '08:45 - 10:15',
      '10:15 - 11:00',
      '11:30 - 12:15',
      '12:15 - 13:45',
      '14:30 - 16:45'
    ];

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const generateDefaultSchedules = (availableSlots = []) => {
      const schedules = [];
      days.forEach(day => {
        timeSlots.forEach(time => {
          // Check if this day and time combination is in the availableSlots array
          const isAvailableSlot = availableSlots.some(
            slot => slot.day === day && slot.time === time
          );

          schedules.push({
            day,
            time,
            isAvailable: isAvailableSlot,
            reason: isAvailableSlot ? 'Available for consultation' : 'Not Available'
          });
        });
      });
      return schedules;
    };

    // Define available slots for each faculty
    const drChetanaAvailableSlots = [
      { day: 'Monday', time: '08:45 - 10:15' },
      { day: 'Wednesday', time: '12:15 - 13:45' },
      { day: 'Friday', time: '14:30 - 16:45' },
      { day: 'Saturday', time: '10:15 - 11:00' },
      { day: 'Tuesday', time: '11:30 - 12:15' },
      { day: 'Thursday', time: '10:15 - 11:00'}

    ];

    const pawanAvailableSlots = [
      { day: 'Tuesday', time: '10:15 - 11:00' },
      { day: 'Thursday', time: '14:30 - 16:45' },
      { day: 'Monday', time: '11:30 - 12:15'},
      { day: 'Wednesday', time: '8:45 - 10:15'},
      { day: 'Friday', time: '10:15 - 11:00'},
      { day: 'Saturday', time: '14:30 - 16:45'},


    ];

    const prakashAvailableSlots = [
      { day: 'Monday', time: '14:30 - 16:45' },
      { day: 'Friday', time: '08:45 - 10:15' },
      { day: 'Tuesday', time: '10:15 - 11:00' },
      { day: 'Thursday', time: '12:15 - 13:45' },
      { day: 'Wednesday', time: '10:15 - 11:00' },
      { day: 'Friday', time: '12:15 - 13:45' },
      
    ];

    const nageGowdaAvailableSlots = [
      { day: 'Wednesday', time: '10:15 - 11:00' },
      { day: 'Friday', time: '12:15 - 13:45' },
      { day: 'Monday', time: '10:15 - 11:00' },
      { day: 'Wednesday', time: '12:15 - 13:45' },
      { day: 'Friday', time: '08:45 - 10:15' },
      { day: 'Tuesday', time: '10:15 - 11:00' },
      { day: 'Thursday', time: '12:15 - 13:45' },
      
    ];

    const manikandanAvailableSlots = [
      { day: 'Monday', time: '08:45 - 10:15' },
      { day: 'Tuesday', time: '10:15 - 11:00' },
      { day: 'Wednesday', time: '14:30 - 16:45' },
      { day: 'Thursday', time: '12:15 - 13:45' },
      { day: 'Friday', time: '08:45 - 10:15' },
      { day: 'Saturday', time: '10:15 - 11:00' }
    ];
    
    const anuradhaAvailableSlots = [
      { day: 'Tuesday', time: '08:45 - 10:15' },
      { day: 'Wednesday', time: '11:30 - 12:15' },
      { day: 'Friday', time: '12:15 - 13:45' },
      { day: 'Saturday', time: '14:30 - 16:45' },
      { day: 'Monday', time: '10:15 - 11:00' }
    ];
    
    const chandarAvailableSlots = [
      { day: 'Monday', time: '14:30 - 16:45' },
      { day: 'Tuesday', time: '11:30 - 12:15' },
      { day: 'Thursday', time: '08:45 - 10:15' },
      { day: 'Saturday', time: '12:15 - 13:45' },
      { day: 'Friday', time: '10:15 - 11:00' }
    ];
    
    const nirmalaAvailableSlots = [
      { day: 'Wednesday', time: '08:45 - 10:15' },
      { day: 'Friday', time: '10:15 - 11:00' },
      { day: 'Monday', time: '12:15 - 13:45' },
      { day: 'Thursday', time: '14:30 - 16:45' },
      { day: 'Tuesday', time: '11:30 - 12:15' }
    ];
    
    const rajeshwariAvailableSlots = [
      { day: 'Monday', time: '10:15 - 11:00' },
      { day: 'Wednesday', time: '12:15 - 13:45' },
      { day: 'Friday', time: '14:30 - 16:45' },
      { day: 'Thursday', time: '08:45 - 10:15' },
      { day: 'Tuesday', time: '10:15 - 11:00' }
    ];
    
    const divyashreeAvailableSlots = [
      { day: 'Tuesday', time: '12:15 - 13:45' },
      { day: 'Thursday', time: '11:30 - 12:15' },
      { day: 'Friday', time: '08:45 - 10:15' },
      { day: 'Monday', time: '14:30 - 16:45' },
      { day: 'Saturday', time: '10:15 - 11:00' }
    ];
    
    const likhitaAvailableSlots = [
      { day: 'Wednesday', time: '14:30 - 16:45' },
      { day: 'Monday', time: '08:45 - 10:15' },
      { day: 'Thursday', time: '10:15 - 11:00' },
      { day: 'Tuesday', time: '12:15 - 13:45' },
      { day: 'Friday', time: '11:30 - 12:15' }
    ];
    const sureshAvailableSlots = [
      { day: 'Monday', time: '08:45 - 10:15' },
      { day: 'Tuesday', time: '10:15 - 11:00' },
      { day: 'Wednesday', time: '14:30 - 16:45' },
      { day: 'Thursday', time: '12:15 - 13:45' },
      { day: 'Friday', time: '08:45 - 10:15' },
      { day: 'Saturday', time: '10:15 - 11:00' }
    ];
    
    const maheshAvailableSlots = [
      { day: 'Tuesday', time: '08:45 - 10:15' },
      { day: 'Wednesday', time: '11:30 - 12:15' },
      { day: 'Friday', time: '12:15 - 13:45' },
      { day: 'Saturday', time: '14:30 - 16:45' },
      { day: 'Monday', time: '10:15 - 11:00' }
    ];
    
    const kavithaAvailableSlots = [
      { day: 'Monday', time: '14:30 - 16:45' },
      { day: 'Tuesday', time: '11:30 - 12:15' },
      { day: 'Thursday', time: '08:45 - 10:15' },
      { day: 'Saturday', time: '12:15 - 13:45' },
      { day: 'Friday', time: '10:15 - 11:00' }
    ];
    
    const venkateshAvailableSlots = [
      { day: 'Wednesday', time: '08:45 - 10:15' },
      { day: 'Friday', time: '10:15 - 11:00' },
      { day: 'Monday', time: '12:15 - 13:45' },
      { day: 'Thursday', time: '14:30 - 16:45' },
      { day: 'Tuesday', time: '11:30 - 12:15' }
    ];
    
    const rameshAvailableSlots = [
      { day: 'Monday', time: '10:15 - 11:00' },
      { day: 'Wednesday', time: '12:15 - 13:45' },
      { day: 'Friday', time: '14:30 - 16:45' },
      { day: 'Thursday', time: '08:45 - 10:15' },
      { day: 'Tuesday', time: '10:15 - 11:00' }
    ];
    
    const lakshmiAvailableSlots = [
      { day: 'Tuesday', time: '12:15 - 13:45' },
      { day: 'Thursday', time: '11:30 - 12:15' },
      { day: 'Friday', time: '08:45 - 10:15' },
      { day: 'Monday', time: '14:30 - 16:45' },
      { day: 'Saturday', time: '10:15 - 11:00' }
    ];
    
    const sudhaAvailableSlots = [
      { day: 'Wednesday', time: '14:30 - 16:45' },
      { day: 'Monday', time: '08:45 - 10:15' },
      { day: 'Thursday', time: '10:15 - 11:00' },
      { day: 'Tuesday', time: '12:15 - 13:45' },
      { day: 'Friday', time: '11:30 - 12:15' }
    ];
    
    const ganeshAvailableSlots = [
      { day: 'Thursday', time: '08:45 - 10:15' },
      { day: 'Tuesday', time: '10:15 - 11:00' },
      { day: 'Monday', time: '14:30 - 16:45' },
      { day: 'Friday', time: '12:15 - 13:45' },
      { day: 'Saturday', time: '11:30 - 12:15' }
    ];
    
    const hariniAvailableSlots = [
      { day: 'Monday', time: '10:15 - 11:00' },
      { day: 'Wednesday', time: '12:15 - 13:45' },
      { day: 'Friday', time: '14:30 - 16:45' },
      { day: 'Tuesday', time: '08:45 - 10:15' },
      { day: 'Saturday', time: '11:30 - 12:15' }
    ];
    
    const shanthiAvailableSlots = [
      { day: 'Wednesday', time: '08:45 - 10:15' },
      { day: 'Friday', time: '10:15 - 11:00' },
      { day: 'Monday', time: '12:15 - 13:45' },
      { day: 'Thursday', time: '14:30 - 16:45' },
      { day: 'Tuesday', time: '11:30 - 12:15' }
    ];
    
    const satishAvailableSlots = [
      { day: 'Tuesday', time: '08:45 - 10:15' },
      { day: 'Wednesday', time: '11:30 - 12:15' },
      { day: 'Friday', time: '12:15 - 13:45' },
      { day: 'Saturday', time: '14:30 - 16:45' },
      { day: 'Monday', time: '10:15 - 11:00' }
    ];
    
    const yashwanthAvailableSlots = [
      { day: 'Monday', time: '08:45 - 10:15' },
      { day: 'Tuesday', time: '10:15 - 11:00' },
      { day: 'Wednesday', time: '14:30 - 16:45' },
      { day: 'Thursday', time: '12:15 - 13:45' },
      { day: 'Friday', time: '08:45 - 10:15' }
    ];
    
    const neelimaAvailableSlots = [
      { day: 'Wednesday', time: '10:15 - 11:00' },
      { day: 'Friday', time: '12:15 - 13:45' },
      { day: 'Monday', time: '10:15 - 11:00' },
      { day: 'Tuesday', time: '08:45 - 10:15' },
      { day: 'Thursday', time: '12:15 - 13:45' }
    ];
    
    const raghavAvailableSlots = [
      { day: 'Thursday', time: '08:45 - 10:15' },
      { day: 'Tuesday', time: '10:15 - 11:00' },
      { day: 'Monday', time: '14:30 - 16:45' },
      { day: 'Friday', time: '12:15 - 13:45' },
      { day: 'Saturday', time: '11:30 - 12:15' }
    ];
    

    const defaultFaculty = [
      {
        name: "Dr. Chetana Srinivas",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(drChetanaAvailableSlots)
      },
      {
        name: "Pawan",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(pawanAvailableSlots)
      },
      {
        name: "Prakash COP",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(prakashAvailableSlots)
      },
      {
        name: "Nage Gowda",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(nageGowdaAvailableSlots)
      },

      {
        name: "Manikandan",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(manikandanAvailableSlots)
      },
      {
        name: "Anuradha",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(anuradhaAvailableSlots)
      },
      {
        name: "Chandar",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(chandarAvailableSlots)
      },
      {
        name: "Nirmala",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(nirmalaAvailableSlots)
      },
      {
        name: "Rajeshwari",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(rajeshwariAvailableSlots)
      },
      {
        name: "Divyashree",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(divyashreeAvailableSlots)
      },
      {
        name: "Likhita",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(likhitaAvailableSlots)
      },

      {
        name: "Suresh",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(sureshAvailableSlots)
      },
      {
        name: "Mahesh",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(maheshAvailableSlots)
      },
      {
        name: "Kavitha",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(kavithaAvailableSlots)
      },
      {
        name: "Venkatesh",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(venkateshAvailableSlots)
      },
      {
        name: "Ramesh",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(rameshAvailableSlots)
      },
      {
        name: "Lakshmi",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(lakshmiAvailableSlots)
      },
      {
        name: "Sudha",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(sudhaAvailableSlots)
      },
      {
        name: "Ganesh",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(ganeshAvailableSlots)
      },
      {
        name: "Harini",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(hariniAvailableSlots)
      },
      {
        name: "Shanthi",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(shanthiAvailableSlots)
      },
      {
        name: "Satish",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(satishAvailableSlots)
      },
      {
        name: "Yashwanth",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(yashwanthAvailableSlots)
      },
      {
        name: "Neelima",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(neelimaAvailableSlots)
      },
      {
        name: "Raghav",
        defaultAvailability: false,
        schedules: generateDefaultSchedules(raghavAvailableSlots)
      }
    ];

    await FacultyInfo.insertMany(defaultFaculty);
    console.log("Default faculty data initialized with available time slots");
  } catch (err) {
    console.error("Error initializing faculty data:", err);
  }
};

// GET route to fetch faculty info
app.get("/faculty-info", async (req, res) => {
  try {
    const { name, day, time } = req.query;

    // Handle break times
    if (time === '11:00' || time === '13:45') {
      return res.json({
        available: false,
        reason: 'Break Time'
      });
    }

    // If no specific query parameters, return all faculty
    if (!name && !day && !time) {
      const allFaculty = await FacultyInfo.find({});
      return res.json(allFaculty);
    }

    // Find faculty by name - case insensitive and partial match
    const searchRegex = new RegExp(name, 'i');
    const faculty = await FacultyInfo.findOne({
      name: { $regex: searchRegex }
    });

    if (!faculty) {
      // Try to find similar names to suggest
      const allFaculty = await FacultyInfo.find({});
      const similarNames = allFaculty
        .map(f => f.name)
        .filter(fname => fname.toLowerCase().includes(name.toLowerCase()));

      let suggestion = '';
      if (similarNames.length > 0) {
        suggestion = `Did you mean: ${similarNames.join(', ')}?`;
      }

      return res.status(404).json({
        available: false,
        reason: `Faculty not found. ${suggestion}\nPlease check the name and try again.`
      });
    }

    // If only name is provided, return all schedules for that faculty
    if (!day) {
      return res.json(faculty.schedules);
    }

    // Filter schedules by day
    const daySchedules = faculty.schedules.filter(schedule => schedule.day === day);
    
    // If time is not provided, return all schedules for that day
    if (!time) {
      return res.json(daySchedules);
    }

    // Find specific time slot
    const timeSlot = daySchedules.find(schedule => schedule.time.startsWith(time));
    if (!timeSlot) {
      return res.json({
        available: faculty.defaultAvailability,
        reason: 'No specific schedule found for this time'
      });
    }

    // Return the availability status and reason
    return res.json({
      available: timeSlot.isAvailable,
      reason: timeSlot.reason
    });
  } catch (err) {
    console.error('Error in GET /faculty-info:', err);
    res.status(500).json({
      available: false,
      reason: 'Error checking availability. Please try again.'
    });
  }
});

// GET route to get faculty schedule for a specific day
app.get("/get-schedule", async (req, res) => {
  try {
    const { facultyName, day } = req.query;

    // Find faculty by name - case insensitive
    const faculty = await FacultyInfo.findOne({
      name: { $regex: new RegExp(facultyName, 'i') }
    });

    if (!faculty) {
      return res.status(404).json({ 
        success: false,
        message: 'Faculty not found'
      });
    }

    // Get schedules for the specified day
    const daySchedules = faculty.schedules.filter(schedule => 
      schedule.day === day && schedule.status === 'Available'
    );

    // Return the time slots
    const availableSlots = daySchedules.map(schedule => schedule.time);

    res.json({
      success: true,
      schedule: availableSlots
    });

  } catch (error) {
    console.error('Error getting schedule:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting schedule'
    });
  }
});

// POST route to update faculty schedule
app.post("/faculty-info", async (req, res) => {
  try {
    const { name, day, time, isAvailable, reason } = req.body;

    // Validate required fields
    if (!name || !day || !time) {
      return res.status(400).json({ message: 'Name, day, and time are required' });
    }

    // Check for break times
    if (time === '11:00' || time === '13:45') {
      return res.status(400).json({ message: 'Cannot modify break time slots' });
    }

    // Find faculty by name - case insensitive and partial match
    const searchRegex = new RegExp(name, 'i');
    const faculty = await FacultyInfo.findOne({
      name: { $regex: searchRegex }
    });

    if (!faculty) {
      // Try to find similar names to suggest
      const allFaculty = await FacultyInfo.find({});
      const similarNames = allFaculty
        .map(f => f.name)
        .filter(fname => fname.toLowerCase().includes(name.toLowerCase()));

      let suggestion = '';
      if (similarNames.length > 0) {
        suggestion = `Did you mean: ${similarNames.join(', ')}?`;
      }

      return res.status(404).json({ 
        message: `Faculty not found. ${suggestion}\nPlease check the name and try again.`
      });
    }

    // Update faculty schedule
    const updatedSchedules = faculty.schedules.map(schedule => {
      if (schedule.day === day && schedule.time === time) {
        return {
          ...schedule,
          isAvailable: isAvailable,
          reason: reason
        };
      }
      return schedule;
    });

    faculty.schedules = updatedSchedules;
    await faculty.save();

    return res.json({ message: 'Faculty schedule updated successfully' });
  } catch (err) {
    console.error('Error in POST /faculty-info:', err);
    res.status(500).json({ message: 'Error updating faculty schedule. Please try again.' });
  }
});

// POST route to update faculty schedule
app.post("/update-schedule", async (req, res) => {
  try {
    const { facultyName, day, availableSlots } = req.body;

    // Find faculty by name - case insensitive
    const faculty = await FacultyInfo.findOne({
      name: { $regex: new RegExp(facultyName, 'i') }
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found'
      });
    }

    // Update all schedules for the specified day
    faculty.schedules = faculty.schedules.map(schedule => {
      if (schedule.day === day) {
        // If the time slot is in availableSlots, mark as Available, otherwise Busy
        const isAvailable = availableSlots.includes(schedule.time);
        return {
          ...schedule,
          status: isAvailable ? 'Available' : 'Busy',
          reason: isAvailable ? 'Available for consultation' : 'Not available'
        };
      }
      return schedule;
    });

    await faculty.save();

    res.json({
      success: true,
      message: 'Schedule updated successfully'
    });

  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating schedule'
    });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
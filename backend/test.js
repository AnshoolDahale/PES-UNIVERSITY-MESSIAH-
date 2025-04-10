const mongoose = require('mongoose');
const FacultyInfo = require('./facultyInfoSchema');
const YourAnswer = require('./yourAnswerSchema');

async function testCollections() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/webtechnology', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Test Faculty Info Collection
    const facultyCount = await FacultyInfo.countDocuments();
    console.log('Number of faculty records:', facultyCount);
    const facultyData = await FacultyInfo.find();
    console.log('Faculty Data:', facultyData);

    // Test Your Answer Collection
    // Add a test document
    const testAnswer = new YourAnswer({
      title: 'Test Content',
      content: 'This is test content for verification',
      subject: 'Test Subject',
      chapter: 'Test Chapter'
    });
    await testAnswer.save();
    console.log('Test content added to Your Answer collection');

    // Verify the content was added
    const answerCount = await YourAnswer.countDocuments();
    console.log('Number of Your Answer records:', answerCount);
    const answerData = await YourAnswer.find();
    console.log('Your Answer Data:', answerData);

    // Cleanup test data
    await YourAnswer.deleteOne({ title: 'Test Content' });
    console.log('Test data cleaned up');

  } catch (error) {
    console.error('Error during testing:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

testCollections(); 
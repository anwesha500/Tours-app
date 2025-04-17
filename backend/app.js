const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const usersRoute = require('./routes/users');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes); // Mount booking routes
app.use('/api/users', usersRoute);

// Chatbot route (new route to handle chat)
app.post('/api/chat', async (req, res) => {
  let { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: 'No message provided' });
  }

  // Prepend the prompt and append the userMessage from frontend
  const modifiedMessage = "Your name is Nomad AI,Reply short and only Travelling and planning related questions to" + userMessage;

  try {
    const result = await model.generateContent(modifiedMessage);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const usersRoute = require('./routes/users');

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
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', usersRoute);

// Chatbot route with intent classification
app.post('/api/chat', async (req, res) => {
  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: 'No message provided' });
  }

  const intentPrompt = `
You are a classifier bot.

Classify the user's intent into one of the following categories:
1. "new_booking" – if they want to make a new reservation or booking.
2. "existing_booking_info" – if they are asking about their booking ID, status, or details.
3. "booking_system_quality" – if they are asking whether your booking/reservation system is good or reliable.
4. "general_travel" – for general travel or planning questions.
5. "irrelevant" – if it's not related to travel or booking.

Only return one of the above category codes. No explanations.

User message: "${userMessage}"
`;

  try {
    const intentResult = await model.generateContent(intentPrompt);
    const intentResponse = await intentResult.response;
    const intent = intentResponse.text().trim().toLowerCase();

    // Handle known intents directly
    if (intent === 'new_booking') {
      return res.json({
        reply: 'For bookings, please contact us at 📞 6290462865 or 📧 nomadtravellers@hotmail.com.'
      });
    }

    if (intent === 'existing_booking_info') {
      return res.json({
        reply: 'For privacy reasons, please contact us directly for booking ID or details at 📞 6290462865 or 📧 nomadtravellers@hotmail.com.'
      });
    }

    // All other intents use AI to generate an answer
    const mainPrompt = `
You are Nomad AI, a helpful assistant for Nomad Travellers.
You are allowed to answer ONLY travel-related, booking-related, and destination planning questions in very short.

User message: "${userMessage}"
`;

    const result = await model.generateContent(mainPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

// Connect to MongoDB and start server
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

const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

app.get('/api/hello', async (req, res) => {
  try {
    const visitorName = req.query.visitor_name || 'Guest';
    
    // Get client IP address
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Fetch weather data
    const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${OPENWEATHER_API_KEY}&units=metric`);
    const temperature = weatherResponse.data.main.temp;
    const location = weatherResponse.data.name;

    // Prepare response
    const greeting = `Hello, ${visitorName}! The temperature is ${temperature} degrees Celsius in ${location}`;
    const response = {
      client_ip: clientIp,
      location: location,
      greeting: greeting
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

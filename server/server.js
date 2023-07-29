const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); 

require('dotenv').config();

const app = express();

app.use(cors());

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/email', async (req, res) => {
  try {
    // Fetch JWT
    const authResponse = await fetch('https://api.datamotion.com/SMC/Messaging/v3/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
      }),
    });

    const authData = await authResponse.json(); // Parse the response directly

    if (authResponse.ok) {
      const accessToken = authData.access_token;

      // Fetch Message Summary
      const messageResponse = await fetch('https://api.datamotion.com/SMC/Messaging/v3/content/messages/?folderId=1&pageSize=10&pageNumber=1&sortDirection=DESC&metadata=true', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      const messageData = await messageResponse.json(); // Parse the response directly

      if (messageResponse.ok) {
        const emails = messageData.items.map((item) => ({
          id: item.id,
          sender: item.senderAddress,
          subject: item.subject,
          date: item.createTime,
          body: item.textBody
        }));
        res.json(emails);
      } else {
        throw new Error('Failed to retrieve message summary');
      }
    } else {
      throw new Error('Failed to retrieve DataMotion access token');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: ['https://solestories.pk', 'https://www.solestories.pk']
}));
app.use(express.json({ limit: '10mb' }));

app.post('/chat', async (req, res) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: { message: 'Server error' } });
  }
});

app.listen(process.env.PORT || 3000);

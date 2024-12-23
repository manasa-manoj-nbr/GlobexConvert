const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(cors());

app.get('/api/convert', async (req, res) => {
    const { from, to } = req.query;
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching conversion data' });
    }
});

app.get('/api/exchange-rates', async (req, res) => {
    const { base } = req.query;
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching exchange rates' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

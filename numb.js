const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i < Math.sqrt(num) + 1; i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const isPerfect = (num) => {
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            sum += i + (num / i !== i ? num / i : 0);
        }
    }
    return sum === num && num !== 1;
};

const isArmstrong = (num) => {
    const digits = num.toString().split('');
    const n = digits.length;
    return num === digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), n), 0);
};

const digitSum = (num) => {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
};

app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the Classify Number API!</h1>
        <p>To get interesting mathematical properties about a number, use the following endpoint:</p>
        <p><code>/api/classify-number?number=[YOUR_NUMBER]</code></p>
        <p>To get interesting mathematical properties about a number, click the button below and change the number at the end of the link:</p>
        <a href="/api/classify-number?number=371">
            <button style="padding: 10px 20px; font-size: 16px;">Get Numbers Classification</button>
        </a>
        <p>Simply change the number at the end of the link to any valid integer.</p>
    `);
});

app.get('/api/classify-number', async (req, res) => {
    const { number } = req.query;

    if (!number || isNaN(number)) {
        return res.status(400).json({ number, error: true });
    }

    const num = parseInt(number, 10);
    const properties = [];

    if (isArmstrong(num)) properties.push('armstrong');
    properties.push(num % 2 === 0 ? 'even' : 'odd');

    try {
        const response = await axios.get(`http://numbersapi.com/${num}/math`);
        const funFact = response.data;

        res.json({
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties,
            digit_sum: digitSum(num),
            fun_fact: funFact
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch fun fact' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

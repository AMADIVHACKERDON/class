# class
Hi, I am Amadi Victory.

Welcome to My Number Classification API!

To get interesting mathematical properties about a number, use the following endpoint:

/api/classify-number?number=[YOUR_NUMBER]

To get interesting mathematical properties about a number, click the button below and change the number at the end of the link:

Get Numbers Classification

Simply change the number at the end of the link to any valid integer.

Project Description
This API takes a number and returns interesting mathematical properties about it, along with a fun fact.

Technology Stack
Node.js
Express.js
Axios
API Specification
Endpoint
GET /api/classify-number?number=[YOUR_NUMBER]

Required JSON Response Format (200 OK)
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
Required JSON Response Format (400 Bad Request)
{
    "number": "alphabet",
    "error": true
}
Functionality
Accepts GET requests with a number parameter.

Returns JSON in the specified format.

Accepts all valid integers as the only possible inputs.

Provides appropriate HTTP status codes.

Setup and Installation
###Step 1: Set Up the Project Environment###

Install Node.jsfrom Node.js official website.

Create a project directory:

CMD Prompt

mkdir classify-number-api

Initialize a Node.jsproject:

npm init -y

npm install express axios cors

###Step 3: Create the API###

I created a file named index.js and add the following code:

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
Step 4: Version Control
Initialize a Git repository:

git init

Create a .gitignore file:

echo "node_modules" > .gitignore

Add and commit your code:

git add .

git commit -m "Initial commit"

Create a new repository on GitHub and push your code:

git remote add origin https://github.com/tomolaoke/HNG12-stage1-Number-Classifier

git push -u origin main

Step 5: Deployment
Deploy on Render: Follow Render deployment guide.

Build and Start Commands

Build Command: echo "no build step"

Start Command: node index.js

Step 6: Monitor Deployment
Check the Render logs to ensure the deployment process completes successfully.

Step 7: Testing
Test locally using Postman before deployment:

Start your local server:

node index.js

Test with Postman using the following URL:

url: Live: My API Submission Public SIte

http://localhost:3000/api/classify-number?number=371

https://hngx-stage1node-number-classifier.onrender.com/api/classify-number?number=371

License
This project is licensed under the MIT License.

Author
Amadi Victory

Linkedin

GitHub

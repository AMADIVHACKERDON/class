const express = require('express');
const axios = require('axios')
const app = express();
const PORT = process.env.PORT || 3000;
const core = require('cors');

app.use(core())

const digitSum = (n) => {
    return n.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
};

const isPerfect = (n) => {
    let sum = 0;
    for (let i = 1; i < n; i++) {
        if (n % i === 0) sum += i;
    }
    return sum === n;
};

const isArmstrong = (n) => {
    const numStr = n.toString();
    const length = numStr.length;
    const sum = numStr.split('').reduce((acc, digit) => acc + Math.pow(parseInt(digit), length), 0);
    return sum === n;
};

function is_prime(n){
    if (n < 2)
    return false
    for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++){
        if (n % i == 0) return false;
    }
    return true;
}

    
async function classify_number(number){
        if (number < 0) {
            return {
                error: true,
                message: "Negative numbers are not allowed for classification."
            };
        }
        const properties = [];
        if (isArmstrong(number)) properties.push("armstrong");
        if (number % 2 === 0) properties.push("even");
        else properties.push("odd");
        
        let armstrongFact = "";
        if (properties.includes("armstrong")) {
            const digits = number.toString().split('').map(d => `${d}^${number.toString().length}`);
            armstrongFact = `${number} is an Armstrong number because ${digits.join(" + ")} = ${number}`;
        }
        return {
            "number": number,
            "is_prime": is_prime(number),
            "is_perfect": isPerfect(number),
            "properties": properties,
            "digit_sum": digitSum(number),
            "funfact": armstrongFact
        };
}


app.get('/classify/:number', async (req,res) => {
    const num = parseInt(req.params.number);


    if (isNaN(num)) {
        return res.status(400).json({
            number: req.params.number,
            error: true
        });
    }
        try {
            const classification = await classify_number(num);
            if (classification.error) {
                return res.status(400).json(classification); // Handle negative number or other issues                
        }
        res.json(classification);
        }catch (error) {
            console.error(error)
            return res.status(500).json({
                error: true,
                message: 'Internal server error'
            });
        }   
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

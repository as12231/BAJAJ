const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

const port = process.env.PORT || 2000;

app.use(bodyParser.json());

app.use(cors());

const user_id = "john_doe_17091999";

const email = "john@xyz.com";

const roll_number = "ABCD123";


const getHighestLowercaseAlphabet = (arr) => {

 let highest = '';

 arr.forEach(char => {

  if (char >= 'a' && char <= 'z') {

   if (char > highest) {
    highest = char;
   }

  }

 });

 return highest ? [highest] : [];

};

app.post('/bfhl', (req, res) => {

 const { data } = req.body;

 if (!Array.isArray(data)) {

  return res.status(400).json({ is_success: false, message: 'Invalid data format' });

 }

 const numbers = data.filter(item => !isNaN(item)).map(String);

 const alphabets = data.filter(item => isNaN(item));

 const highest_lowercase_alphabet = getHighestLowercaseAlphabet(alphabets);



 res.json({

  is_success: true,

  user_id,

  email,

  roll_number,

  numbers,

  alphabets,

  highest_lowercase_alphabet

 });

});


app.get('/bfhl', (req, res) => {

 res.json({ operation_code: 1 });

});


app.listen(port, () => {

 console.log(`Server running on port ${port}`);

});


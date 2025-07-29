
const express = require('express');
const cors= require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Api is running');
});


const handleResponse = async (req, res) => {
  try {
    const { data } = req.body;

    // Your info
    const fullName = "Arnab_Pramanik";
    const dob = "17091999"; 
    const user_id = `${fullName}_${dob}`;
    const email = "arnab@xyz.com";
    const roll_number = "ABCD123";

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let concat_letters = [];

    data.forEach(item => {
      // Is numeric?
      if (!isNaN(item)) {
        const num = parseInt(item);
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
        sum += num;
      }
      // Only alphabetic
      else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        concat_letters.push(item);
      }
      // Special characters (non-alphanumeric)
      else {
        special_characters.push(item);
      }
    });

    // Create alternating caps reversed string
    const reversedConcat = concat_letters.reverse().join("");
    const concat_string = reversedConcat
      .split("")
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });

  } catch (error) {
    return res.status(500).json({
      is_success: false,
      message: "Something went wrong",
    });
  }
};


app.post('/bfhl', handleResponse);




app.listen(port, (err) => {
    if (err) {
        console.log("error starting server:", err);
    } else {
        console.log(`Express server running at http://localhost:${port}/`);
    }
});

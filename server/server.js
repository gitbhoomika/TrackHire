const dotenv = require("dotenv");

const result = dotenv.config();

console.log(result);
console.log("Gemini:", process.env.GEMINI_API_KEY);

const express=require('express');
const router = require('./routes');


const connectDB=require('./config/db');

connectDB();
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT || 3000;
app.use('/api', router

);


app.listen(PORT, "0.0.0.0",() => {
    console.log(`Server is running on port ${PORT}`);
});
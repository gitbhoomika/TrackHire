const express=require('express');
const router = require('./routes');
const dotenv=require('dotenv');
const connectDB=require('./config/db');
dotenv.config();
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
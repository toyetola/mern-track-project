const express = require('express');
const cors =  require('cors');
const mongoose = require('mongoose');

// const bodyParser = require('body-parser'); not needed in new version of express
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const dbConfig = process.env.ATLAS_URI;
const dbConfig = 'mongodb+srv://oyetola:oyetola12@cluster0-2r1vx.gcp.mongodb.net/test?retryWrites=true&w=majority';
//connecting to the database
mongoose.connect(dbConfig, {
    useNewUrlParser : true, useCreateIndex: true, useUnifiedTopology : true
});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB database connection established');
});

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users')

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

app.listen(port, ()=>{
    console.log(`Server is runing on port: ${port}`);
});
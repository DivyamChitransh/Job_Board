require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const morgan = require('morgan');
const jobseekersrouter = require("./routes/jobseekersroutes.js");
const employerroutes = require('./routes/employerroutes.js');
const jobpostingrouter = require('./routes/jobsroutes');
const jobapplicationrouter = require('./routes/jobapplicationroutes.js');
const getAnalysisrouter = require('./routes/jobanalysisroutes.js');
const loggmiddleware = require('./middlewares/logging.js');
const {validatejobs,validateapplication} = require('./middlewares/validate.js');
const authroutes = require('./routes/authenticate.js');
const errorhandlerr = require('./middlewares/errorhandler.js');
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(loggmiddleware);
const URL = process.env.MONGO_URI;

const Database = async() => {
    try{
        await mongoose.connect(URL);
        console.log('Connected to database!');
    }
    catch(error){
        console.log('Error in connecting!');
    }
};
app.use('/jobseekers',jobseekersrouter);
app.use('/employers',employerroutes);
app.use('/jobs',jobpostingrouter)
app.use('/applications',jobapplicationrouter);
app.use('/analysis',getAnalysisrouter);
app.use('/user',authroutes);

app.get('/',(req,res) => {;
    res.send('Job board is running')
})
app.use(errorhandlerr);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`);
    Database();
})
const mongoose = require('mongoose');
const Jobsmodel = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    companyName: {type:String, required:true},
    location: {type: String, required:true},
    salaryRange:{type:String, required:true}
});

const jobPosting = mongoose.model('jobPosting',Jobsmodel);
module.exports = jobPosting;
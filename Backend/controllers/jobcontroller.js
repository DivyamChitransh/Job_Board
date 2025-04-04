const jobPostingModel = require('../models/jobmodel.js');
const createjobscontroller = async(req,res) => {
    const {title,description,companyName,location,salaryRange} = req.body;
    const newjob = new jobPostingModel({
        title,description,companyName,location,salaryRange
    });
    try{
        await newjob.save();
        res.status(201).json(newjob);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
};

const getjobscontroller = async(req,res) => {
    try{
        const jobPosting = await jobPostingModel.findById(req.params.id);
        res.status(200).json(jobPosting);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

const updatejobpostingcontroller = async(req,res) => {
    try{
        const updatejobposting = await jobPostingModel.findByIdAndUpdate(req.params.id,req.body,{new:true}
        );
        res.status(200).json({jobPosting: updatejobposting});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

const deletejobpostingcontroller = async(req,res) => {
    const {id} = req.params;
    try{
        const deletedjob = await jobPostingModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Job Posting has been deleted!'});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

const getAlljobs = async(req,res) => {
    try{
        const {title,companyName,location,salaryRange} = req.query;
        const filter = {};
        if(title){
            filter.title = {$regex: title,$options: 'i'};
        }
        if(location){
            filter.location = {$regex: location, $options: 'i'};
        }
        if(companyName){
            filter.companyName = {$regex: companyName, $options: 'i'};
        }
        if(salaryRange){
            filter.salaryRange = {$regex: salaryRange, $options: 'i'};
        }
        const jobPosting = await jobPostingModel.find(filter);
        res.status(200).json(jobPosting);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

module.exports = {createjobscontroller,getjobscontroller,updatejobpostingcontroller,deletejobpostingcontroller,getAlljobs};
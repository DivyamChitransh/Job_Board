const jobseeker = require("../models/jobseekersmodel");
const createjobseekercontroller = async(req,res) =>  {
    const {name,email,skills,resume} = req.body;
    const newjobseeker = new jobseeker({
        name,email,skills,resume
    });
    try{
        await newjobseeker.save();
        res.status(201).json(newjobseeker);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

const getAlljobseekers = async(req,res) => {
    try{
        const jobseekers = await jobseeker.find();
        res.status(200).json(jobseekers);
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

const getjobseekerbyIDcontroller = async(req,res) => {
    try{
        const {id} = req.params;
        const jobSeeker = await jobseeker.findById(id);
        res.status(200).json(jobSeeker);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

const updatejobseekercontroller = async(req,res) => {
    try{
        const id = req.params.id;
        const {name,email,skills,resume} = req.body;
        const updateseeker = await jobseeker.findByIdAndUpdate(id,{name,email,skills,resume},{new:true});
        res.status(200).json({updateseeker});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

const deletejobseekercontroller = async(req,res) => {
    const {id} = req.params;
    try{
        const deletejobseeker = await jobseeker.findByIdAndDelete(id);
        res.status(200).json({message: 'Job Seeker has been deleted!'});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

module.exports = {createjobseekercontroller,getjobseekerbyIDcontroller,getAlljobseekers,updatejobseekercontroller,deletejobseekercontroller};
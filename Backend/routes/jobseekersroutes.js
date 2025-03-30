const express = require('express');
const{ createjobseekercontroller,getjobseekerbyIDcontroller,getAlljobseekers,updatejobseekercontroller,deletejobseekercontroller } = require( "../controllers/jobseekercontroller.js");
const router = express.Router();

router.post('/', createjobseekercontroller);
router.get('/',getAlljobseekers);
router.get('/:id',getjobseekerbyIDcontroller);
router.put('/:id',updatejobseekercontroller);
router.delete('/:id',deletejobseekercontroller);
module.exports = router;
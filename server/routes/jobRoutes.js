import express from 'express'
import { getJobById, getJobs } from '../controllers/jobController.js';

const router=express.Router()

//route to get alljobs data


router.get('/',getJobs)
router.get('/:id',getJobById)

//route to get single nob by id


export default router;
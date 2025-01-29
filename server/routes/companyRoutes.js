import express from 'express'
import { changeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middlewares/authMiddleware.js'

const router=express.Router()

//Register a comapny
router.post('/register',upload.single('image'),registerCompany)

//company login
router.post('/login',loginCompany)

//get company data
router.get('/company',protectCompany,getCompanyData)

//post a job
router.post('/post-job',protectCompany,postJob)

//get applicant data of company
router.get('/applicants',protectCompany,getCompanyJobApplicants)

//get company job list
router.get('/list-jobs',protectCompany,getCompanyPostedJobs)

//change app status

router.post('/change-status',protectCompany,changeJobApplicationsStatus)

//change app visibility
router.post('/change-visibility',protectCompany,changeVisibility)

export default router


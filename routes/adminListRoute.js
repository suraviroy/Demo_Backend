import express from 'express'
import {
  adminList,
  adminregistration,
  adminNames
} from '../controller/adminListController.js'
const adminListRouter = express.Router()

adminListRouter.post('/adminregistration', adminregistration)
adminListRouter.get('/adminlist', adminList)
adminListRouter.get('/adminNames', adminNames)

export default adminListRouter

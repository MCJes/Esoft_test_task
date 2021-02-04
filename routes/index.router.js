import { Router } from 'express'
import auth from "../middlewares/auth.js"
import indexController from "../controllers/indexController.js"

const router = new Router()

router.get('/', auth, indexController.index)
// router.get('/auth',)

export default router
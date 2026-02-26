import express from 'express'
import { UserLogin, UserRegistration} from '../Controller/AuthController.js';

const router = express.Router();

router.post('/Registration',UserRegistration)
router.post('/Login',UserLogin)

export default router;
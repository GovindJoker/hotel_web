import router from './auth.js'
// import auth from '../middleware/auth.js';
import { signUpUser, otpVerification, login } from '../controllers/user.js';


router.post('/signUp',  signUpUser)
router.post('/otpVerification', otpVerification)
router.post('/login', login)

export default router;
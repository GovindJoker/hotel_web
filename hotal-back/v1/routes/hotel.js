import router from './auth.js'
// import auth from '../middleware/auth.js';
import { addHotel,getHotelByid,getHotellist,updateHotel } from "../controllers/hotel.js";

router.post('/addHotel/:userId', addHotel)
router.get('/getHotelByid/:userId', getHotelByid)
router.get('/getHotellist', getHotellist)
router.post('/updateHotel/:userId', updateHotel)

export default router;
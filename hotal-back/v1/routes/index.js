import userAuth from './user.js'
import hotelRoute from './hotel.js'

const VERSION='v1';

function router(app){
    app.use(`/${VERSION}/user`,userAuth)
    app.use(`/${VERSION}/user`,hotelRoute)
    
}

export default router;
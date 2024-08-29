import ApiError from '../middleware/apiError.js'
import hotel from "../models/hotelModel.js";
import user from "../models/user.js";
import Response from '../middleware/response.js';


export const addHotel = async (req, res) => {
    let _id = req.params.userId
    let { hotelName, location, image, room } = req.body
    try {
        let fetchedUser = await user.findOne({ _id })
        if (!fetchedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // console.log(hotelName, location, image, room,fetchedUser,_id)
        const newHotel = new hotel({
            hotelName: hotelName,
            location: location,
            image: image,
            room: room,
            user: fetchedUser._id
        })
        await newHotel.save()
        // console.log("Hotel saved:", newHotel);
        let result = {
            data: newHotel
        }
        // console.log("Saving new hotel...",result);
        // console.log(result)
        Response.success(res, 'New Hotel Added Successfully', result)

    } catch (err) {
        if (err instanceof ApiError) return Response.error(res, err);
        return Response.error(res, ApiError.internal(err))
    }
}

export const getHotelByid = async (req, res) => {
    let _id = req.params.userId
    try {
        let fetchUser = await user.findOne({ _id })
        // console.log(fetchUser)
        if (fetchUser._id == undefined) {
            return Response.error(res, ApiError.notFound())
        }
        let fetchHotel = await hotel.find({ user: _id, isDeleted: false })
        Response.success(res, "Hotel Found Successfully", fetchHotel)
    } catch (err) {
        if (err instanceof ApiError) return Response.error(res, err);
        return Response.error(res, ApiError.internal(err))
    }

}

export const getHotellist = async (req, res) => {
    try {
        const page = parseInt(req.query.pageNumber, 10) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.PageSize, 10) || 10; // Default to 10 results per page if not provided

        let query = [
            {
                $skip: (page - 1) * limit, // Skip documents based on page
            },
            {
                $limit: limit, // Limit the number of documents returned
            },
        ]
        const feeds = await hotel.aggregate(query);

        // Optionally, calculate total number of posts for pagination metadata
        const totalHotel = await hotel.countDocuments();
        const totalPages = Math.ceil(totalHotel / limit);
        const result = {
            data: feeds,
            pagination: {
                currentPage: page,
                totalHotel,
                totalPages,
            },
        };
        Response.success(res,"Hotel Found Successfully",result)
    } catch (err) {
        if (err instanceof ApiError) return Response.error(res, err);
        return Response.error(res, ApiError.internal(err))
    }

}

export const updateHotel = async (req, res) => {

}
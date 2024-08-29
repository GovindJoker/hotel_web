import user from "../models/user.js";
import Validation from "../validation/user.js";
import ApiError from "../middleware/apiError.js";

class UserService{
    async findAll() {
        const users = await user.find({isDeleted: false}).populate();
        return users;
    }

    async findById(id) {
        if (!id)
            throw ApiError.badRequest('User id is required');
        
        const foundUser = await user.findOne({ _id: id });
        if (!foundUser)
            throw ApiError.notFound('User not found');

        return foundUser;
    }

    async findByLinkedinId(linkedinId) {
        
    }

    async create(user) {
        const isValid = Validation.insert(user);
        if (!isValid)
            return;
    }

    async update(user) {
        
    }

    async deleteUser(id) {
        
    }
}

export default new UserService();
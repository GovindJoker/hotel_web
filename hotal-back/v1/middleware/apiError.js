class ApiError extends Error{
    constructor(code,message){
        super(message);
        this.code=code;
        this.message=message
    }

    static badRequest(msg){
        return new ApiError (400,msg);
    }

    static alreadyExist(msg){
        return new ApiError(409,msg || 'User Already Exist.')
    }

    static notFound(msg){
        return new ApiError(404,msg||'Not Found.')
    }

    static notActive(msg){
        return new ApiError(403,msg||'Found but not Active.')
    }

    static notAuthorized(){
        return new ApiError(401,'User not authorized')
    }

    static internal(err){
        return new ApiError(500,'Server Error :'+err.message)
    }

}

export default ApiError;
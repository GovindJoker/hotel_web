import ApiError from "./apiError.js";

class Response {
    constructor(res, success, err, data, message) {
        if (res.headersSent) return; // Prevent sending a response if headers are already sent

        let responsePayload = {
            success: success,
            message: message,
        };

        if (success && data) {
            responsePayload.data = data;
        } else if (err) {
            responsePayload.message = err.message || 'Server Error';
        }

        if (success) {
            res.status(200).json(responsePayload);
        } else if (err instanceof ApiError) {
            res.status(err.code || 500).json(responsePayload);
        } else {
            res.status(500).json(responsePayload);
        }
    }

    static error(res, err) {
        return new Response(res, false, err);
    }

    static success(res, message, data) {
        return new Response(res, true, null, data, message);
    }
}

export default Response;

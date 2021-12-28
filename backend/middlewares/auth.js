// this is middleware that use for protected routes
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        // Bearer is the 1st part of the token so we have to get it by split the token
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token) {
        return next(new ErrorResponse("Not authorized to access this route" , 401));
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id)

        if(!user) {
            return next(new ErrorResponse("No user found with id" , 404))
        }

        req.user = user;

        next()

    } catch (error) {
        
        return next(new ErrorResponse("Not authorized to access this route", 401))

    }

}
import jwt from 'jsonwebtoken';
import  User from '../models/userModel.js';

const protect  = async (req, res, next) => {
    console.log('protect middleware called, req: ', JSON.stringify(req.headers.authorization));
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
    
            next(); 
        } catch(error) {
            console.error('Authentication error:', error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
       
    }

    if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
};

export { protect };
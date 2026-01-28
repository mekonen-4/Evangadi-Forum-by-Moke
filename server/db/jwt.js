import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';

export const generateToken = (user) => {
    return jwt.sign(
        {
           userid: user.userid,
           email: user.email, 
           username: user.username
        }, 
        JWT_SECRET,
        { expiresIn: '1d'}
    );
};
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';

export const authMiddleware = (req, res, next) => {
    try {
        // 1. Get authorization Headers
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided",
            })
        }

        // 2. Extact token
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: "Invalid token format",
            });
        }

        // 3. verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // 4. Attach user to request
        req.user = decoded;

        // 5. Continue
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized access",
        });
    }
};
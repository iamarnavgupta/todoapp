import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const middleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        jwt.verify(token, "secretkeyofnoteapp123@#", async (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
                } else {
                    return res.status(401).json({ success: false, message: "Invalid token" });
                }
            }

            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            req.user = { name: user.name, id: user._id };
            next();
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Please log in" });
    }
};

export default middleware;

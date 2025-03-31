
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';  // ✅ Fixed missing import
import User from '../models/User.js';

const router = express.Router();

// User Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });//awaits tells javascript to pause execution untill the database responds
        if (!user) {  // ✅ Fixed incorrect condition
            return res.status(401).json({ success: false, message: "User does not exist" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Wrong credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, "secretkeyofnoteapp123@#", { expiresIn: "7d" });  // ✅ Fixed incorrect variable name

        return res.status(200).json({ 
            success: true, 
            token, 
            user: { name: user.name }, 
            message: "Login Successfully" 
        });

    } catch (error) {
        console.error("Error in Login:", error.message);
        return res.status(500).json({ success: false, message: "Error in Login server" });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email,name, password } = req.body;
        console.log("BODY",email,name,password);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        //  Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user in MongoDB
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Generate JWT Token after successful registration
        const token = jwt.sign({ id: newUser._id }, "secretkeyofnoteapp123@#", { expiresIn: "5h" });


        // // Check if user exists
        // const user = await User.findOne({ email });
        // if (!user) {  // ✅ Fixed incorrect condition
        //     return res.status(401).json({ success: false, message: "User does not exist" });
        // }

        // // Compare passwords
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        // if (!isPasswordValid) {
        //     return res.status(401).json({ success: false, message: "Wrong credentials" });
        // }

        // // Generate JWT Token
        // const token = jwt.sign({ id: user._id }, "secretkeyofnoteapp123@#", { expiresIn: "5h" });  // ✅ Fixed incorrect variable name

        return res.status(200).json({ 
            success: true,
            message: "Register Successfully" 
        });

    } catch (error) {
        console.error("Error in Login:", error.message);
        return res.status(500).json({ success: false, message: "Error in Login server" });
    }
});

export default router;


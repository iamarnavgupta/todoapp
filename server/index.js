import express from 'express';
import cors from 'cors';
import connectToMongoDB from './db/db.js';
import authRouter from './routes/auth.js';
import noteRouter from './routes/note.js';



const app = express();
const PORT = process.env.PORT || 5000;  // Use environment variable for flexibility

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/note', noteRouter)

// Default Route (To Check If Server is Running)
// app.get("/", (req, res) => {
//     res.send("API is running...");
// });

// Routes

// 404 Handler (If No Routes Match)
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route Not Found" });
});

// Connect to MongoDB & Start Server
const startServer = async () => {
    try {
        await connectToMongoDB();
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Exit process if DB connection fails
    }
};

startServer();

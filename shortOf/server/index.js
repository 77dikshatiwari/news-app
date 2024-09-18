import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/apiRoutes.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors(
    {
        origin: '*', // allow to server to accept request from different origin
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // allow methods
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.use('/api/v1', apiRoutes);

app.use('/api/v1/', (req, res) => {
    res.send('Welcome to News API');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//external packages
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

//pull our variables from .env files
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

//middleware to handle routes
app.use('/api/v1/posts',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

app.get('/',async(req,res)=>{
    res.send('Hello from DALL-E 2.0');
})

const server=async()=>{
    try{
        connectDB(process.env.MONGODB_URL)
            app.listen(3000,(console.log('Server is running on port 3000')))
    }catch(error){
        console.log(error);
    }
    
}

server();

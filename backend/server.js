import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';
import messageRouter from './routes/message.routes.js';
import authRouter from './routes/auth.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js';
import protectRoute from './middlewares/protectRoute.js';
import userRouter from './routes/user.routes.js';
import { app, server } from './socket/socket.js';
import path from 'path';
dotenv.config();
app.use(cookieParser());
app.use(express.json());
const PORT=process.env.PORT || 5000;
const  __dirname=path.resolve();
app.use('/api/auth',authRouter);    
app.use('/api/messages',protectRoute,messageRouter);
app.use('/api/users',protectRoute,userRouter);
app.use(express.static(path.join(__dirname,"/frontend/dist")));
app.get("*",(req,res)=>{
    res.send(path.join(__dirname,"frontend","dist","index.html"));
})
server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Connected to server ${PORT}`);
});

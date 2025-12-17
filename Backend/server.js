import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


const app = express();
const port = process.env.PORT || 4000;




// connect db
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRoute); 
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
  res.send('API Working');
});

// start server
app.listen(port, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log('Server started on PORT : ' + port);
  }
});

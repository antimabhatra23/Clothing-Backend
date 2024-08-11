const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const forgotpasswordRoutes = require('./routes/forgotpasswordRoutes');

mongoose.connect("mongodb+srv://antima1998:iLn_8*AS-HZyHzj@cluster0.u3wn8tv.mongodb.net/shoppingwebsite?retryWrites=true&w=majority&appName=Cluster0", {
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const app = express();
app.use(bodyParser.json());
app.use(cors()); // This will allow all origins to access your API

app.use('/api', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/cart', cartRoutes);
app.use('/forgot-password', forgotpasswordRoutes)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


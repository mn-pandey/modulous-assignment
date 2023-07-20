const express = require('express');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb+srv://mn-pandey:9219591303Am%40n@cluster0.mov0c.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Defining the demo schemas and models for the two collections
const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  approved: { type: Boolean, default: false },
});

const productSchema = new mongoose.Schema({
  productId: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true }, // This field will be used for the join between collections
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);


app.get('/get_data_between_collections', async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',                                          // this is how we will aggregate normally 
          foreignField: 'userId',
          as: 'userDetails',
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

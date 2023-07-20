const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

const secretKey = 'mysecretkey';

const users = [];

// Helper function to generate a JWT token
const generateToken = (data) => jwt.sign(data, secretKey, { expiresIn: '1h' });

// Route for user signup
app.post('/signup', (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;
 // Check if the email or phone already exists
 const existingUser = users.find((user) => user.email === email || user.phone === phone);
 if (existingUser) {
   return res.status(409).json({ message: 'Email or phone number already exists.' });
 }
 console.log(users)

  const user = { firstname, lastname, email, phone, password, approved: true }; //assuming that user is approved by admin at the time of signup
  users.push(user);
  res.status(201).json({ message: 'Signup successful..' });
});

// Route for user login
app.post('/login', (req, res) => {
  const { email, phone, password } = req.body;
  const user = users.find(
    (x) => (x.email === email || x.phone === phone) && x.password === password 
  );
  console.log(user)

  if (user) {
    // Generate token and send it in the response
    const token = generateToken({ firstname: user.firstname, lastname: user.lastname, email: user.email });
    res.status(200).json({ message: 'Login successful.', token });
  } else {
    res.status(401).json({ message: 'Invalid credentials ' });
  }
});

// Route for getting user details
app.get('/userdetails', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, secretKey);
    const { firstname, lastname, email } = decodedToken;
    res.status(200).json({ firstname, lastname, email });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
});


const data = [
  {
    price: 20,
    quantity: 25,
    option: 'yes',
  },
  {
    price: 12,
    quantity: 25,
    option: 'yes',
  },
  {
    price: 20,
    quantity: 25,
    option: 'no',
  },
  {
    price: 15,
    quantity: 25,
    option: 'yes',
  },
  {
    price: 15,
    quantity: 5,
    option: 'no',
  },
];

const sumData = (data) => {
  const sumMap = new Map();

  data.forEach((item) => {
    const key = item.price;
    if (sumMap.has(key)) {
      const existingItem = sumMap.get(key);
      existingItem.quantity += item.quantity;
    } else {
      sumMap.set(key, { price: item.price, quantity: item.quantity, option: item.option });
    }
  });

  const result = [];
  for (const item of sumMap.values()) {
    const { price, quantity, option } = item;
    result.push({ Price: price, quantity, option });
  }

  return result;
};




const final = sumData(data);
console.log(final);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

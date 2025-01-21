console.log('Server is running...');  
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
let r=0;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    r=1;
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
app.get('',()=>{
  res.send(path.join(__dirname, 'react-app', 'index.html'));
})
  
app.get('/server', (req, res) => {
  console.log('Root endpoint hit');  
  res.send('Welcome to my Node.js app running on IIS!'+r);
  res.send(r)
});

app.use('/server/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

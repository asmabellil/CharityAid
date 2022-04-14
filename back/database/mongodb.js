const mongoose = require('mongoose');

const URI ="mongodb+srv://asma_bellil:193JFT4536@cluster0.qapag.mongodb.net/End-Of-Studies?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('db connected..!');
};

module.exports = connectDB;
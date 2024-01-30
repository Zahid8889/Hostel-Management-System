const mongoose = require('mongoose');
const mongoDB = async () => {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/hostelmanagement');
        // const fetched_data = await mongoose.connection.db.collection('students');
        // fetched_data.find({}).toArray().then((data)=>{
        //     console.log(data);
        // })
        console.log('Successfully Connected to Database');
    } catch (error) {
          console.log('Error Connecting to database');
        handleError(error);
      }
    
}

module.exports = mongoDB;
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/chintan')
.then(()=>console.log('connect database'))
.catch((err)=> console.error(err))
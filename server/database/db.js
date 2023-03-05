const mongoose=require('mongoose');
const config=require('../config/config');

const connect = async() => {
    try{

        mongoose.set('strictQuery', false);
        mongoose
        .connect(config.MONGODB_URL)
        .then(() => console.log('database connected'))
        .catch((err) => console.log(`database not connnected ${err}`))

    }catch(err){
        console.log(err)
    }

}

module.exports=connect()
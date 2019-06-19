import mongoose from 'mongoose';
import Keys from './keys';

let db = mongoose.connect(Keys.mongoURI, {
    useNewUrlParser: true
}).then(()=>console.log('db conneceted...'))
.catch(err=>console.log(err))

module.exports = db;
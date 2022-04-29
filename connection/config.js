import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/inotebook_system');
        console.log("connection successfully");
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;
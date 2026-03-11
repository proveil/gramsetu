import mongoose from "mongoose"

const ConnectDB = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGO USER: ${connection.connection.host}`)
    } catch (error) {
        console.log(`MONGODB ERROR: ${error.message}`);
        process.exit(1);
    }
}

export default ConnectDB;
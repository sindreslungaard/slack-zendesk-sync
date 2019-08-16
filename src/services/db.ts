import mongoose from "mongoose"

export const connect = async () => {

    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false
    })

}
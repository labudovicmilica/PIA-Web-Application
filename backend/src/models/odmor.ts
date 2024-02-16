import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Odmor = new Schema({
    datum: {
        type: Date
    },
    lekar: {
        type: String
    }
})

export default mongoose.model('Odmor', Odmor, 'odmor')
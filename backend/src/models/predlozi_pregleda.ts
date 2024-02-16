import mongoose from "mongoose";

const Schema = mongoose.Schema;

let PredlogPregleda = new Schema({
    naziv: {
        type: String
    },
    spec: {
        type: String
    }
})

export default mongoose.model('PredlogPregleda', PredlogPregleda, 'predlozi_pregleda')
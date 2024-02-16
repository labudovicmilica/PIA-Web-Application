import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Pregled = new Schema({
    naziv: {
        type: String
    },
    trajanje: {
        type: Number
    },
    cena: {
        type: Number
    },
    spec: {
        type: String
    },
    omogucen: {
        type: Boolean
    }
})

export default mongoose.model('Pregled', Pregled, 'pregledi')
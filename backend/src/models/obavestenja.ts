import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Obavestenje = new Schema({
    tekst: {
        type: String
    },
    korisnik: {
        type: String
    },
    procitano: {
        type: Boolean
    },
    id: {
        type: Number
    }
})

export default mongoose.model('Obavestenje', Obavestenje, 'obavestenja')
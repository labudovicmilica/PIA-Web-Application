import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    korisnickoIme: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    lozinka: {
        type: String
    },
    mejl: {
        type: String
    },
    tip: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    },
    licenca: {
        type: String
    },
    spec: {
        type: String
    },
    ogranak: {
        type: String
    },
    status: {
        type: String
    },
    slika: {
        type: String
    },
    pregledi: {
        type: Array
    }
})

export default mongoose.model('User', User, 'korisnici')
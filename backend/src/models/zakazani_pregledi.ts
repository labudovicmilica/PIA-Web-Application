import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ZakazanPregled = new Schema({
    id: {
        type: Number
    },
    naziv: {
        type: String
    },
    lekar: {
        type: String
    },
    pacijent: {
        type: String
    },
    datum_vreme: {
        type: Date
    },
    trajanje: {
        type: Number
    },
    ogranak: {
        type: String
    },
    otkazan: {
        type: Boolean
    }, 
    obav: {
        type: Boolean
    }, 
    spec: {
        type: String
    }
})

export default mongoose.model('ZakazanPregled', ZakazanPregled, 'zakazani_pregledi')
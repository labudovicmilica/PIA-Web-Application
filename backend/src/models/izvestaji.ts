import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Izvestaj = new Schema({
    idPregleda: {
        type: Number
    },
    nazivPregleda: {
        type: String
    },
    datum_vreme: {
        type: Date
    },
    lekar: {
        type: String
    },
    spec: {
        type: String
    },
    pacijent: {
        type: String
    },
    razlogDolaska: {
        type: String
    },
    dijagnoza: {
        type: String
    },
    terapija: {
        type: String
    },
    kontrola: {
        type: Date
    }
})

export default mongoose.model('Izvestaj', Izvestaj, 'izvestaji')
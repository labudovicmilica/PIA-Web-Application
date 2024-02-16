import * as express from 'express';
import User from '../models/user'
import Pregled from '../models/pregledi';
import ZakazanPregled from '../models/zakazani_pregledi';
import Obavestenje from '../models/obavestenja';
import PredlogPregleda from '../models/predlozi_pregleda';
import Izvestaj from '../models/izvestaji';
import Odmor from '../models/odmor';

export class LekarController {

    izmeni = (req: express.Request, res: express.Response) => {
        let user = new User(req.body);

        User.deleteOne({'korisnickoIme': req.body.korisnickoIme}, (err, resp)=>{
            user.save()
        });
    }

    promeniSliku = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let slika = req.body.slika;

        User.collection.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'slika': slika}});
    }

    dohvatiPreglede = (req: express.Request, res: express.Response) => {
        let spec = req.body.spec;

        Pregled.find({'spec': spec, 'omogucen': true}, (err, resp)=>{
            if (err) console.log(err);
            else res.json(resp)
        })

    }

    izmeniPreglede = (req: express.Request, res: express.Response) => {
        let pregledi = req.body.pregledi;
        let korisnickoIme = req.body.korisnickoIme;

        User.collection.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'pregledi': pregledi}});

        res.json({'message': 'ok'});

    }

    dohvatiPredstojecePreglede = (req: express.Request, res: express.Response) => {
        let lekar =req.body.lekar
        let datum = new Date();
        ZakazanPregled.find({'lekar': lekar, 'otkazan': false}).sort({'datum_vreme': 1}).then(pregl =>{
            
            res.json(pregl);
        })
    }

    otkaziPregled = (req: express.Request, res: express.Response) => {
        let id = req.body.id
        let obrazlozenje = req.body.obrazlozenje

        ZakazanPregled.collection.updateOne({'id': id}, {$set: {otkazan: true}})

        ZakazanPregled.collection.findOne({'id': id}, (err, resp)=>{
            let datum = new Date(resp.datum_vreme).toLocaleString().slice(0,resp.datum_vreme.toLocaleString().lastIndexOf(":"));
            let tekst = "Vaš pregled: " + resp.naziv + " zakazan za " + datum +  " je otkazan uz obrazlozenje lekara: " + obrazlozenje;
            let maxId = 0;
            Obavestenje.find({}).sort({'id': -1}).limit(1).then(max=>{
                if(max){
                    maxId = parseInt(max[0].id)+ 1;
                }
                let obavestenje = new Obavestenje({
                    tekst: tekst,
                    procitano: false,
                    korisnik: resp.pacijent,
                    id: maxId
                })
                obavestenje.save().then((resp)=>{
                })
            })

        })

        res.json({'message': 'ok'})
    }

    predloziPregled = (req: express.Request, res: express.Response) => {
        let predlog = new PredlogPregleda(req.body);

        predlog.save((err,resp)=>{
            if(err) console.log(err);
            else res.json(resp);
        })
    }

    unesiIzvestaj = (req: express.Request, res: express.Response) => {
        let izvestaj = new Izvestaj(req.body);

        ZakazanPregled.findOne({'id': req.body.idPregleda}).then(resp=>{
            izvestaj.nazivPregleda = resp.naziv;
            izvestaj.datum_vreme = resp.datum_vreme;
            izvestaj.save((err, resp)=>{
                if(err) console.log(err);
                else res.json(resp);
            })
        })
    }

    slobodanDan = (req: express.Request, res: express.Response) => {
        let sl = new Odmor(req.body)
        let lekar = req.body.lekar;
        let datum = new Date(req.body.datum)
        let razlog = req.body.razlog

        sl.save();

        ZakazanPregled.find({'lekar': lekar, 'otkazan': false}).then(pregledi=>{
            let maxId = 0;
            Obavestenje.find({}).sort({'id': -1}).limit(1).then(max=>{
                maxId = max[0].id + 1;
                pregledi.forEach(pr=>{
                    let dat1 = new Date(pr.datum_vreme)
                    

                    if (datum.toDateString() == dat1.toDateString()){
                        let obavestenje = new Obavestenje({
                            tekst: "Pregled: " + pr.naziv + " zakazan za " + dat1.toLocaleString().slice(0, dat1.toLocaleString().lastIndexOf(":")) + " je otkazan, jer je lekar uzeo " + razlog + ". Molimo Vas da pregled zakažete u drugom terminu.",
                            procitano: false,
                            korisnik: pr.pacijent,
                            id: maxId
                        })
                        obavestenje.save();
                        maxId++;
                        ZakazanPregled.collection.updateOne({'id': pr.id}, {$set: {'otkazan': true}})
                    }
                })
            })
        })


        res.json({'msg': 'ok'})



    }



}
import * as express from 'express';
import User from '../models/user'
import Pregled from '../models/pregledi';
import ZakazanPregled from '../models/zakazani_pregledi';
import Obavestenje from '../models/obavestenja';
import Odmor from '../models/odmor';

export class PacijentController {

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

    dohvatiLekare = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let spec = req.body.spec;
        let ogranak = req.body.ogranak;

        User.find({'ime': {$regex: ime}, 'prezime': {$regex: prezime}, 'spec': {$regex: spec}, 'ogranak': {$regex: ogranak}, 'status': 'odobren'}, (err, resp)=>{
            if (err) console.log(err);
        else res.json(resp)
        })
    }

    zakaziPregled = (req: express.Request, res: express.Response) => {
        let pregled = new ZakazanPregled(req.body);
        let maxId = 0;
        ZakazanPregled.find({}).sort({id: -1}).limit(1).then(max=>{
            maxId = parseInt(max[0].id)+ 1;
            pregled.id = maxId;

            
            let svi;
            let datumPregleda = new Date(req.body.datum_vreme);
            let datumPregledaKraj = new Date(req.body.datum_vreme);
            let trajanje = req.body.trajanje;
            datumPregledaKraj.setMinutes(datumPregleda.getMinutes()+trajanje);
            let flag = false;

            Odmor.find({'lekar': req.body.lekar}).then(odmori=>{
                let datumpr = datumPregleda.toLocaleDateString();
                odmori.forEach(o=>{
                    let datum = new Date(o.datum)
                    if(datum.toLocaleDateString() == datumpr){
                       flag = true;
                    }
                })
            }).catch(err=>{
                console.log(err)
            })

            ZakazanPregled.find({'lekar': req.body.lekar, 'otkazan': false}).sort({'datum_vreme': -1}).then(pr=>{
                svi = pr;
                svi.forEach(p => {
                    let datum = new Date(p.datum_vreme);
                    let datumKraj = new Date(p.datum_vreme);
                    
                    datumKraj.setMinutes(datum.getMinutes()+p.trajanje);
                    if(datum.toLocaleString() === datumPregleda.toLocaleString()){
                        flag = true;
                    } else if(datum < datumPregleda && datumKraj > datumPregleda){
                        flag = true;
                    } else if(datumPregleda < datum && datumPregledaKraj > datum) {
                        flag = true;
                    }
                });
                if(!flag){
                    pregled.save((err, resp)=>{
                        if(err){
                            console.log(err)
                        } else{
                            res.json({'message': 'ok'});
                        }
                    })
                } else{
                    res.json({'message': 'not_ok'})
                }
            });
        });



    }

    dohvatiPreglede = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent;

        ZakazanPregled.find({'pacijent': pacijent, 'otkazan': false}).sort({'datum_vreme': 1}).then(pregl =>{
            res.json(pregl);
        })

    }

    otkaziPregled = (req: express.Request, res: express.Response) => {
        let id = req.body.id

        ZakazanPregled.collection.updateOne({'id': id}, {$set: {otkazan: true}})

        res.json({'message': 'ok'})
    }

    dohvatiObavestenja = (req: express.Request, res: express.Response) => {
        let korisnik = req.body.korisnik
        let flag = false;
        let maxId;

        Obavestenje.find({'korisnik': korisnik},).sort({'id':-1}).then(obav=>{
            if(obav){
                maxId = obav[0].id;
                flag = true;
                Obavestenje.collection.updateMany({'korisnik':korisnik, 'id':{$lte: maxId}}, {$set: {'procitano': true}})
            }
            res.json(obav);
        })


    }

    automatskiPodsetnik = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent;
        let sad = new Date();
        let sutra = new Date();
        sutra.setDate(sutra.getDate()+1);

        ZakazanPregled.find({'pacijent': pacijent, 'otkazan': false, 'obav': false}).then(pregledi=>{
            let maxId = 0;
            Obavestenje.find({}).sort({'id': -1}).limit(1).then(max=>{
                maxId = max[0].id + 1;
                pregledi.forEach(pr=>{
                    
                    let dat = new Date(pr.datum_vreme);
                    if(dat<=sutra){
                        //console.log("hello");
                    
                        let obavestenje = new Obavestenje({
                            tekst: "Automatski podsetnik 24h pre pregleda: " + pr.naziv + ". Vaš pregled je zakazan za " + dat.toLocaleString().slice(0, dat.toLocaleString().lastIndexOf(":")) + ".",
                            procitano: false,
                            korisnik: pr.pacijent,
                            id: maxId
                        })
                        obavestenje.save();
                        maxId++;
                    
                        ZakazanPregled.collection.updateOne({'id': pr.id}, {$set: {'obav': true}})
                    }
                    
                })
            })
        })
        res.json({'msg': 'ok'})
    }






}
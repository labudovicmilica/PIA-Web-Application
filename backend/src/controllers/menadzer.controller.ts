import * as express from 'express';
import User from '../models/user'
import Pregled from '../models/pregledi';
import Izvestaj from '../models/izvestaji';
import ZakazanPregled from '../models/zakazani_pregledi';
import Obavestenje from '../models/obavestenja';
import Specijalizacija from '../models/specijalizacije';
import PredlogPregleda from '../models/predlozi_pregleda';
import obavestenja from '../models/obavestenja';

export class MenadzerController {
    
    dohvatiZahteveZaRegistraciju = (req: express.Request, res: express.Response) => {
        

        User.find({ 'status': 'cekanje'}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    odgovorNaZahtev = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let flag = req.body.flag;
        if(flag){
            User.collection.updateOne({'korisnickoIme': korisnickoIme}, {$set:{'status': 'odobren'}});
        } else{
            User.collection.updateOne({'korisnickoIme': korisnickoIme}, {$set:{'status': 'odbijen'}});
        }
        

        res.json({'message': 'ok'});
    }

    dohvatiSve = (req: express.Request, res: express.Response) => {

        User.find({'status': 'odobren'}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
        })
    }

    obrisiKorisnika = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;


        User.collection.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'status': 'obrisan'}})

        ZakazanPregled.find({'pacijent': korisnickoIme}).then(pregledi=>{
            pregledi.forEach(pr=>{
                ZakazanPregled.collection.updateOne({'id': pr.id}, {$set: {otkazan: true}})
            })
        })
        ZakazanPregled.find({'lekar': korisnickoIme}).then(pregledi=>{
            pregledi.forEach(pr=>{
                ZakazanPregled.collection.updateOne({'id': pr.id}, {$set: {otkazan: true}})
                let datum = new Date(pr.datum_vreme)
                let obavestenje = new Obavestenje({
                    korisnik: pr.pacijent,
                    procitano: false,
                    tekst: "Pregled: " + pr.naziv + " zakzan za " + datum.toLocaleString().slice(0, datum.toLocaleString().lastIndexOf(":")) + " je otkazan jer je nalog lekara obrisan."
                })

                obavestenje.save();
            })
        })
        res.json({'message': 'ok'})
    }

    izmeniKorisnika = (req: express.Request, res: express.Response) => {
        let user = new User(req.body);

        User.deleteOne({'korisnickoIme': req.body.korisnickoIme}, (err, resp)=>{
            user.save()
        });
    }


    addUser = (req: express.Request, res: express.Response) => {
        let user = new User(
            {
                ime: req.body.ime,
                prezime: req.body.prezime,
                korisnickoIme: req.body.korisnickoIme,
                lozinka: req.body.lozinka,
                mejl: req.body.mejl,
                adresa: req.body.adresa,
                telefon: req.body.telefon,
                slika: req.body.slika,
                tip: "lekar",
                status: "odobren",
                licenca: req.body.licenca,
                spec: req.body.spec,
                ogranak: req.body.ogranak,
                pregledi: []
                
            }
        )

        user.save((err, resp)=>{
            if(err){ 
                console.log(err);
            }
            else res.json({"message": "ok"})
        })
    }

    dodajSpec = (req: express.Request, res: express.Response) => {
        let specijalizacija = new Specijalizacija(req.body);

        specijalizacija.save((err,resp)=>{
            if(err) console.log(err);
            else res.json(resp)
        })
    }

    dohvatiSveSpec = (req: express.Request, res: express.Response) => {

        Specijalizacija.find({}).then(spec=>{
            res.json(spec)
        })

    }

    onemoguciPregled = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv
        let spec = req.body.spec

        Pregled.collection.updateOne({'naziv': naziv, 'spec': spec, 'omogucen': true},{$set: {'omogucen': false}})

        res.json({'msg': 'ok'})

    }

    azurirajPregled = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv
        let spec = req.body.spec
        let cena = parseInt(req.body.cena)
        let trajanje = parseInt(req.body.trajanje)
        let staraCena = parseInt(req.body.staraCena)

        if(cena != staraCena){
            ZakazanPregled.find({'spec': spec, 'naziv': naziv, 'otkazan': false}, (err, pregledi)=>{
                let maxId = 0;
                Obavestenje.find({}).sort({'id': -1}).limit(1).then(max=>{
                    maxId = max[0].id + 1;
                    pregledi.forEach(pr=>{

                        let obavestenje = new Obavestenje({
                            tekst: "Cena pregleda: " + pr.naziv + " je promenjena i sada iznosi " + cena + " dinara.",
                            procitano: false,
                            korisnik: pr.pacijent,
                            id: maxId
                        })
                        obavestenje.save();
                        maxId++;
                    })
                })
            });

        }

        ZakazanPregled.collection.updateMany({'naziv': naziv, 'spec': spec},{$set: {'trajanje': trajanje}})

        Pregled.collection.updateOne({'naziv': naziv, 'spec': spec},{$set: {'cena': cena}})
        Pregled.collection.updateOne({'naziv': naziv, 'spec': spec},{$set: {'trajanje': trajanje}})



        
        res.json({'msg': 'ok'})

    }

    dodajPregled = (req: express.Request, res: express.Response) => {
        let pregled = new Pregled(req.body)

        pregled.save((err,resp)=>{
            if(err) console.log(err)
            else res.json(resp)
        })

    }

    zahteviZaPreglede = (req: express.Request, res: express.Response) => {

        PredlogPregleda.find({}).then(pr=>{
            res.json(pr)
        })
    }

    odbijPregled = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv
        let spec = req.body.spec

        PredlogPregleda.deleteOne({'spec': spec, 'naziv': naziv}, (err,resp)=>{
            if(err) console.log(err)
            else res.json(resp);
        })
    }

    dodajAkciju = (req: express.Request, res: express.Response) => {
        let akcija = req.body.akcija

        User.find({'tip': 'pacijent', 'status': 'odobren'}).then(users=>{
            let maxId = 0;
            Obavestenje.find({}).sort({'id': -1}).limit(1).then(max=>{
                if(max){
                    maxId = parseInt(max[0].id)+ 1;
                }
                users.forEach(user=>{
                    let obavestenje = new Obavestenje({
                        tekst: akcija,
                        korisnik: user.korisnickoIme,
                        procitano: false,
                        id: maxId
                    })
                    maxId++;

                    obavestenje.save();
                })
            })
        })

        res.json({'msg': 'ok'})

    }



}
import * as express from 'express';
import User from '../models/user'
import Pregled from '../models/pregledi';
import Izvestaj from '../models/izvestaji';

export class UserController {
    
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({ 'korisnickoIme': username, 'lozinka': password }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.findOne({ 'korisnickoIme': username }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    checkMejl = (req: express.Request, res: express.Response) => {
        let mejl = req.body.mejl;

        User.findOne({ 'mejl': mejl }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
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
                tip: "pacijent",
                status: "cekanje",
                licenca: null,
                spec: null,
                ogranak: null,
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


    dohvatiLekare = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let spec = req.body.spec;

        User.find({'ime': {$regex: ime}, 'prezime': {$regex: prezime}, 'spec': {$regex: spec}}, (err, books)=>{
            if (err) console.log(err);
        else res.json(books)
        })
    }

    promeniLozinku = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka

        User.collection.updateOne({'korisnickoIme': korisnickoIme}, {$set: {'lozinka': lozinka}});
    }

    dohvatiPregled = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let spec = req.body.spec

        Pregled.findOne({'naziv': naziv, 'spec': spec}, (err, resp)=>{
            if (err) console.log(err);
            else res.json(resp)
        })

    }

    dohvatiIzvestajeZaPacijenta = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent;

        Izvestaj.find({'pacijent': pacijent}).sort({'datum_vreme': -1}).then(izv =>{
            res.json(izv);
        })

    }

    dohvatiIzvestajeZaLekara = (req: express.Request, res: express.Response) => {
        let lekar = req.body.lekar;

        Izvestaj.find({'lekar': lekar}).sort({'datum_vreme': -1}).then(izv =>{
            res.json(izv);
        })

    }
    
}
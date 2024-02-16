import express from 'express';
import { UserController } from '../controllers/user.controller';
import { MenadzerController } from '../controllers/menadzer.controller';
const menadzerRouter = express.Router();


menadzerRouter.route('/dohvatiZahteveZaRegistraciju').post(
    (req, res) => new MenadzerController().dohvatiZahteveZaRegistraciju(req, res)
)

menadzerRouter.route('/odgovorNaZahtev').post(
    (req, res) => new MenadzerController().odgovorNaZahtev(req, res)
)

menadzerRouter.route('/dohvatiSve').post(
    (req, res) => new MenadzerController().dohvatiSve(req, res)
)

menadzerRouter.route('/obrisiKorisnika').post(
    (req, res) => new MenadzerController().obrisiKorisnika(req, res)
)

menadzerRouter.route('/izmeniKorisnika').post(
    (req, res) => new MenadzerController().izmeniKorisnika(req, res)
)

menadzerRouter.route('/addUser').post(
    (req, res) => new MenadzerController().addUser(req, res)
)

menadzerRouter.route('/dodajSpec').post(
    (req, res) => new MenadzerController().dodajSpec(req, res)
)

menadzerRouter.route('/dohvatiSveSpec').post(
    (req, res) => new MenadzerController().dohvatiSveSpec(req, res)
)

menadzerRouter.route('/onemoguciPregled').post(
    (req, res) => new MenadzerController().onemoguciPregled(req, res)
)

menadzerRouter.route('/azurirajPregled').post(
    (req, res) => new MenadzerController().azurirajPregled(req, res)
)

menadzerRouter.route('/dodajPregled').post(
    (req, res) => new MenadzerController().dodajPregled(req, res)
)

menadzerRouter.route('/zahteviZaPreglede').post(
    (req, res) => new MenadzerController().zahteviZaPreglede(req, res)
)

menadzerRouter.route('/odbijPregled').post(
    (req, res) => new MenadzerController().odbijPregled(req, res)
)

menadzerRouter.route('/dodajAkciju').post(
    (req, res) => new MenadzerController().dodajAkciju(req, res)
)



export default menadzerRouter;
import express from 'express';
import { PacijentController } from '../controllers/pacijent.controller';
const pacijentRouter = express.Router();


pacijentRouter.route('/izmeni').post(
    (req, res) => new PacijentController().izmeni(req, res)
)

pacijentRouter.route('/promeniSliku').post(
    (req, res) => new PacijentController().promeniSliku(req, res)
)

pacijentRouter.route('/dohvatiLekare').post(
    (req, res) => new PacijentController().dohvatiLekare(req, res)
)

pacijentRouter.route('/zakaziPregled').post(
    (req, res) => new PacijentController().zakaziPregled(req, res)
)

pacijentRouter.route('/dohvatiPreglede').post(
    (req, res) => new PacijentController().dohvatiPreglede(req, res)
)

pacijentRouter.route('/otkaziPregled').post(
    (req, res) => new PacijentController().otkaziPregled(req, res)
)

pacijentRouter.route('/dohvatiObavestenja').post(
    (req, res) => new PacijentController().dohvatiObavestenja(req, res)
)

pacijentRouter.route('/automatskiPodsetnik').post(
    (req, res) => new PacijentController().automatskiPodsetnik(req, res)
)






export default pacijentRouter;
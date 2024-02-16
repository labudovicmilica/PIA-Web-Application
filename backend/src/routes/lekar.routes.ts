import express from 'express';
import { LekarController } from '../controllers/lekar.controller';

const lekarRouter = express.Router();


lekarRouter.route('/izmeni').post(
    (req, res) => new LekarController().izmeni(req, res)
)

lekarRouter.route('/promeniSliku').post(
    (req, res) => new LekarController().promeniSliku(req, res)
)

lekarRouter.route('/dohvatiPreglede').post(
    (req, res) => new LekarController().dohvatiPreglede(req, res)
)

lekarRouter.route('/izmeniPreglede').post(
    (req, res) => new LekarController().izmeniPreglede(req, res)
)

lekarRouter.route('/dohvatiPredstojecePreglede').post(
    (req, res) => new LekarController().dohvatiPredstojecePreglede(req, res)
)

lekarRouter.route('/otkaziPregled').post(
    (req, res) => new LekarController().otkaziPregled(req, res)
)

lekarRouter.route('/predloziPregled').post(
    (req, res) => new LekarController().predloziPregled(req, res)
)

lekarRouter.route('/unesiIzvestaj').post(
    (req, res) => new LekarController().unesiIzvestaj(req, res)
)

lekarRouter.route('/slobodanDan').post(
    (req, res) => new LekarController().slobodanDan(req, res)
)

export default lekarRouter;
import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/getUser').post(
    (req, res) => new UserController().getUser(req, res)
)

userRouter.route('/checkMejl').post(
    (req, res) => new UserController().checkMejl(req, res)
)

userRouter.route('/addUser').post(
    (req, res) => new UserController().addUser(req, res)
)

userRouter.route('/dohvatiLekare').post(
    (req, res) => new UserController().dohvatiLekare(req, res)
)

userRouter.route('/promeniLozinku').post(
    (req, res) => new UserController().promeniLozinku(req, res)
)

userRouter.route('/dohvatiPregled').post(
    (req, res) => new UserController().dohvatiPregled(req, res)
)

userRouter.route('/dohvatiIzvestajeZaPacijenta').post(
    (req, res) => new UserController().dohvatiIzvestajeZaPacijenta(req, res)
)

userRouter.route('/dohvatiIzvestajeZaLekara').post(
    (req, res) => new UserController().dohvatiIzvestajeZaLekara(req, res)
)

export default userRouter;
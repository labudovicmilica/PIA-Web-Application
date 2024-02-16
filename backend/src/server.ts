import express, { Router } from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';
import multer from 'multer';
import pacijentRouter from './routes/pacijent.route';
import lekarRouter from './routes/lekar.routes';
import menadzerRouter from './routes/menadzer.routes';


const app = express();
app.use(cors())
app.use(express.json())

const path = require("path")
app.use("/uploads", express.static(path.join("./src/uploads")))

mongoose.connect('mongodb://127.0.0.1:27017/projekat')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = Router();

router.use('/user', userRouter)
router.use('/pacijent', pacijentRouter)
router.use('/lekar', lekarRouter)
router.use('/menadzer', menadzerRouter)



app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));

app.listen(3000, () => {
    console.log("The server started on port 3000 !!!!!!");
});

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './src/uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage })

app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req['file'];
    if (!file) {
      const error = new Error('No File')
      error['httpStatusCode'] = 400
      return next(error)
    }
      //res.send(file);
      res.json({"filename": file.filename} );
  })
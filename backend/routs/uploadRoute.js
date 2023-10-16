import express from "express";
import multer from "multer";
import path from "path";
import fs from 'fs/promises';

const upLoadsRoute = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {

        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const filter = (req, file, cb) => {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (extname && mimetype) {
        cb(null, true)
    } else {
        cb(new Error('Images only'), false)
    }
}
const upload = multer({ storage: storage, fileFilter: filter });


upLoadsRoute.post('/', upload.single('image'), (req, res) => {
    // console.log(req.file.path);
    // console.log(req.file.filename);
    res.send(`/${req.file.path}`)
})

upLoadsRoute.delete('/remove', async(req, res) => {
    console.log(req.query);

    const { filename } = req.query
    const __dirname = "./uploads"
    const filePath = path.join(__dirname, filename)
    try {
       await fs.unlink(filePath)
        res.json({ message: "delete successfully" })

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete the file' });
    }


})
export default upLoadsRoute
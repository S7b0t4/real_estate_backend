import { fileURLToPath } from 'url'
import { dirname } from 'path'

import Express from 'express'

import path from 'path'
import multer from 'multer'

const uploadImg = (app) => {

	const __filename = fileURLToPath(import.meta.url)
	const __dirname = dirname(__filename)

	const uploadDirectory = path.join(__dirname, "../uploads")

	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, uploadDirectory)
		},
		filename: function (req, file, cb) {
			cb(null, file.originalname)
		}
	})

	const upload = multer({ storage: storage })
	app.use('/uploads', Express.static(uploadDirectory))

	const srcDirectory = path.join(__dirname, 'src')

	app.use('/src', Express.static(srcDirectory)) 

	app.post("/post-photo", upload.single('file'), async (req, res) => {
		res.set("Access-Control-Allow-Origin", "*")
		console.log(req.body)
		res.status(200).json("Successful")
	})
}
export default uploadImg
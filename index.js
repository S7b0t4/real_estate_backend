import Express from 'express'
import mongoose from 'mongoose'
import Post from './Post.js'
import cors from 'cors'
import fs from 'fs'
import fetch from 'node-fetch'

import uploadImg from "./tamplate/uploadImg.js"

const corsOrigin = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionSuccessStatus: 200
}

const DB_URL = "mongodb+srv://S7b0t4:228008@cluster0.cpkfqq3.mongodb.net/?retryWrites=true&w=majority"

const PORT = 5000

const app = Express()

app.use(cors(corsOrigin))
app.use(Express.json())

uploadImg(app)

async function startApp() {
	console.log("server is starting")
	try {
		await mongoose.connect(DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		app.listen(PORT, () => console.log("Server has been started on", PORT))
	}
	catch (e) {
		console.log(e)
	}
}
const addToDB = async (req, res) => {
	console.log(req.body)
	try {
		const { title, subTitle, sell, rent, link, img, squareImg, mainIMG, filterTag, compInfo, cost, infoNumber, iconMapIMG, tag, textInfo, linkInfo, } = req.body
		const post = await Post.create({ title, subTitle, sell, rent, link, img, squareImg, mainIMG, filterTag, compInfo, cost, infoNumber, iconMapIMG, tag, textInfo, linkInfo })
		res.status(200).json(post)
	} catch (e) {
		console.log(e)
	}
}
startApp()

app.get("/", async (req, res) => {
	const Posts = await Post.find()
	res.set("Access-Control-Allow-Origin", "*")
	res.json(Posts)
})

const getRandomElementsFromArray = (arr, numElements) => {
	numElements = Math.min(numElements, arr.length)
	const copyArray = [...arr]
	const randomElements = []
	for (let i = 0; i < numElements; i++) {
		const randomIndex = Math.floor(Math.random() * copyArray.length)
		randomElements.push(copyArray.splice(randomIndex, 1)[0])
	}
	return randomElements
}

app.get("/random", async (req, res) => {
	const Posts = await Post.find()
	res.set("Access-Control-Allow-Origin", "*")
	const randomElements = getRandomElementsFromArray(Posts, 4)
	res.json(randomElements)
})

app.get("/get-data", async (req, res) => {
	res.set("Access-Control-Allow-Origin", "*")
	fs.readdir(uploadDirectory, (err, files) => {
		if (err) {
			return res.status(500).send('Ошибка чтения папки загрузок')
		}
		res.send(files)
	})
})

app.post("/delete", (req, res) => {
	try {
		Post.deleteMany({ minimum_nights: "2" }).then((result) => {
			console.log(result)
			res.status(200).json("Successful")
		})
	} catch (e) {
		res.status(500).json(e)
	}
})

app.post("/", (req, res) => {
	res.set("Access-Control-Allow-Origin", "*")
	console.log(req.body)
	addToDB(req, res)
})

let ethCoin = 0
let btcCoin = 0
let usdtCoin = 0

const getCoin = (i, link, key) => {
	fetch(link, {
		headers: {
			"X-CoinAPI-Key": key
		}
	})
		.then(response => response.json())
		.then(data => {
			if (i === "ethCoin") {
				ethCoin = "~$" + data.rate.toFixed(2)
			}
			if (i === "btcCoin") {
				btcCoin = "~$" + data.rate.toFixed(2)
			}
			if (i === "usdtCoin") {
				usdtCoin = "~$" + data.rate.toFixed(9)
			}
		})
		.catch(error => console.error('Error:', error))
}

getCoin("ethCoin", 'https://rest.coinapi.io/v1/exchangerate/ETH/USD', "8BCFCBCB-2BDA-4F41-9B8A-D80C5020178F")
getCoin("btcCoin", 'https://rest.coinapi.io/v1/exchangerate/BTC/USD', "D8EA801D-388D-4FFE-86E8-75EDEDD725F3")
getCoin("usdtCoin", 'https://rest.coinapi.io/v1/exchangerate/USDT/USD', "5D1FBF83-4612-4B21-B5D8-CDD46B55AD7D")



app.get("/coins", async (req, res) => {
	res.set("Access-Control-Allow-Origin", "*")
	res.send([
		{
			valueText: btcCoin,
			valueIMG: "uploads/iconBitCoin.svg",
		},
		{
			valueText: ethCoin,
			valueIMG: "uploads/iconEffir.svg",
		},
		{
			valueText: usdtCoin,
			valueIMG: "uploads/iconTcoin.svg",
		}
	])
})

app.get('/:id', async (req, res) => {
	res.set("Access-Control-Allow-Origin", "*")
	const Posts = await Post.find()
	const id = req.params.id
	const obj = Posts.find(obj => obj._id.toString() === id)
	res.send(obj)
})
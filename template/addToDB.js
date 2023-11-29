import Post from '../Post.js'
const addToDB = async (req, res) => {
	console.log("try to add to DB")
	try {
		console.log("connect to DB")
		console.log(req.body)
		const { title, subTitle, type, sell, rent, squareImg, mainIMG, filterTag, compInfo, cost, infoNumber, iconMapIMG, tag, textInfo, linkInfo, } = req.body
		const post = await Post.create({ title, subTitle, type, sell, rent, squareImg, mainIMG, filterTag, compInfo, cost, infoNumber, iconMapIMG, tag, textInfo, linkInfo })
		res.status(200)
		console.log("add to DB")
	} catch (e) {
		console.log(e)
	}
}

export default addToDB
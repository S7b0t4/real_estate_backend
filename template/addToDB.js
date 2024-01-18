import Post from '../Post.js'
const addToDB = async (req, res) => {
	console.log("try to add to DB")
	try {
		console.log("connect to DB")
		const { title, subTitle, type, sell, rent, squareImg, mainIMG, filterTag, compInfo, cost, infoNumbers, iconMapIMG, tag, textInfo, linkInfo, } = req.body
		await Post.create({ title, subTitle, type, sell, rent, squareImg, mainIMG, filterTag, compInfo, cost, infoNumbers, iconMapIMG, tag, textInfo, linkInfo })
		res.status(200)
		console.log("add to DB")
	} catch (e) {
		console.log(e)
	}
}

export default addToDB
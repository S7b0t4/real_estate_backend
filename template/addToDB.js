import Post from '../Post.js'
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

export default addToDB
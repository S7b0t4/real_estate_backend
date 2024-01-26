import Post from '../Post.js'
const addToDB = async (req, res) => {
	console.log("try to add to DB")
	try {
		console.log("connect to DB")
		await Post.create(req.body)
		res.status(200)
		console.log("add to DB")
	} catch (e) {
		console.log(e)
	}
}

export default addToDB
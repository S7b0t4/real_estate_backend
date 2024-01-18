import Post from '../Post.js'

const filtration = ( app ) => {
	app.post("/get-filter", async (req, res) => {
		res.set("Access-Control-Allow-Origin", "*")
		let filter = {}
		req = req.body
		console.log(req)
		if (req.sortBy == "Buy"){
			filter.sell = req.priceRange
		}
		if (req.sortBy == "All"){
			filter.sell = req.priceRange
		}
		if (req.sortBy == "Rent"){
			filter.rent = req.priceRange
		}
		const Posts = await Post.find(filter)
		res.send(Posts)
	})
};

export default filtration;

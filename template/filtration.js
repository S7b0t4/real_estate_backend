import Post from '../Post.js'

const filtration = ( app ) => {
	app.post("/real-estate-backend/get-filter", async (req, res) => {
		res.set("Access-Control-Allow-Origin", "*")
		let filter = {}
		req = req.body

		const yearOfConstruction = req.yearOfConstruction
		const squares = req.squares

		if (!req.idontcare){
			if (req.sortBy == "Buy"){
				filter.sell = req.priceRange
			}
			if (req.sortBy == "All"){
				filter.$or = [
					{ sell: req.priceRange },
					{ rent: req.priceRange }
				]
			}
			if (req.sortBy == "Rent"){
				filter.rent = req.priceRange
			}
		}
		if (yearOfConstruction !== ""){
			filter.yearOfConstruction = yearOfConstruction
		}
		if (squares !== ""){
			filter.squares = squares
		}
		if (req.bedRoomCount){
			filter.bedrooms = req.bedRoomCount
		}
		if(req.country){
			filter.country = req.country
		}
		if(req.city){
			filter.city = req.city
		}
		if(req.readymove || req.beingbuild){
			filter.specialInfo = [{
				"title":"readytomove",
				"value":false
			},{
				"title":"construction",
				"value":false
			}]
		}
		if(req.readymove){
			filter.specialInfo[0].value = req.readymove
		}
		if(req.beingbuild){
			filter.specialInfo[1].value = req.beingbuild
		}
		const Posts = await Post.find(filter)
		res.send(Posts)
	})
};

export default filtration;

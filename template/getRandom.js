import Post from '../Post.js'
const getRandom = (app) =>{
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
}

export default getRandom
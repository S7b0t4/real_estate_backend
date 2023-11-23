import mongoose from 'mongoose';

const Post = new mongoose.Schema({
		title: {type: String, required: true},
		subTitle: {type: String, required: true},
		type: {type: Array, required: true},
		sell: {type: String, required: true},
		rent: {type: String, required: true},
		squareImg: {type: Array, required: true},
		mainIMG: {type: Array, required: true},
		filterTag: {type: Array, required: true},
		compInfo: {type: Array, required: true},
		cost: {type: Array, required: true},
		infoNumber: {type: Array, required: true},
		iconMapIMG: {type: Array, required: true},
		tag: {type: Array, required: true}, 
		textInfo:{type: Array, required: true},
		linkInfo: {type: String, required: true},
})

export default mongoose.model("Post", Post)
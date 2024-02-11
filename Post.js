import mongoose from 'mongoose';

const Post = new mongoose.Schema({
		title: {type: String, required: true},
		subTitle: {type: String, required: true},
		type: {type: Array, required: true},
		sell: {type: Number, required: false},
		number: {type: String, required: true},
		mail: {type: String, required: true},
		rent: {type: Number, required: false},
		country: {type: String, required: true},
		city: {type: String, required: true},
		yearOfConstruction: {type: String, required: true},
		squares: {type: String, required: true},
		bedrooms: {type: String, required: true},
		specialInfo: {type: Array, required: true},
		infoNumbers: {type: Array, required: true},
		squareImg: {type: Array, required: true},
		mainIMG: {type: Array, required: true},
		filterTag: {type: Array, required: true},
		compInfo: {type: Array, required: true},
		cost: {type: Array, required: true},
		tag: {type: Array, required: true}, 
		textInfo:{type: Array, required: true},
})

export default mongoose.model("Post", Post)
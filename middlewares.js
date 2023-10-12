import colors from "colors"

export function requestTime( req, res, next ){
	console.log(colors.bgRed.black("req.time :",Date.now()))
}

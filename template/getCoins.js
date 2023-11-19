const getCoins = (app) => {
	let ethCoin = 0
	let btcCoin = 0
	let usdtCoin = 0

	const getCoin = (i, link, key) => {
		fetch(link, {
			headers: {
				"X-CoinAPI-Key": key
			}
		})
			.then(response => response.json())
			.then(data => {
				if (i === "ethCoin") {
					ethCoin = "~$" + data.rate.toFixed(2)
				}
				if (i === "btcCoin") {
					btcCoin = "~$" + data.rate.toFixed(2)
				}
				if (i === "usdtCoin") {
					usdtCoin = "~$" + data.rate.toFixed(9)
				}
			})
			.catch(error => console.error('Error:', error))
	}

	getCoin("ethCoin", 'https://rest.coinapi.io/v1/exchangerate/ETH/USD', "8BCFCBCB-2BDA-4F41-9B8A-D80C5020178F")
	getCoin("btcCoin", 'https://rest.coinapi.io/v1/exchangerate/BTC/USD', "D8EA801D-388D-4FFE-86E8-75EDEDD725F3")
	getCoin("usdtCoin", 'https://rest.coinapi.io/v1/exchangerate/USDT/USD', "5D1FBF83-4612-4B21-B5D8-CDD46B55AD7D")



	app.get("/coins", async (req, res) => {
		res.set("Access-Control-Allow-Origin", "*")
		res.send([
			{
				valueText: btcCoin,
				valueIMG: "uploads/iconBitCoin.svg",
			},
			{
				valueText: ethCoin,
				valueIMG: "uploads/iconEffir.svg",
			},
			{
				valueText: usdtCoin,
				valueIMG: "uploads/iconTcoin.svg",
			}
		])
	})

}

export default getCoins
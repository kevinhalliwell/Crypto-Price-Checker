//Coincode api used to get crypto prices

let coin = "" //string for coin cell
let coinPrice = "" //string for price cell
let coinPercent = "" //string for percent cell
let num = 0 //id in the array
let symbol = "" // string for symbol cell
let coinHigh = "" // string for 24 hr high
let coinLow = "" // string for 24 hr high
let coinVolume = "" // string for volume

// helper function to get name and symbol
function coinData(d, coin, num, symbol){
	document.querySelector('#' + coin).innerText = d.data[num].name
	document.querySelector('#' + symbol).innerText = d.data[num].symbol
}

// helper function to get the complete coin data
function coinDataComplete(coinPrice, coinPercent, coinTest, coinHigh, coinLow, coinVolume){
	let p = Number(coinTest.percentChange).toFixed(2)
	if (p >= 0){
		document.getElementById(coinPercent).style.backgroundColor = "Green"
	} else {
		document.getElementById(coinPercent).style.backgroundColor = "Red"
	}
	document.querySelector('#' + coinPrice).innerText = "$" + Number(coinTest.last).toFixed(4)
	document.querySelector('#' + coinPercent).innerText = p + "%"
	document.querySelector('#' + coinHigh).innerText = "$" + Number(coinTest.high24hr).toFixed(4)
	document.querySelector('#' + coinLow).innerText = "$" + Number(coinTest.low24hr).toFixed(4)
	document.querySelector('#' + coinVolume).innerText = Number(coinTest.baseVolume).toFixed(4)
}

// gets coin name and symbol
function getFetch(){
	fetch("https://api.coincap.io/v2/assets")
		.then(res => res.json())
		.then(data => {
			console.log(data)

			//Bitcoin data
			coin = "btc"
			num = 0
			symbol = "btcSymbol"
			coinData(data, coin, num, symbol)

			//Ethereum data
			coin = "eth"
			num = 1
			symbol = "ethSymbol"
			coinData(data, coin, num, symbol)

			//Shiba-Inu data
			coin = "shib"
			num = 14
			symbol = "shibSymbol"
			coinData(data, coin, num, symbol)
		})
  	.catch(err => {
	  	console.log(`error ${err}`)
  	});
}

//Get complete coin data
function getFetchCoinData(){
	fetch("https://poloniex.com/public?command=returnTicker")
		.then(res => res.json())
		.then(data => {
			console.log(data)
				//Bitcoin data
				coinPrice = "btcPrice"
				coinPercent = "btcPercent"
				coinHigh = "btcHigh"
				coinLow = "btcLow"
				coinVolume = "btcVolume"
				coinDataComplete(coinPrice, coinPercent, data.USDT_BTC, coinHigh, coinLow, coinVolume)

				//Ethereum data
				coinPrice = "ethPrice"
				coinPercent = "ethPercent"
				coinHigh = "ethHigh"
				coinLow = "ethLow"
				coinVolume = "ethVolume"
				coinDataComplete(coinPrice, coinPercent, data.USDT_ETH, coinHigh, coinLow, coinVolume)

				//Shiba-Inu data
				coinPrice = "shibPrice"
				coinPercent = "shibPercent"
				coinHigh = "shibHigh"
				coinLow = "shibLow"
				coinVolume = "shibVolume"
				coinDataComplete(coinPrice, coinPercent, data.USDT_SHIB, coinHigh, coinLow, coinVolume)
		})
  	.catch(err => {
	  	console.log(`error ${err}`)
  	});
}

getFetch()
getFetchCoinData()
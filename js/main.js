//Coincode api used to get crypto prices

let coin = ""
let coinPrice = ""
let coinPercent = ""
let num = 0

function coinData(d, coin, coinPrice, coinPercent, num){
	let p = Number(d.data[num].changePercent24Hr).toFixed(2)
	if (p >= 0){
		document.getElementById(coinPercent).style.backgroundColor = "Green"
	} else {
		document.getElementById(coinPercent).style.backgroundColor = "Red"
	}
	document.querySelector('#' + coin).innerText = d.data[num].name
	document.querySelector('#' + coinPrice).innerText = "$" + Number(d.data[num].priceUsd).toFixed(2)
	document.querySelector('#' + coinPercent).innerText = p + "%"
}


function getFetch(){
	fetch("https://api.coincap.io/v2/assets")
		.then(res => res.json())
		.then(data => {
			console.log(data)

			//Bitcoin data
			coin = "btc"
			coinPrice = "btcPrice"
			coinPercent = "btcPercent"
			num = 0
			coinData(data, coin, coinPrice, coinPercent, num)

			//Ethereum data
			coin = "eth"
			coinPrice = "ethPrice"
			coinPercent = "ethPercent"
			num = 1
			coinData(data, coin, coinPrice, coinPercent, num)

			//Shiba-Inu data
			coin = "shib"
			coinPrice = "shibPrice"
			coinPercent = "shibPercent"
			num = 14
			coinData(data, coin, coinPrice, coinPercent, num)
		})
  	.catch(err => {
	  	console.log(`error ${err}`)
  	});
}

function getFetchCandles(){
	fetch("https://api.coincap.io/v2/candles?exchange=kraken&interval=m1&baseId=usd&quoteId=bitcoin")
		.then(res => res.json())
		.then(data => {
			console.log(data)
		})
  	.catch(err => {
	  	console.log(`error ${err}`)
  	});
}

getFetch()
getFetchCandles()
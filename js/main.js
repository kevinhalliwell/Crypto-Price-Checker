//Coincode api used to get crypto prices

let coin = "" //string for coin cell
let coinPrice = "" //string for price cell
let coinPercent = "" //string for percent cell
let num = 0 //id in the array
let symbol = "" // string for symbol cell
let coinHigh = "" // string for 24 hr high
let coinLow = "" // string for 24 hr high
let coinVolume = "" // string for volume
let columnHigh = "24hr High" // string to delete column
let columnLow = "24hr Low" // string to delete column
let table = "crypto" // string for table. used to delete column
let shibaTrue = true // boolean to adjust number of zeros

// delete table column if api fails to connect
function deleteColumn(table, column){
	var table = document.getElementById(table),
    rows = table.rows;

	for (var i = 0; i < rows[0].cells.length; i++) {
    	var str = rows[0].cells[i].innerHTML;
    	if (str.search(column) != -1) {
        	for (var j = 0; j < rows.length; j++) {
           		rows[j].deleteCell(i);
        }
    }
}
}

// helper function to get name and symbol
function coinData(d, coin, num, symbol){
	document.querySelector('#' + coin).innerText = d.data[num].name
	document.querySelector('#' + symbol).innerText = d.data[num].symbol
}

// backup helper function to get the complete coin data
function coinDataComplete(coinPrice, coinPercent, coinData, coinHigh, coinLow, coinVolume, shibaTrue){
	
	// changes the box color base on percent change
	let p = Number(coinData.percentChange).toFixed(2)
	if (p >= 0){
		document.getElementById(coinPercent).style.backgroundColor = "Green"
	} else {
		document.getElementById(coinPercent).style.backgroundColor = "Red"
	}

	// checks to see if currency needs more places beyond decimal
	if (!shibaTrue) {
		document.querySelector('#' + coinPrice).innerText = "$" + Number(coinData.last).toFixed(2)
	} else {
		document.querySelector('#' + coinPrice).innerText = "$" + Number(coinData.last).toFixed(8)
	}

	// adds the percent to the table
	document.querySelector('#' + coinPercent).innerText = p + "%"

	// checks to see if currency needs more places beyond decimal
	if (!shibaTrue) {
		document.querySelector('#' + coinHigh).innerText = "$" + Number(coinData.high24hr).toFixed(2)
	} else {
		document.querySelector('#' + coinHigh).innerText = "$" + Number(coinData.high24hr).toFixed(7)
	}

	// checks to see if currency needs more places beyond decimal
	if (!shibaTrue) {
		document.querySelector('#' + coinLow).innerText = "$" + Number(coinData.high24hr).toFixed(2)
	} else {
		document.querySelector('#' + coinLow).innerText = "$" + Number(coinData.high24hr).toFixed(7)
	}
	
	//************************************
	// need to add statement to add k or m to currency
	document.querySelector('#' + coinVolume).innerText = Number(coinData.baseVolume).toFixed(2)
}

// backup helper function to get coin data based on the first api
function coinDataBackup(data, coin, num, symbol, coinPrice, coinPercent, coinVolume, shibaTrue){
	document.querySelector('#' + coin).innerText = data.data[num].name
	document.querySelector('#' + symbol).innerText = data.data[num].symbol

	// changes the box color base on percent change
	let p = Number(data.data[num].changePercent24Hr).toFixed(2)
	if (p >= 0) {
		document.getElementById(coinPercent).style.backgroundColor = "Green"
	} else {
		document.getElementById(coinPercent).style.backgroundColor = "Red"
	}

	// adds the percent to the table
	document.querySelector('#' + coinPercent).innerText = p + "%"

	// checks to see if currency needs more places beyond decimal
	if (!shibaTrue) {
		document.querySelector('#' + coinPrice).innerText = "$" + Number(data.data[num].priceUsd).toFixed(2)
	} else {
		document.querySelector('#' + coinPrice).innerText = "$" + Number(data.data[num].priceUsd).toFixed(7)
	}

	//************************************
	// need to add statement to add k or m to currency
	document.querySelector('#' + coinVolume).innerText = Number(data.data[num].volumeUsd24Hr).toFixed(2)

	deleteColumn(table, columnHigh)
	deleteColumn(table, columnLow)
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
	fetch("https://poloniex.com/public?command=returnTicke")
		.then(res => res.json())
		.then(data => {
			//console.log(data)
				//Bitcoin data
				coinPrice = "btcPrice"
				coinPercent = "btcPercent"
				coinHigh = "btcHigh"
				coinLow = "btcLow"
				coinVolume = "btcVolume"
				shibaTrue = false
				coinDataComplete(coinPrice, coinPercent, data.USDT_BTC, coinHigh, coinLow, coinVolume, shibaTrue)

				//Ethereum data
				coinPrice = "ethPrice"
				coinPercent = "ethPercent"
				coinHigh = "ethHigh"
				coinLow = "ethLow"
				coinVolume = "ethVolume"
				shibaTrue = false
				coinDataComplete(coinPrice, coinPercent, data.USDT_ETH, coinHigh, coinLow, coinVolume, shibaTrue)

				//Shiba-Inu data
				coinPrice = "shibPrice"
				coinPercent = "shibPercent"
				coinHigh = "shibHigh"
				coinLow = "shibLow"
				coinVolume = "shibVolume"
				shibaTrue = true
				coinDataComplete(coinPrice, coinPercent, data.USDT_SHIB, coinHigh, coinLow, coinVolume, shibaTrue)
		})
  	.catch(err => {
	  	console.log(`error ${err}`)
		// call the backup helper if the api fails
		getFetchBackup()
  	});
}

// gets coin name and symbol if the second api fails
function getFetchBackup(){
	fetch("https://api.coincap.io/v2/assets")
		.then(res => res.json())
		.then(data => {
			//console.log(data)

			//Bitcoin data
			coin = "btc"
			num = 0
			symbol = "btcSymbol"
			coinPrice = "btcPrice"
			coinPercent = "btcPercent"
			coinVolume = "btcVolume"
			shibaTrue =  false
			coinDataBackup(data, coin, num, symbol, coinPrice, coinPercent, coinVolume, shibaTrue)

			// //Ethereum data
			coin = "eth"
			num = 1
			symbol = "ethSymbol"
			coinPrice = "ethPrice"
			coinPercent = "ethPercent"
			coinVolume = "ethVolume"
			shibaTrue = false
			coinDataBackup(data, coin, num, symbol, coinPrice, coinPercent, coinVolume, shibaTrue)

			// //Shiba-Inu data
			coin = "shib"
			num = 14
			symbol = "shibSymbol"
			coinPrice = "shibPrice"
			coinPercent = "shibPercent"
			coinVolume = "shibVolume"
			shibaTrue = true
			coinDataBackup(data, coin, num, symbol, coinPrice, coinPercent, coinVolume, shibaTrue)

		})
  	.catch(err => {
	  	console.log(`error ${err}`)
  	});
}

getFetch()
getFetchCoinData()
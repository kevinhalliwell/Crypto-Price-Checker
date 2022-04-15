//Coincode api used to get crypto prices

function getFetchBTC(){
  	fetch("https://api.coincap.io/v2/assets/bitcoin")
      	.then(res => res.json())
      	.then(data => {
      	console.log(data)
		let percent = Number(data.data.changePercent24Hr).toFixed(2)
		if (percent >= 0){
			document.getElementById('btcPercent').style.color = "Green"
		} else {
			document.getElementById('btcPercent').style.color = "Red"
		}
		document.querySelector('#btc').innerText = data.data.name
		document.querySelector('#btcPrice').innerText = "$" + Number(data.data.priceUsd).toFixed(3)
		document.querySelector('#btcPercent').innerText = percent + "%"
      	})
    .catch(err => {
        console.log(`error ${err}`)
    });
}

function getFetchETH(){
	fetch("https://api.coincap.io/v2/assets/ethereum")
		.then(res => res.json())
		.then(data => {
		console.log(data)
	  let percent = Number(data.data.changePercent24Hr).toFixed(2)
	  if (percent >= 0){
		  document.getElementById('ethPercent').style.color = "Green"
	  } else {
		  document.getElementById('ethPercent').style.color = "Red"
	  }
	  document.querySelector('#eth').innerText = data.data.name
	  document.querySelector('#ethPrice').innerText = "$" + Number(data.data.priceUsd).toFixed(3)
	  document.querySelector('#ethPercent').innerText = percent + "%"
		})
  .catch(err => {
	  console.log(`error ${err}`)
  });
}

function getFetchSHIBA(){
	fetch("https://api.coincap.io/v2/assets/shiba-inu")
		.then(res => res.json())
		.then(data => {
		console.log(data)
	  let percent = Number(data.data.changePercent24Hr).toFixed(2)
	  if (percent >= 0){
		  document.getElementById('shibPercent').style.color = "Green"
	  } else {
		  document.getElementById('shibPercent').style.color = "Red"
	  }
	  document.querySelector('#shib').innerText = data.data.name
	  document.querySelector('#shibPrice').innerText = "$" + Number(data.data.priceUsd).toFixed(8)
	  document.querySelector('#shibPercent').innerText = percent + "%"
		})
  .catch(err => {
	  console.log(`error ${err}`)
  });
}

function getFetchBTCHistory(){
	fetch("https://api.coincap.io/v2/candles?exchange=poloniex&interval=d1&baseId=ethereum&quoteId=bitcoin")
		.then(res => res.json())
		.then(data => {
		console.log(data)
		})
  .catch(err => {
	  console.log(`error ${err}`)
  });
}

getFetchBTC()
getFetchETH()
getFetchSHIBA()
getFetchBTCHistory()
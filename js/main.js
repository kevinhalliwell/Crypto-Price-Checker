//Coincode api used to get crypto prices

function getFetch(){
  	fetch("https://api.coincap.io/v2/assets/bitcoin")
      	.then(res => res.json())
      	.then(data => {
      	console.log(data)
		document.querySelector('#btc').innerText = Number(data.data.priceUsd).toFixed(2)
		let percent = Number(data.data.changePercent24Hr)
		if (percent >= 0){
			document.getElementById("btcChange").style.color = "Green"
			document.querySelector('#btcChange').innerText = percent.toFixed(2)
		} else {
			document.getElementById("btcChange").style.color = "Red"
			document.querySelector('#btcChange').innerText = percent.toFixed(2)
		}
      	})
    .catch(err => {
        console.log(`error ${err}`)
    });
}

getFetch()
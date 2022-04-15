//Coincode api used to get crypto prices

function getFetch(){
  	fetch("https://api.coincap.io/v2/assets/bitcoin")
      	.then(res => res.json())
      	.then(data => {
      	console.log(data)
		document.querySelector('#btc').innerText = data.data.priceUsd
		let percent = data.data.changePercent24Hr
		if (percent >= 0){
			document.getElementById("btcChange").style.color = "Green"
			document.querySelector('#btcChange').innerText = percent
		} else {
			document.getElementById("btcChange").style.color = "Red"
			document.querySelector('#btcChange').innerText = percent
		}
      	})
    .catch(err => {
        console.log(`error ${err}`)
    });
}

getFetch()

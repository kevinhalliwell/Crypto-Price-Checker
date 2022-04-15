//Coincode api used to get crypto prices

function getFetch(){
  	//const choice = document.querySelector('input').value
  	//console.log(choice)
  	const url = `api.coincap.io/v2/assets/bitcoin`

  	fetch(url)
      	.then(res => res.json()) // parse response as JSON
      	.then(data => {
      	console.log(data)
      	})
    .catch(err => {
        console.log(`error ${err}`)
    });
}

getFetch()
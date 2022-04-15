//Coincode api used to get crypto prices

function getFetch(){
  	fetch("api.coincap.io/v2/assets")
      	.then(res => res.json())
      	.then(data => {
      	console.log(data)
      	})
    .catch(err => {
        console.log(`error ${err}`)
    });
}

getFetch()

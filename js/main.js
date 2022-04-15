//Coincode api used to get crypto prices
var requestOptions = {
	method: 'GET',
	redirect: 'follow'
};

function getFetch(){
  	fetch("api.coincap.io/v2/assets", requestOptions)
      	.then(res => res.text())
      	.then(data => {
      	console.log(data)
      	})
    .catch(err => {
        console.log(`error ${err}`)
    });
}

getFetch()
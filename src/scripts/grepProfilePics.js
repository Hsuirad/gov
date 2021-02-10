const fs = require('fs');
const fetch = require('node-fetch');
const data = require('./members.json')

async function grepPhoto(title, realname){
	let url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title.split(' ').join('_')}&prop=pageimages&format=json&pithumbsize=200`

	let response = await fetch(encodeURI(url));
	response = await response.text()
	let imgUrl;
	//console.log(response, url)
	try{
		response = JSON.parse(response)
		imgUrl = response['query']['pages'][Object.keys(response['query']['pages'])[0]]['thumbnail']['source']
		await download(realname.split(' ').join('-'), imgUrl);
	} catch{
		response = 'Bad Request'
	}
	

	
	console.log(url)
}

function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

async function grabName(){
	for(let i = 0; i < Object.keys(data).length; i++){
		let officialName = Object.keys(data)[i]
		let wikiName = data[officialName]['id']['wikipedia']
		// if(String(wikiName).isLatin() == false) 
		pause(1000)
		await grepPhoto(wikiName, officialName);
	}
}

async function download(title, url) {
	const response = await fetch(url);
	const buffer = await response.buffer();
	fs.writeFile(`./images/${title}.jpg`, buffer, () => 
		console.log('Download: ' + title + '\n')
	);
}


// x["query"]["pages"][Object.keys(x["query"]["pages"])[0]]["thumbnail"]["source"]

// https://en.wikipedia.org/w/api.php?action=query&titles=gold&prop=pageimages&format=json&pithumbsize=100

grabName()
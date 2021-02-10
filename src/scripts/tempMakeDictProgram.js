const axios = require('axios')
const cheerio = require('cheerio');
const fs = require('fs')

const fetchHTML = async (url) => {
    const data = await axios.get(url);
    //console.log(data.data)
    let x = data.data.split('tab-pane ng-scope').join('tab_pane ng_scope')
    //console.log(x)
    return cheerio.load(x, {normalizeWhitespace: true});    
}


const pr = (t) => {
	console.log(t)
}

const grepData = async () => {
    const $ = await fetchHTML('https://www.uscourts.gov/glossary')

   	let terms = []
   	let definition = []

   	let final = {}

	$('dl dt').each((i, e)=>terms.push($(e).text().split('\n').join(' ').trim()))
    $('dl dd').each((i, e)=>definition.push($(e).text().split('\n').join(' ').trim()))

    for(let i = 0; i < terms.length; i++){
    	final[terms[i]] = definition[i]
    }

    console.log(final)
    fs.writeFile('legalTerms.json', JSON.stringify(final), (err) => {console.log(err)})
}


grepData()



// https://www.uscourts.gov/glossary
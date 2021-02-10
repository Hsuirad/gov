const axios = require('axios');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

try{
    fs.rmdirSync('cspanImages', {recursive: true})
    fs.mkdirSync('cspanImages')
} catch (e) {
    console.log(e)
    fs.mkdirSync('cspanImages')
}

const fetchHTML = async (url) => {
    const data = await axios.get(url);
    console.log('test')
    return cheerio.load(data.data, {normalizeWhitespace: true});    
}

const findSum = async (url) => {
    console.log(url)
    const $$ = await fetchHTML(url)
    let x = $$('.more_info').text()

    return x
}

const grepData = async (url) => {
    const $ = await fetchHTML(url)
    

    let text = [];
    let max =0;

    let starters = [];
    let titles = []
    let summaries = []
    let links = []
    let images = []
    let uh = []

    $('.onevid').each((i, e) => {
        starters.push($(e).text().split('\n').filter(e => e!='')[1])
        titles.push($(e).text().split('\n').filter(e => e!='')[1])
        summaries.push($(e).text().split('\n').filter(e => e!='').join('~~~'))
        links.push('https:' + $(e).children().first().attr('href'))
        images.push($(e).children().first().children().eq(1).attr('src'))
        uh.push($(e).text().split('\n').filter(e => e!='').join('~~~'))

        //text.push({[$(e).text().split('\n').filter(e => e!='')[1]]: {title: $(e).text().split('\n').filter(e => e!='')[1], summary: $(e).text().split('\n').filter(e => e!='').join('~~~'), link: $(e).children().first().attr('href'), image: $(e).children().first().children().eq(1).attr('src')}})
        max = i;
    });





    for(let i = 0; i < starters.length; i++){
        console.log(starters[i])
        let sum = await findSum(links[i])
        console.log(sum.split('\n').join(' ') + '\n')

        text.push({[starters[i]]: {title: titles[i], summary: uh[i], description: sum.split('\n').join(' ').split('. close').join('').trim(), link: links[i], image: images[i]}})
    }

    console.log(text)
    text.push({max: max})
    return text
}

let text = [];
let text2 = [];
let titls = [];

let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();

let endDate = (month<10?'0':'') + month + "/" + (day<10?'0':'') + day + "/" + year;

async function run(){
    let todaysDate = new Date();
    todaysDate.setDate(todaysDate.getDate() - 7);

    todaysDate = `${((todaysDate.getUTCMonth() + 1)<10?'0':'') + (todaysDate.getUTCMonth() + 1)}/${(todaysDate.getUTCDate()<10?'0':'') + todaysDate.getUTCDate()}/${todaysDate.getUTCFullYear()}`

    await grepData(encodeURI(`https://www.c-span.org/search/?sdate=${todaysDate}&edate=${endDate}&congressSelect=&yearSelect=&searchtype=Clips&sort=Most+Popular&show100=&cspan_created[]=1`), "no").then(
        result => {
            //console.log(result)
            fs.writeFile('cspan.json', JSON.stringify(result), (err) => {console.log(err)})
            // await fs.writeFileSync('cspan.json', JSON.stringify({...text}), 'utf8')
    })
    
    // await console.log(text);
}

run()

// async function sum(){console.log(titls)
//     for(const elem of titls){
//         let num = "";
//         console.log(elem)
//         num = elem.split('.').pop().split(' ')[0];
//         let hOrS = elem.includes('H.R.') ? 'house' : 'senate';
//         //CHECK WHICH CONGRESS IT IS DIPSHIT
//         let bill = await grepData('#bill-summary p', 'https://www.congress.gov/bill/'+ elem.split(' ')[2] + '-' + elem.split(' ')[3].toLowerCase() + '/' + hOrS + '-bill/' + num, "yes")
//         console.log('#bill-summary p', 'https://www.congress.gov/bill/116th-congress/' + hOrS + '-bill/' + num)
        
//         text2.push(bill)
//     }
//     // await fs.appendFileSync('summaries.json', JSON.stringify({...text2}), 'utf8')
//     await console.log(text2);
// }

// UNCOMMENT TO RUN THE PROGRAM
// (async () => {
//     fs.writeFileSync('data.json', '', 'utf8')
//     fs.writeFileSync('summaries.json', '', 'utf8')
// })().run().then(() => sum());

/**
 * - puppeteer can take screenshots maybe do that for bill presentation (it saves as .pdf so youd need a pdf viewer or OCR later)
 * - slower but wont matter since hopefully itll be set on a chrontab
 * - can scrape react webpages i wanna look into that later
 */

const axios = require('axios')
const cheerio = require('cheerio');
const fs = require('fs')

const fetchHTML = async (url) => {
    const data = await axios.get(url);
    console.log('test')
    return cheerio.load(data.data, {normalizeWhitespace: true});    
}

const grepData = async (selector, url, sum="no") => {
    const $ = await fetchHTML(url)
    let coms = [];
    let latestAction= [];
    let tracker = [];
    let titles = [];
    let sponsors = [];
    let names = [];
    let bills = [];
    if(sum=="no"){
        $(selector).each((i, elem) => {
            if($(elem).attr('class') === "expanded"){
                //later check if the li has the attribute "expanded" or whatever
                console.log($(elem).find('.result-item.result-tracker').find('.selected').text().trim())
                console.log('a')
                if($(elem).find('.result-item.result-tracker').find('.selected').text().trim() !== ''
                    && ($(elem).find('.result-heading').text().trim().includes('H.R.')
                        ||$(elem).find('.result-heading').text().trim().includes('S.'))){
                    let rawTrack = $(elem).find('.result-item.result-tracker').find('.selected').text().trim();
                    console.log('b', $(elem).text())
                    let actDate = rawTrack.split(' ')[rawTrack.split(' ').indexOf('[actionDate]') + 2].substring(0, rawTrack.split(' ')[rawTrack.split(' ').indexOf('[actionDate]') + 2].length - 1);
                    let latAct = rawTrack.split('[displayText] => ')[1].substring(0, rawTrack.split('[displayText] => ')[1].indexOf(' [ex')-4);
                    let stage = rawTrack.split('[description] => ')[1].substring(0, rawTrack.split('[description] => ')[1].indexOf(' [ch')-4) 
                    if(!stage.includes('House') && !stage.includes('Senate')) stage += " " + rawTrack.split('[chamberOfAction] => ')[1].substring(0, rawTrack.split('[chamberOfAction] => ')[1].indexOf(')')-1)
                    
                    tracker.push(`${stage}`);
                    titles.push($(elem).find('.result-heading').text().trim());
                    latestAction.push(`${actDate} - ${latAct}`)  // or $(elem).find('.result-item').eq(2).text().trim()
                    names.push($(elem).find('.result-title').text().trim())
                    coms.push($(elem).find('.result-item').eq(1).text().trim())
                    sponsors.push($(elem).find('.result-item').eq(0).text().trim())
                    bills.push($(elem).find('.result-title').text().trim())
                }
            }
        });

        return [titles, names, sponsors, bills, latestAction, coms, tracker];
    } else{
        let textSum = []
        $(selector).each((i, elem) => {
            console.log(i + ' ' + $(elem).text())
            textSum.push($(elem).text())
        });

        if(textSum.length == 0){
            return 'Summary Unavailable'
        }
        return textSum.splice(1).join('\n')
    }
}

let text = [];
let text2 = [];
let titls = [];

async function run(){
    for(let j = 0; j < 5; j++){
        await grepData('.basic-search-results-lists.expanded-view li',
        encodeURI(`https://www.congress.gov/search?searchResultViewType=expanded&q={"congress":["116"],"source":"legislation","type":"bills","chamber":["Senate",House"]}&pageSize=250&pageSort=latestAction:desc&page=${j+1}`), "no").then(
            result => {

                // result[0].forEach(elem => {"H.R.8683 — 116th Congress (2019-2020)"
                //     let num = ""
                //     num = elem.split('.').pop().split(' ')[0];
                //     let hOrS = elem.includes('H.R.') ? 'house' : 'senate';
                //     await grepData('#bill-summary p', 'https://www.congress.gov/bill/116th-congress/' + hOrS + '-bill/' + num, "yes")
                // })

                for(let i = 0; i < result[0].length; i++){
                    console.log(result)
                    text.push({
                        "title": result[0][i],
                        "names": result[1][i],
                        "sponsors": result[2][i],
                        "bills": result[3][i],
                        "latestAction": result[4][i],
                        "coms": result[5][i],
                        "tracker": result[6][i]
                    })
                    titls.push(result[0][i])
                }
                console.log(j);
                //somehow do this after the for loop in an async synchronouse way
        })
    }
    await fs.appendFileSync('data.json', JSON.stringify({...text}), 'utf8')
    
    await console.log(text);
}

//HEY IDIOT CHECK https://www.congress.gov/bill/117th-congress/house-bill/231/all-info?r=5&s=5&allSummaries=show
//USE THAT URL FOR BETTER SUMMARY GREPPING AND MAYBE LATER PDF GREPPING
//YOU CAN ALSO GET ALL ACTIONS COMMITTES RELATED BILLS AND SUMMARIES
async function sum(){console.log(titls)
    for(const elem of titls){
        let num = "";
        console.log(elem)
        num = elem.split('.').pop().split(' ')[0];
        let hOrS = elem.includes('H.R.') ? 'house' : 'senate';
        //CHECK WHICH CONGRESS IT IS DIPSHIT
        let bill = await grepData('#bill-summary p', 'https://www.congress.gov/bill/'+ elem.split(' ')[2] + '-' + elem.split(' ')[3].toLowerCase() + '/' + hOrS + '-bill/' + num, "yes")
        console.log('#bill-summary p', 'https://www.congress.gov/bill/116th-congress/' + hOrS + '-bill/' + num)
        
        text2.push(bill)
    }
    await fs.appendFileSync('summaries.json', JSON.stringify({...text2}), 'utf8')
    await console.log(text2);
}

// UNCOMMENT TO RUN THE PROGRAM
(async () => {
    fs.writeFileSync('data.json', '', 'utf8')
    fs.writeFileSync('summaries.json', '', 'utf8')
})().then(() => run()).then(() => sum());









/*
Resources:
https://www.supremecourt.gov 
    - This governmental source provides information on the current cases and opinions being heard by the Supreme Court. It can be used to gather information for the app itself. 

https://projects.propublica.org/represent/ 
    - This is another app that has been created to relay the votes on current bills in Congress. Although this app is a good way for informing people with the political jargon and those familiar with the processes of Congress, it is a lot more complicated than what we want it to be but it does have aspects that we can play off of when thinking about our app.

https://www.cato.org 
    - This website gives brief summaries and information regarding many different political topics in the form of blogs, summaries, and commentary. It will be useful to pull information from this for the app. 

https://fivethirtyeight.com/politics/ 
    - This website lists the latest political news in the form of simplified articles. We can also pull articles from this website to compile into the app. 

https://www.oxfordreference.com/view/10.1093/acref/9780199207800.001.0001/acref-9780199207800 
    - This is the website for Oxford’s political reference dictionary. It defines a lot of the terms used in politics and may help us with simplifying the language. The only qualm I have is that the latest edition was published in 2009, so it may be slightly outdated in some instances. We would have to evaluate these definitions in a present-day context, however most of these are impartial, strict definitions so they will likely still be applicable. 

https://openstates.org/find_your_legislator/ 
    - This website shows you representatives in the State legislature when you enter your address. 
      It may be less helpful then a list of all the state-level elected officials, however I was unsure how to do that without listing the websites for all 50 states. 
      This site has a similar idea to our initial app entry; putting in your zip code to connect you with your representatives. 

https://www.nytimes.com/live/2020/presidential-polls-trump-biden 
    - This is more federal level where people can see live polls of elections in real time (this one is specifically the presidential election). 
      It will serve as a method of live updates with brief summaries of the overall standings. 
      We can probably go through the general polls and summarize the general standings of each of the candidates if needed.

https://projects.fivethirtyeight.com/polls/ 
    - This one is more general (state and federal)

https://www.congress.gov/ 
    - This is the general page for all current activities in Congress from the House Floor activities to Treaty documents. The individual links on this page (that we should extract and paste separately within the app) give a list of all of the legislative actions that are/will be discussed in each section of Congress.
        Query searches use format: https://www.congress.gov/search?q={“congress”:x,”source”:y}&searchResultViewType=expanded 
        x → “116”, “115”, etc. multiple follows general rules, 116th is current congress
        y → can be “legislation”, “comreports”, etc, for multiple queries do [“legislation”,“comreports”]

https://ballotpedia.org/Main_Page 
    - This website has you enter your address and lists all the reps that will be on the ballot in upcoming elections. It also lists updates frequently on political news. I feel like this is a good website to take inspiration from for the app.

https://mgaleg.maryland.gov/mgawebsite/Legislation/Index/
    - Can end with “house” for the house of delegates bills or senate for “senate” bills
Something important for our functionality is that under “current legislative lingo” in the /Index/Publications section gives all common definitions for use in maryland legislation, then highlight those phrases whenever seen in bills for the end-user and give the definition on hover or click

https://www.cspan.org 
    - Most likely one of the most unbiased and factual news sources, if not the most. We could use this for the most recent interviews and bills featuring specific congress members, their search queries are easy to use and program-friendly. Also has transcripts to pinpoint keywords they said and allow for faster information retrieval since video takes longer to load

https://www.govtrack.us/about-our-data 
    - This is probably the “holy grail” of congressional data sources. They include every possible news source for factual data gathering on congress, however it is at the federal level. 

https://projects.propublica.org/api-docs/congress-api/ 
    - The only congressional API that exists, will be extremely useful for data gathering on bills quickly

https://clerk.house.gov/Votes/ 
    - Roll call votes for the house

https://www.senate.gov/legislative/votes_new.htm 
    - Roll call votes for the Senate

https://github.com/unitedstates/congress-legislators
    - All JSON for like literally everything useful <3
*/
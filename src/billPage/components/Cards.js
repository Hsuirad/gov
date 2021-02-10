import React, {Component} from 'react';
import BillPres from './BillPres'
import data from '../../scripts/data.json'
import sumData from '../../scripts/summaries.json'
import Spinner from 'react-bootstrap/Spinner'
import cspan from '../../scripts/cspan.json'

    /*
    "0":{"title":
    "names":"\n\tTo amend the Alaska Native Claims Settlement Act to exclude certain payments to Alaska Native elders for determining eligibility for certain programs, and for other purposes.",
    "sponsors":"\n\tSponsor: Rep. Young, Don [R-AK-At Large] (Introduced 10/23/2020) Cosponsors: (0)",
    "bills":"\n\tTo amend the Alaska Native Claims Settlement Act to exclude certain payments to Alaska Native elders for determining eligibility for certain programs, and for other purposes.",
    "latestAction":"\n\t2020-10-23 - Introduced in House",
    "coms":"\n\tCommittees: House - Natural Resources",
    "tracker":"\n\tIntroduced House"}
    */
 
export default class Cards extends Component{
    findPos = () => {
        if((window.pageYOffset + window.innerHeight >= document.body.offsetHeight-document.body.offsetHeight*0.01) && (this.state.showLoading === false)){

            this.state.showLoading = true
            this.setState({showLoading: true})
            console.log('test' + this.state.showLoading)

            setTimeout((()=>{

                let b = this.state.bills;

                this.state.showLoading = false;
                this.setState({showLoading: false})
                
                console.log(this.state.indicesNow)

                let ind  = [...this.state.indicesNow]
                let indB  = [...this.state.indicesNowB]

                console.log(ind.toString(), this.state.indicesNow)

                let start = ind[ind.length - 1] + 1;
                let end = ind[ind.length - 1] + 10

                console.log(start, end)
                let a = indB[indB.length - 1] + 1
                let c = start;
                for(let i = start; i <= end; i++){
                    if(i % 3 == 0 && i/3 < cspan[Object.keys(cspan).pop()]['max']){
                        indB.push(a);
                        b.push({
                            index: a,
                            link: 'https://www.com.com', 
                            isPinned: false,
                            title: '', 
                            auth: '',
                            authLink: '',
                            realSum: '',
                            sum: '',
                            isBill: false,
                            isDem: ''
                        })
                        a++
                    } else{
                        while(sumData[c] == "Summary Unavailable" || sumData[c] == ''){
                            c++
                        }

                        ind.push(c);
                        if(this.state.data.hasOwnProperty(c.toString()))
                            if(sumData[c] == "Summary Unavailable" || sumData[c] == ''){
                                b.push({
                                    index: c,
                                    link: 'https://www.congress.gov/bill/116th-congress/' + data[c]['title'].includes('H.R.') ? 'house' : 'senate' + '-bill/' + data[c]['title'].split('.').pop().split(' ')[0], 
                                    isPinned: false,
                                    title: this.state.data[c]['title'], 
                                    auth: this.state.data[c]['sponsors'],
                                    authLink: 'https://stewart.house.gov/issues/',
                                    sum: this.state.data[c]['bills'],
                                    isBill: true,
                                    realSum: '',
                                    date: this.state.data[c]['latestAction'],
                                    isDem: this.state.data[c]['sponsors'].includes("[D-")?true:false
                                })
                            } else{
                                b.push({
                                    index: b,
                                    link: 'https://www.congress.gov/bill/116th-congress/' + data[c]['title'].includes('H.R.') ? 'house' : 'senate' + '-bill/' + data[c]['title'].split('.').pop().split(' ')[0], 
                                    isPinned: false,
                                    title: this.state.data[c]['title'], 
                                    auth: this.state.data[c]['sponsors'],
                                    authLink: 'https://stewart.house.gov/issues/',
                                    sum: this.state.data[c]['bills'],
                                    isBill: true,
                                    realSum: sumData[c],
                                    date: this.state.data[c]['latestAction'],
                                    isDem: this.state.data[c]['sponsors'].includes("[D-")?true:false
                                })
                    }
                        c++
                    }
                    //console.log(this.state.data, b, this.state.showLoading, ind);
                }

                console.log(b);
                
                this.setState({
                    bills: [...b],
                    showLoading: false,
                    indicesNow: [...ind],
                    indicesNowB: [...indB]
                })

            }), 1000)

            //console.log('bottom')

        }
    }
    constructor(props){
        super()
        this.state = {
            showLoading: false,
            bills: [],
            size: props.size,
            width: props.width,
            indicesNow: [],
            indicesNowB: [],
            colorMode: (sessionStorage.getItem('color')?sessionStorage.getItem('color'):props.color),
            givenData: (props.data.length>0?true:false),
            data: (props.data.length>0?props.data:data),
            sums: sumData,
            pinnedCards: []
        }

        let ind = []


        if(!this.state.givenData){
            let a = 0, b = 0;
            for(let i = 0; i < 10; i++){
                console.log(i % 3 == 0 && i/3 < cspan[Object.keys(cspan).pop()]['max'])
                if(i % 3 == 0 && i/3 < cspan[Object.keys(cspan).pop()]['max']){
                    this.state.indicesNowB.push(a);
                    this.state.bills.push({
                        index: a,
                        link: 'https://www.com.com', 
                        isPinned: false,
                        title: '', 
                        auth: '',
                        authLink: '',
                        sum: '',
                        isBill: false,
                        hasTitle: false,
                        date: null,
                        isDem: ''
                    })
                    a++
                } else{
                    while(sumData[b] == "Summary Unavailable" || sumData[b] == ''){
                        b++
                    }
                    if(sumData[b] == "Summary Unavailable" || sumData[b] == ''){
                        this.state.indicesNow.push(b);
                        this.state.bills.push({
                            index: b,
                            link: 'https://www.congress.gov/bill/116th-congress/' + (data[b]['title'].includes('H.R.') ? 'house' : 'senate') + '-bill/' + data[b]['title'].split('.').pop().split(' ')[0], 
                            isPinned: false,
                            title: this.state.data[b]['title'], 
                            auth: this.state.data[b]['sponsors'],
                            authLink: 'https://stewart.house.gov/issues/',
                            sum: this.state.data[b]['bills'],
                            isBill: true,
                            realSum: '',
                            date: this.state.data[b]['latestAction'],
                            isDem: this.state.data[b]['sponsors'].includes("[D-")?true:false
                        })
                    } else{
                        console.log('\n\n\n\n\n\n\n' + (data[b]['title'].includes('H.R.') ? 'house' : 'senate') + '-bill/' + data[b]['title'].split('.').pop().split(' ')[0])
                        this.state.indicesNow.push(b);
                        this.state.bills.push({
                            index: b,
                            link: 'https://www.congress.gov/bill/116th-congress/' + (data[b]['title'].includes('H.R.') ? 'house' : 'senate') + '-bill/' + data[b]['title'].split('.').pop().split(' ')[0], 
                            isPinned: false,
                            title: this.state.data[b]['title'], 
                            auth: this.state.data[b]['sponsors'],
                            authLink: 'https://stewart.house.gov/issues/',
                            sum: this.state.data[b]['bills'],
                            isBill: true,
                            realSum: sumData[b],
                            date: this.state.data[b]['latestAction'],
                            isDem: this.state.data[b]['sponsors'].includes("[D-")?true:false
                        })
                    }
                    b++
                }
            }
        }
        else{
            console.log("test")
            let i = 0;  
            let temp = localStorage.getItem('data').split(',')
            this.state.data = []
            for(let i = 0; i < temp.length; i+=2){
                this.state.data.push([temp[i], temp[i+1]])
            }
            console.log(this.state.data)
        

            this.state.data.forEach(elem => {
                console.log(elem)
                    if(elem[1] == 'bill'){
                        if(sumData[elem[0]] == "Summary Unavailable" || sumData[elem[0]] == ''){
                            this.state.indicesNow.push(elem[0]);
                            this.state.bills.push({
                                index: Object.keys(this.state.data)[i],
                                link: 'https://www.congress.gov/bill/116th-congress/' + (data[elem[0]]['title'].includes('H.R.') ? 'house' : 'senate') + '-bill/' + data[elem[0]]['title'].split('.').pop().split(' ')[0], 
                                isPinned: true,
                                title: data[elem[0]]['title'], 
                                auth: data[elem[0]]['sponsors'],
                                authLink: 'https://stewart.house.gov/issues/',
                                sum: data[elem[0]]['bills'],
                                isBill: true,
                                realSum: sumData[elem[0]],
                                hasTitle: true,
                                date: data[elem[0]]['latestAction'],
                                isDem: data[elem[0]]['sponsors'].includes("[D-")?true:false
                            })
                        }
                        else{
                            this.state.indicesNow.push(elem[0]);
                            this.state.bills.push({
                                index: Object.keys(this.state.data)[i],
                                link: 'https://www.congress.gov/bill/116th-congress/' + (data[elem[0]]['title'].includes('H.R.') ? 'house' : 'senate') + '-bill/' + data[elem[0]]['title'].split('.').pop().split(' ')[0], 
                                isPinned: true,
                                title: data[elem[0]]['title'], 
                                auth: data[elem[0]]['sponsors'],
                                authLink: 'https://stewart.house.gov/issues/',
                                sum: data[elem[0]]['bills'],
                                isBill: true,
                                realSum: '',
                                hasTitle: false,
                                date: data[elem[0]]['latestAction'],
                                isDem: data[elem[0]]['sponsors'].includes("[D-")?true:false
                            })
                        }
                        i++
                    } else{
                        this.state.indicesNow.push(elem[0]);
                        this.state.bills.push({
                            index: elem[0],
                            link: 'https://www.com.com', 
                            isPinned: false,
                            title: '', 
                            auth: '',
                            authLink: '',
                            sum: '',
                            isBill: false,
                            hasTitle: false,
                            date: null,
                            isDem: ''
                        })
                        i++
                    }
            })
        }

        //this.setState({indicesNow: [...ind]})
        console.log(this.state.indicesNow)

        //setInterval(this.findPos, 10)
    }

    update = () => {
        this.setState({size: this.props.size, width: this.props.width});
    }

    componentDidMount(){
        console.log('test')
        if(!this.state.givenData)window.addEventListener('scroll', this.findPos)
    }

    componentWillUnmount(){
        if(!this.state.givenData)window.removeEventListener('scroll', this.findPos)
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.color !== this.props.color) {
            this.setState({colorMode: this.props.color})
        }
    }

    pushPins = (e) => {
        console.log(e)
        this.props.updatePins(e)
        this.state.pinnedCards.push(e)
    }
    
    
    render(){
        return(
            <div style={{}}>{console.log((this.state.showLoading)&&(this.state.givenData==false)?"visible":"hidden")}
                {this.state.bills.map(bill => 
                    <BillPres realSum = {bill.realSum} date = {bill.date} isBill = {bill.isBill} num = {bill.index} isPinned = {bill.isPinned} index = {bill.index} 
                    updatePins = {this.pushPins} link={bill.link} width={this.state.width} margins = {this.state.size} 
                    isDem = {bill.isDem} title = {bill.title} color = {this.state.colorMode} 
                    auth={bill.auth} sum={bill.sum} />
                )}
                <Spinner style={{marginBottom: "14%", filter: this.state.colorMode=="light"?'':'invert(1)', visibility: (this.state.showLoading)&&(this.state.givenData==false)?"visible":"hidden"}} animation="border" role="status" visibility = {(this.state.showLoading)&&(this.state.givenData==false)?"visible":"hidden"}></Spinner>
            </div>
        )
    }
}

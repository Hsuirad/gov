import React, {Component} from 'react';
import memberData from '../scripts/members.json'
import BottomBar from '../billPage/components/BottomBar'

//use flutter for mobile
//check into redux

export default class MemberPage extends Component {

  constructor(props){
    super();
    this.state = {
      urlParam: props.match.params.person,
      formattedName: "",
      src: "",
      repOrSen: '',
      mapFrame: document.body.clientWidth,
      color: sessionStorage.getItem('color'),
      stateWork: ''
    }

    this.TO_NAME = 1;
    this.TO_ABBREVIATED = 2;
  }

  formatUrl = () => {
    // EXAMPLE NAMES THIS IS HOW THEY NEED TO BE FORMATTED
    // Earl L. \"Buddy\" Carter
    // Donald M. Payne, Jr.


    let name = ""; //this will be the return variable for the full name formatted from earl-johnson^jr. to Earl Johnson, Jr.
    let jrsr = false; //boolean for whether or not there is a "Jr." or "Sr." in their name

    if(this.state.urlParam.includes('^')) jrsr = true;
    console.log(this.state.urlParam)
    name = this.state.urlParam.split('-');
    console.log(name)
    name = name.filter(e => e!=='')
    for(let i = 0; i < name.length; i++){
      if(name[i][0] !== "\""){
        name[i] = name[i][0].toUpperCase() + name[i].slice(1, )
      }
      else{ //Check the \"Buddy\" example, this is to create that
        name[i] = "\"" + name[i][1].toUpperCase() + name[i].slice(2, -1) + "\""
      }
    }

    name = name.join(' ')

    if(jrsr){
      if(name.includes('^jr.')){
        name = name.slice(0, -4) + ', Jr.'
      } else{
        name = name.slice(0, -4) + ', Sr.'
      }
    }    
    
    console.log(name)

    return name;
  }

  convertRegion = (input, to) => {
    var states = [
      ['Alabama', 'AL'],['Alaska', 'AK'],['American Samoa', 'AS'],['Arizona', 'AZ'],['Arkansas', 'AR'],['Armed Forces Americas', 'AA'],['Armed Forces Europe', 'AE'],['Armed Forces Pacific', 'AP'],['California', 'CA'],['Colorado', 'CO'],['Connecticut', 'CT'],['Delaware', 'DE'],['District Of Columbia', 'DC'],['Florida', 'FL'],['Georgia', 'GA'],['Guam', 'GU'],['Hawaii', 'HI'],['Idaho', 'ID'],['Illinois', 'IL'],['Indiana', 'IN'],['Iowa', 'IA'],['Kansas', 'KS'],['Kentucky', 'KY'],['Louisiana', 'LA'],['Maine', 'ME'],['Marshall Islands', 'MH'],['Maryland', 'MD'],['Massachusetts', 'MA'],['Michigan', 'MI'],['Minnesota', 'MN'],['Mississippi', 'MS'],['Missouri', 'MO'],['Montana', 'MT'],['Nebraska', 'NE'],['Nevada', 'NV'],['New Hampshire', 'NH'],['New Jersey', 'NJ'],['New Mexico', 'NM'],['New York', 'NY'],['North Carolina', 'NC'],['North Dakota', 'ND'],['Northern Mariana Islands', 'NP'],['Ohio', 'OH'],['Oklahoma', 'OK'],['Oregon', 'OR'],['Pennsylvania', 'PA'],['Puerto Rico', 'PR'],['Rhode Island', 'RI'],['South Carolina', 'SC'],['South Dakota', 'SD'],['Tennessee', 'TN'],['Texas', 'TX'],['US Virgin Islands', 'VI'],['Utah', 'UT'],['Vermont', 'VT'],['Virginia', 'VA'],['Washington', 'WA'],['West Virginia', 'WV'],['Wisconsin', 'WI'],['Wyoming', 'WY'],
    ];
    console.log(input)
    
    for (let i = 0; i < states.length; i++) {
      console.log(states[i][1], input)
        if (states[i][1] == input) {
            return (states[i][0]);
        }
    }
    
    console.log('ag')
  }

  componentDidMount(){
    let x = this.formatUrl()
    this.setState({formattedName: x})

    this.loadImage(x.split(' ').join('-').split('\\').join(''))
    console.log(memberData[x]["terms"][Object.keys(memberData[x]["terms"])[Object.keys(memberData[x]["terms"]).length - 1]]['type'])
    this.setState({repOrSen: memberData[x]["terms"][Object.keys(memberData[x]["terms"])[Object.keys(memberData[x]["terms"]).length - 1]]['type']})
console.log((memberData[x]["terms"][Object.keys(memberData[x]["terms"])[Object.keys(memberData[x]["terms"]).length - 1]]['state']))
    this.setState({stateWork: this.convertRegion(memberData[x]["terms"][Object.keys(memberData[x]["terms"])[Object.keys(memberData[x]["terms"]).length - 1]]['state'], 2)})
  }

  loadImage(name){
    import(`../scripts/images/${name}.jpg`)
      .then(image => {
        console.log(image); // this may be object with image inside...
        this.setState({ src: image.default })
      })
  }

  /*
  "Van Taylor":{
    "id":{
        "bioguide":"T000479",
        "fec":["H8TX03123"],
        "govtrack":412821,
        "wikipedia":"Van Taylor",
        "wikidata":"Q7913689",
        "opensecrets":"N00027709",
        "google_entity_id":"kg:/m/0f9kk3",
        "icpsr":21973
      },
      "name":{
        "first":"Van",
        "last":"Taylor",
        "official_full":"Van Taylor"
      },
      "bio":{
        "gender":"M",
        "birthday":"1972-08-01"
      },
      "terms":[
        {
          "type":"rep",
          "start":"2019-01-03",
          "end":"2021-01-03",
          "state":"TX",
          "district":3,
          "party":"Republican",
          "phone":"202-225-4201",
          "address":"1404 Longworth House Office Building Washington DC 20515-4303",
          "office":"1404 Longworth House Office Building",
          "url":"https://vantaylor.house.gov"
        }
      ]}
  */

  render(){
    return (
      <div style={{margin: "51px 0 60px 0"}}>
      {console.log(this.formatUrl())}
      {console.log(memberData["Earl L. \"Buddy\" Carter"])}
        <div style = {{color: this.state.color!='dark'?'black':'white', fontSize:'1.1em', backgroundColor: this.state.color!='dark'?'rgb(244, 244, 244)':'rgb(42,48,54)', paddingTop: '25px'}}>
          <div width = '100%'style = {{textAlign: 'center'}}>
            {console.log(`../scripts/images/${this.state.formattedName.split(' ').join('-')}.jpg`)}
            <div style = {{display: 'inline-block', borderRadius: '100%', overflow: 'hidden', border: '3px solid '+(this.state.color!='dark'?'black':'white')}}>
              <img width = '100%' style = {{margin: '0 0 -25% 0'}} src = {this.state.src} alt = 'Profile Picture'></img>
            </div>
          </div>
          <div width = '100%' style = {{textAlign: "center", padding: '2% 0 0 0'}}>
            <strong>{this.state.repOrSen=='rep'?'Representative ':'Senator '}</strong>
            ({this.state.stateWork})
            <br />
            {this.state.formattedName.split('\\').join('')}, {memberData[this.formatUrl()]["terms"][Object.keys(memberData[this.formatUrl()]["terms"])[Object.keys(memberData[this.formatUrl()]["terms"]).length - 1]]['party']}
          </div>
          <div width = '100%' style = {{textAlign: "center", margin: '5% 0 1% 0'}}>
            <button class = 'button' style = {{backgroundColor: this.state.color!='dark'?'white':'rgb(42,48,54)'}}><a style = {{textDecoration: 'none', color: this.state.color!='dark'?'black':'white'}} href = '#contact_info'>contact info</a></button>
            <hr />
          </div>
        </div>
        <div style = {{textAlign: 'center', overflow: 'hidden'}}>
          <strong style = {{fontSize: '1.2em'}}>{this.state.repOrSen=='rep'?'Congressional District':'State'}</strong><br />
          <iframe width={'90%'} height={this.state.mapFrame*0.55} style = {{marginTop: '2%', marginBottom: -this.state.mapFrame*0.08}} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
          src={'https://www.govtrack.us/congress/members/embed/mapframe?state='+
          memberData[this.formatUrl()]["terms"][Object.keys(memberData[this.formatUrl()]["terms"])[Object.keys(memberData[this.formatUrl()]["terms"]).length - 1]]['state']+
          (this.state.repOrSen=='rep'?('&district='+memberData[this.formatUrl()]["terms"][Object.keys(memberData[this.formatUrl()]["terms"])[Object.keys(memberData[this.formatUrl()]["terms"]).length - 1]]['district']):'')}></iframe>
        </div>



        <div id = "contact_info">
          
        </div>
        {this.state.point != 'xlg' ? <BottomBar pinnedCards = {this.state.pinnedCards} handleChange = {this.handleChange} /> : ""}
      </div>
    );
  }


}

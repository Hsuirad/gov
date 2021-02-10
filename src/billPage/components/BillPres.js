import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../../index.css'
import onClickOutside from 'react-onclickoutside'
import memberData from '../../scripts/members.json'
import { Link } from 'react-router-dom'
import cspan from '../../scripts/cspan.json'

export default class BillPres extends Component{
    constructor(props){
        super();
        this.state = {
            bgCol: 'black',
            fgCol: 'white',
            size: props.margins,
            width: props.width,
            liked: false,
            isDem: props.isDem,
            helpOpen: false,
            color: (sessionStorage.getItem('color')?sessionStorage.getItem('color'):props.color),
            isPinned: props.isPinned,
            imageFrame: document.body.clientWidth,
            opened: false,
            num: props.num,
            sum: props.isBill?props.sum:cspan[props.num][Object.keys(cspan[props.num])]['description'],
            date: ''
        }
        if(props.isBill == true){
            this.name = props.auth.split('Cosponsors')[0].split("Sponsor: ")[1].split(this.state.isDem?'[D-':'[R-')[0]
            this.firstnames = this.name.split(' ').slice(2, -1).join('-')
        }
    }

    /* plain
    "0":{"title":
    "names":"\n\tTo amend the Alaska Native Claims Settlement Act to exclude certain payments to Alaska Native elders for determining eligibility for certain programs, and for other purposes.",
    "sponsors":"\n\tSponsor: Rep. Young, Don [R-AK-At Large] (Introduced 10/23/2020) Cosponsors: (0)",
    "bills":"\n\tTo amend the Alaska Native Claims Settlement Act to exclude certain payments to Alaska Native elders for determining eligibility for certain programs, and for other purposes.",
    "latestAction":"\n\t2020-10-23 - Introduced in House",
    "coms":"\n\tCommittees: House - Natural Resources",
    "tracker":"\n\tIntroduced House"}
    */

    /* ones with titles
    "62":{"title":"H.R.8807 — 116th Congress (2019-2020)","names":"EV MAP Act",
    "sponsors":"Sponsor: Rep. O'Halleran, Tom [D-AZ-1] (Introduced 11/24/2020) Cosponsors: (1)",
    "bills":"EV MAP Act",
    "latestAction":"2020-11-24 - Introduced in House",
    "coms":"Committees: House - Energy and Commerce",
    "tracker":"Introduced House"}
    */

    switchLike(){
        this.setState({liked: (this.state.liked==true?false:true)})
    }


    update = (e) => {
        this.setState({size: this.props.margins, width: this.props.width, imageFrame: e.target.outerWidth});
    }

    componentDidMount(){
        window.addEventListener('resize', this.update);
        if(this.props.isBill==true){
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let now = new Date(this.props.date.split(' ')[0]);
            console.log(now + '\n\n\n\n\n\nn\n\n\n\n\n\n\n\n')
            this.setState({date: months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear()});
        }
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.update);
    }

    handleClickOutside(){
      this.setState({
        helpOpen: false
      })
    }

    toggleList(){
      this.setState(prevState => ({
        helpOpen: !prevState.helpOpen
      }))
    }

    // render(){
    //   const{list} = this.props
    //   const{helpOpen, headerTitle} = this.state
    //   return(
    //     <div className="dd-wrapper">
    // <div className="dd-header" onClick={() => this.toggleList()}>
    //         <div className="dd-header-title">{headerTitle}</div>
    //         {helpOpen
    //           ? <FontAwesome name="angle-up" size="2x"/>
    //           : <FontAwesome name="angle-down" size="2x"/>
    //         }
    //     </div>
    // {helpOpen && <ul className="dd-list">
    //        {list.map((item) => (
    //          <li className="dd-list-item" key={item.id} >{item.title}</li>
    //         ))}
    //       </ul>}
    //     </div>
    //   )
    // }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.color !== this.props.color) {
            this.setState({color: this.props.color})
        }
    }

    flipShow = () => {
        this.setState({opened: !this.state.opened})
    }

    refresh = () => {
        setTimeout(()=>window.location.reload(), 200)
    }

    render(){
        return(
            <div>
            {console.log(this.props)}
                {(this.props.isBill === true) ?
                    <Card id = "test" style={{ 
                        width: this.state.width, 
                        margin: this.state.size, 
                        fontSize: '1rem',
                        borderRadius: '0px'
                    }} bg = {this.state.color=='light'?"white":'dark'} text = {this.state.color=='light'?'black':'white'} className = 'text-left justify-content-center mx-auto'>
                        <Card.Body>
                            <Card.Title style = {{fontWeight: 'bold'}}>
                                <i className = 'fas fa-scroll'></i>{this.props.title.includes("H.R.")?"  House Bill":"  Senate"}: {this.props.title.split(' ')[0] + " " + (this.props.realSum!=''?this.props.sum: '')}
                                <button style = {{float: 'right'}} type = 'button' onClick={()=>this.toggleList()} className='dropdownButton'>
                                    <i className="fas fa-ellipsis-h"></i>
                                </button>
                                {this.state.helpOpen?
                                    <div className = "HELP">
                                        <p>p</p>
                                    </div>:""
                                }
                            </Card.Title>
                            {this.state.date}
                            <br />
                            <em style = {{color:this.state.color=='light'?'rgba(0, 0, 0, 0.7)':'rgba(255, 255, 255, 0.5)'}} >{this.props.date.split(' - ')[1].includes('Passed/agreed')
                            ?("Passed " + (this.props.date.includes('House')?"House":"Senate")):this.props.date.split(' - ')[1]}</em>
                            <hr /> {/*
                                                                            Earl L. \"Buddy\" Carter
                                                                            Donald M. Payne, Jr.
                            */}
                            <Card.Text>
                                <p>{this.props.realSum==''?this.props.sum:(this.state.opened==true||this.props.realSum.split(' ').length<30?this.props.realSum:this.props.realSum.split(' ').slice(0, 30).join(' ')+'...')}</p>
                                {this.props.realSum!=''&&this.props.realSum.split(' ').length>30?
                                <div>
                                <span style = {{display: 'block', padding: '1%'}}></span>
                                    <p onClick = {this.flipShow}style = {{cursor: 'pointer', color: this.state.color=='light'?'rgba(0, 0, 0, 0.7)':'rgba(255, 255, 255, 0.5)'}}>
                                    Show {this.state.opened==false?"more":"less"} <i class = {'fas fa-chevron-'+(this.state.opened==false?'down':'up')}></i></p>
                                </div>:''}
                            </Card.Text>
                            <hr />{console.log(this.firstnames.includes('Jr.')?'jr.':'', this.firstnames.includes('Sr.')?'sr.':'')}

                            <Link onClick = {this.refresh} to = {`/congress/${(this.firstnames.split(',')[0] + '-' + this.name.split(' ')[1].split(',')[0]).toLowerCase() + (this.name.includes('Jr.')?'^jr.':'') + (this.name.includes('Sr.')?'^sr.':'')}`}>
                                <Card.Text style = {{color: this.state.isDem?'rgb(59, 113, 159)':'rgb(178, 47, 3)'}}>
                                    <strong><a style = {{color: this.state.color==='light'?'black':'white'}}>
                                        <i style = {{marginRight: '3px'}} className = 'fa fa-user-circle'></i> {this.props.auth.split('Cosponsors')[0].split("Sponsor: ")[1].split(this.state.isDem?'[D-':'[R-')[0]}
                                        </a><i style = {{float: "right"}}className={`fas fa-${this.state.isDem?'democrat':'republican'}`}></i>
                                    </strong>
                                </Card.Text>
                            </Link>

                            <hr />
                            <Card.Text style= {{justifyContent: 'center'}}>
                                <div style = {{display: 'inline-block', float: 'left'}} className = 'button_area'>
                                    <button style={{justifyContent:'center'}}className = 'button' onClick = {()=>{this.switchLike(); if(this.state.liked!=true) this.props.updatePins([this.props.index, 'bill'])}}>
                                        <i className="fas fa-thumbtack fa-lg" style={{ color: this.state.liked||this.state.isPinned ? 'red' : '#999999'}}></i>
                                    </button>
                                </div>
                                <div style = {{display: 'inline-block', float: 'right'}} className = 'button_area'>
                                    <button className = 'button' style={{color: this.state.color==='light'?'gray':'lightgray'}}>
                                        Summary
                                    </button>
                                </div>
                                <div style = {{display: 'inline-block', float: 'right'}} className = 'button_area'>
                                    <button onClick = {() => window.location.href = this.props.link} className = 'button' style={{color: this.state.color=='light'?'gray':'lightgray'}}>
                                        <i className = 'fas fa-link'></i> Original Text
                                    </button>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                : 
                    <Card id = "test" style={{ 
                        width: this.state.width, 
                        margin: this.state.size, 
                        fontSize: '1rem',
                        borderRadius: '0px'
                    }} bg = {this.state.color=='light'?"white":'dark'} text = {this.state.color=='light'?'black':'white'} className = 'text-left justify-content-center mx-auto'>
                        <Card.Body>
                            <Card.Title style = {{fontWeight: 'bold'}}>
                                <i className = 'fas fa-play'></i>{" CSPAN"}: {cspan[this.state.num][Object.keys(cspan[this.state.num])]['title']}
                                {this.state.helpOpen?
                                    <div className = "HELP">
                                        <p>p</p>
                                    </div>:""
                                }
                            </Card.Title>
                            {cspan[this.state.num][Object.keys(cspan[this.state.num])]['summary'].split('~~~')[0]}
                            <hr /> {/*
                                                                            Earl L. \"Buddy\" Carter
                                                                            Donald M. Payne, Jr.
                            */}
                            <div style = {{overflow: 'hidden', textAlign: 'center', margin: '0 0 0 7.5%'}} class = 'imagePreview'>
                            {console.log(cspan[this.state.num][Object.keys(cspan[this.state.num])]['link'].split('/video/').join('/video/standalone/'))}
                                <iframe style = {{margin: '-6% 0 0 -11%'}} width={'95%'} height={this.state.imageFrame*0.48} src={cspan[this.state.num][Object.keys(cspan[this.state.num])]['link'].split('/video/').join('/video/standalone/')} allowFullScreen={'allowfullscreen'} frameBorder={0}></iframe>
                            </div>
                            {console.log(cspan[this.state.num][Object.keys(cspan[this.state.num])]['link'])}
                           
                            <hr />

                            {
                                cspan[this.state.num][Object.keys(cspan[this.state.num])]['description']==""?
                                <p style = {{fontSize: '0.8em', color: this.state.color=='light'?'rgba(0, 0, 0, 0.5)':'rgba(255, 255, 255, 0.5)'}}>No description</p>:
                                <Card.Text>
                                    <strong>
                                        {this.state.opened?cspan[this.state.num][Object.keys(cspan[this.state.num])]['description']:
                                        this.state.sum.split(' ').slice(0, 20).join(' ')}
                                        {this.state.opened==false&&
                                        this.state.sum.split(' ').slice(0, 20).join(' ')!=cspan[this.state.num][Object.keys(cspan[this.state.num])]['description']?'...':''}
                                        <br />
                                    </strong>
                                    <span style = {{display: 'block', padding: '1%'}}></span>
                                        <p onClick = {this.flipShow}style = {{cursor: 'pointer', color: this.state.color=='light'?'rgba(0, 0, 0, 0.7)':'rgba(255, 255, 255, 0.5)'}}>Show {this.state.opened==false?"more":"less"} <i class = {'fas fa-chevron-'+(this.state.opened==false?'down':'up')}></i></p>
                                </Card.Text>

                            }
                            <hr />
                            
                            <Card.Text style= {{justifyContent: 'center'}}>
                                <div style = {{display: 'inline-block', float: 'left'}} className = 'button_area'>
                                    <button style={{justifyContent:'center'}}className = 'button' onClick = {()=>{this.switchLike(); if(this.state.liked!=true) this.props.updatePins([this.props.index, 'cspan'])}}>
                                        <i className="fas fa-thumbtack fa-lg" style={{ color: this.state.liked||this.state.isPinned ? 'red' : '#999999'}}></i>
                                    </button>
                                </div>
                                <div style = {{display: 'inline-block', float: 'right'}} className = 'button_area'>
                                    <button onClick = {() => window.location.href = cspan[this.state.num][Object.keys(cspan[this.state.num])]['link']} className = 'button' style={{color: this.state.color=='light'?'gray':'lightgray'}}>
                                        <i className = 'fas fa-link'></i> Video
                                    </button>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                }
            </div>
        )
    }
}
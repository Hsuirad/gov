import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../../index.css'
import onClickOutside from 'react-onclickoutside'
import memberData from '../../scripts/members.json'
import { Link } from 'react-router-dom'


export default class VidPres extends Component{
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
            isPinned: props.isPinned
        }

        this.name = props.auth.split('Cosponsors')[0].split("Sponsor: ")[1].split(this.state.isDem?'[D-':'[R-')[0]
        this.firstnames = this.name.split(' ').slice(2, -1).join('-')
    }

    /*
    "0":{"title":
    "names":"\n\tTo amend the Alaska Native Claims Settlement Act to exclude certain payments to Alaska Native elders for determining eligibility for certain programs, and for other purposes.",
    "sponsors":"\n\tSponsor: Rep. Young, Don [R-AK-At Large] (Introduced 10/23/2020) Cosponsors: (0)",
    "bills":"\n\tTo amend the Alaska Native Claims Settlement Act to exclude certain payments to Alaska Native elders for determining eligibility for certain programs, and for other purposes.",
    "latestAction":"\n\t2020-10-23 - Introduced in House",
    "coms":"\n\tCommittees: House - Natural Resources",
    "tracker":"\n\tIntroduced House"}
    */

    switchLike(){
        this.setState({liked: (this.state.liked==true?false:true)})
    }


    update = () => {
        this.setState({size: this.props.margins, width: this.props.width});
    }

    componentDidMount(){
        window.addEventListener('resize', this.update);
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

    refresh = () => {
        setTimeout(()=>window.location.reload(), 200)
    }

    render(){
        return(
            <div>
                <Card id = "test" style={{ 
                    width: this.state.width, 
                    margin: this.state.size, 
                    fontSize: '1rem',
                    borderRadius: '0px'
                }} bg = {this.state.color=='light'?"white":'dark'} text = {this.state.color=='light'?'black':'white'} className = 'text-left justify-content-center mx-auto'>
                    <Card.Body>
                        <Card.Title style = {{fontWeight: 'bold'}}>
                            <i className = 'fas fa-scroll'></i>{this.props.title.includes("H.R.")?"  House Bill":"  Senate"}: {this.props.title.split(' ')[0]}
                            <button style = {{float: 'right'}} type = 'button' onClick={()=>this.toggleList()} className='dropdownButton'>
                                <i className="fas fa-ellipsis-h"></i>
                            </button>
                            {this.state.helpOpen?
                                <div className = "HELP">
                                    <p>p</p>
                                </div>:""
                            }
                        </Card.Title>
                        <hr /> {/*
                                                                        Earl L. \"Buddy\" Carter
                                                                        Donald M. Payne, Jr.
                        */}
                        <Card.Text>
                            <em>{this.props.sum}</em>
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
                                <button style={{justifyContent:'center'}}className = 'button' onClick = {()=>{this.switchLike(); if(this.state.liked!=true) this.props.updatePins(this.props.index)}}>
                                    <i className="fas fa-thumbtack fa-lg" style={{ color: this.state.liked||this.state.isPinned ? 'red' : '#999999'}}></i>
                                </button>
                            </div>
                            <div style = {{display: 'inline-block', float: 'right'}} className = 'button_area'>
                                <button className = 'button' style={{color: this.state.color==='light'?'gray':'lightgray'}}>
                                    Summary
                                </button>
                            </div>
                            <div style = {{display: 'inline-block', float: 'right'}} className = 'button_area'>
                                <button onClick = {() => alert('No text written yet')} className = 'button' style={{color: this.state.color=='light'?'gray':'lightgray'}}>
                                    <i className = 'fas fa-link'></i> Original Text
                                </button>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
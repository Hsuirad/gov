import React, {Component} from 'react';
import HomeNav from '../billPage/components/homeNav'
import useBreakpoints from '../_customHooks/useBreakpoint'
import Cards from '../billPage/components/Cards'
import BottomBar from '../billPage/components/BottomBar'
import Profile from '../billPage/components/Profile'

    /*
    "0":{"title":
    "names":"\n\tTo amend the Alaska Native Claims Settlement Act to exclude certain payments to Alaska Native elders for determining eligibility for certain programs, and for other purposes.",
    "sponsors":"\n\tSponsor: Rep. Young, Don [R-AK-At Large] (Introduced 10/23/2020) Cosponsors: (0)",
    "bills":"\n\tTo amend the Alaska Native Claims Settlement Act to exclude certain payments to Alaska Native elders for determining eligibility for certain programs, and for other purposes.",
    "latestAction":"\n\t2020-10-23 - Introduced in House",
    "coms":"\n\tCommittees: House - Natural Resources",
    "tracker":"\n\tIntroduced House"}
    */
 
export default class HomePage extends Component{
    constructor(props){
        super()
        this.state = {
            point: props.point,
            size: props.size,
            colorMode: 'light'
        }
    }

    convertToMargin = (val) => {
        //console.log(val)
        if(val == 'xs'){
            return "5px 0 10px 0"
        } else if(val == 'sm'){
            return "5px 0 10px 0"
        } else if(val == 'md'){
            return "5px 0 10px 0"
        } else if(val == 'lg'){
            return "30px 0 30px 0"
        } else if(val == 'xlg'){
            return "30px 0 30px 0"
        }
    }

    update = () => {
        this.setState({point: this.props.point});
    }

    componentDidMount(){
        window.addEventListener('resize', this.update);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.update);
    }

    handleChange = (e) => {
        console.log(e)
        this.setState({colorMode: e})
    }
    
    render(){
        return(
            <div className="App" style = {{justifyContent: 'center', backgroundColor: this.state.colorMode=='light'?'white':'rgb(42, 48, 54)'}}>
                {/* <h2>Current Device: {convertToMargin(point)}</h2> */}
                {console.log('child' + this.state.point)}
                {console.log('child' + this.convertToMargin(this.state.point))}
                {/*<Profile />*/}
                {/*to dynamically add and remove, just create a this.state filled with all the BillPres-s, then just delete or add with another function based on whether its there or not*/}
                {this.state.point == 'xlg' ? <HomeNav handleChange = {this.handleChange} /> : console.log('test')}
                <small>hey</small>
                {this.state.point != 'xlg' ? <BottomBar handleChange = {this.handleChange} /> : ""}
            </div>
        )
    }
}
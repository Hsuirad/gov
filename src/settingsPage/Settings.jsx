import React, {Component} from 'react';
import HomeNav from '../billPage/components/homeNav'
import BottomBar from '../billPage/components/BottomBar'
import './sidebar.css'
import SideBar from './components/SideBar'

export default class Settings extends Component{
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
            <div id = 'outer-container' className="App" style = {{justifyContent: 'left', backgroundColor: this.state.colorMode=='light'?'white':'rgb(42, 48, 54)'}}>
                {this.state.point == 'xlg' ? <SideBar right isOpen={false} pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> : ""}
                <div id = 'page-wrap'>
                    <div style = {{marginTop: '50px'}}>
                        
                    </div>
                    {this.state.point != 'xlg' ? <BottomBar showBrand = {"Settings"} handleChange = {this.handleChange} /> : ""}
                </div>
            </div>
        )
    }
}
import React, {Component} from 'react';
import HomeNav from '../billPage/components/homeNav'
import BottomBar from '../billPage/components/BottomBar'

export default class SearchPage extends Component{
    constructor(props){
        super()
        this.state = {
            point: props.point,
            size: props.size,
            colorMode: (sessionStorage.getItem('color')?sessionStorage.getItem('color'):'light')
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
                <p style = {{marginTop: '15%'}}>
                    <form method="get" target="_top" role="search" action=" https://congress.gov/search" >
                        <div id="search-wrapper" class="search_wrapper">
                            <div class="search_formats">
                                <select id="search-format" name="search-source">
                                    <optgroup label="Search by Congress">
                                        <option value="current-congress">Current Congress</option>
                                        <option value="all-congresses">All Congresses</option>
                                    </optgroup>
                                    <optgroup label="Search by Source">
                                        <option value="legislation">Legislation</option>
                                        <option value="committee-materials">Committee Materials</option>
                                        <option value="congrecord">Congressional Record</option>
                                        <option value="members">Members</option>
                                        <option value="nominations">Nominations</option>
                                    </optgroup>
                                </select>
                                <input id="search" type="text" class="locsuggest" name="q" placeholder="Examples: hr5, sres9, &quot;health care&quot;" defaultValue="" />
                                <button class="search_submit" id="search-submit" type="submit">GO</button>
                            </div>
                        </div>
                    </form> 
                </p>
                {this.state.point != 'xlg' ? <BottomBar handleChange = {this.handleChange} /> : ""}
            </div>
        )
    }
}
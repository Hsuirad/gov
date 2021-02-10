import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../../index.css'
import logo from '../../cursivelogo.png'
import { Link } from 'react-router-dom'

export default class BottomBar extends Component{
    constructor(){
        super();
        this.state = {
            color: (sessionStorage.getItem('color')?sessionStorage.getItem('color'):'light'),
            toggleClass: '.toggle',
            content: '☀️',
            pinnedCards: []
        }
    }

    flipState = () => {
        if(this.state.color === 'light'){
            this.setState({
                color: 'dark'
            });
            this.props.handleChange('dark')
            sessionStorage.setItem('color', 'dark')
        } else{
            this.setState({
                color: 'light'
            })
            this.props.handleChange('light')
            sessionStorage.setItem('color', 'light')
        }
    }

    componentDidUpdate(previousProps, previousState) {
        console.log(this.props.pinnedCards)
        if (previousProps.pinnedCards !== this.props.pinnedCards) {
            this.setState({pinnedCards: this.props.pinnedCards})
        }
    }

    refresh = () => {
        console.log(this.props.pinnedCards)
        localStorage.setItem('data', this.props.pinnedCards)
        console.log(localStorage)
        setTimeout(()=>window.location.reload(), 100)
    }

    render(){
        return(
            <div>
                <Navbar style = {{justifyContent: 'center'}} bg = {this.state.color} variant = {this.state.color} fixed = 'top'>
                    <Nav.Link style = {{
                          fontSize: '15px',
                          fontWeight: '600',
                          lineHeight: 0,
                          letterSpacing: '0.1rem',
                          margin: this.props.showBrand === 'Settings'?'7px 0 7px 0':"0",
                          textTransform: 'uppercase'
                    }}> {/*204 height 808 width*/}
                        {this.props.showBrand === 'Settings'?
                        <p style = {{
                            color: this.state.color === 'light' ? 'black' : 'white',
                            margin: '0',
                            padding: '0'
                        }}>Settings</p>    :
                        <img style = {{filter: this.state.color==='dark'?'invert(1)':''}} src={logo} height={204/8} width = {808/8} alt=""></img>}
                    </Nav.Link>
                </Navbar>
                <Navbar bg={this.state.color} variant = {this.state.color} fixed = 'bottom' expand="lg">         
                        <Link to = '/'><Nav.Link onClick = {this.refresh} style={{color:this.state.color=='dark'?'white':'black'}} href="#home"><i class="fas fa-home fa-lg"></i></Nav.Link></Link>
                        <Link to = '/pinned'><Nav.Link onClick = {this.refresh} style={{color:this.state.color=='dark'?'white':'black'}} href="#bink"><i class="fas fa-thumbtack fa-lg"></i></Nav.Link></Link>
                        <Link to = '/bills'><Nav.Link onClick = {this.refresh} style={{color:this.state.color=='dark'?'white':'black'}} href="#link"><i class="fas fa-newspaper fa-lg"></i></Nav.Link></Link>
                        <Link to = '/search'><Nav.Link onClick = {this.refresh} style={{color:this.state.color=='dark'?'white':'black'}} href="#tink"><i class="fas fa-search fa-lg"></i></Nav.Link></Link> {/*Have a profile site for all the representatives and senators*/} 
                        <Link to = '/settings'><Nav.Link onClick = {() => {this.refresh(); this.flipState()}} style={{color:this.state.color=='dark'?'white':'black'}} href="#jink">
                            <span style = {{
                                cursor: 'pointer',
                                color: this.state.color=='dark'?'white':'black'
                            }}><i class={`fas fa-cog fa-lg`}></i></span>
                        </Nav.Link></Link>
                </Navbar>
            </div>
        )
    }
}
import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../../index.css'
import Form from 'react-bootstrap/Form';
import logo from '../../logo1.png'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'
import {Link} from 'react-router-dom'

export default class homeNav extends Component{
    constructor(){
        super();
        this.state = {
            color: 'light',
            toggleClass: '.toggle',
            content: '☀️'
        }
    }

    flipState = () => {
        if(this.state.color == 'light'){
            this.setState({
                color: 'dark'
            });
            this.props.handleChange('dark')
        } else{
            this.setState({
                color: 'light'
            })
            this.props.handleChange('light')
        }
    }

    // document.querySelector('.toggle').addEventListener('click', function() {
    //     this.classList.add('animate');

    //     console.log('test')
        
    //     setTimeout(() => {
    //         this.classList.toggle('active');
    //     }, 150);
        
    //     setTimeout(() => this.classList.remove('animate'), 300);
    // });

    changeClass = () => {
        if(this.state.content == "🌒"){
            this.setState({toggleClass: '.toggle animate', content: '☀️'});

            setTimeout(() => {
                this.setState({toggleClass: '.toggle animate active', content: '☀️'})
            }, 150)

            setTimeout(() => this.setState({toggleClass: '.toggle active', content: '☀️'}), 300)
        } else{
            this.setState({toggleClass: '.toggle animate', content: '🌒'});

            setTimeout(() => {
                this.setState({toggleClass: '.toggle animate active', content: '🌒'})
            }, 150)

            setTimeout(() => this.setState({toggleClass: '.toggle active', content: '🌒'}), 300)
        }
    }

    // .toggle {
    //     position: absolute;
    //     cursor: pointer;
    //     top: 20px;
    //     right: 25px;
    //     font-size: 150%;
    //   }
      
    //   .toggle {
    //     content: '☀️';
    //   }
      
    //   .toggle.active {
    //     content: '🌒';
    //   }
      
    //   .toggle.animate {
    //     animation: animate .3s cubic-bezier(0.4, 0.0, 0.2, 1);
    //   }
      
    //   @keyframes animate {
    //     0%   { transform: scale(1); }
    //     50%  { transform: scale(0); }
    //     100% { transform: scale(1); }
    //   }

    render(){
        return(
            <Navbar bg={this.state.color} variant = {this.state.color} fixed = 'top' expand="lg">
                <Navbar.Brand href="#home">
                    <img height="45" width="45" src={logo} alt=""></img>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to = '/'><Nav.Link href="#home">Home</Nav.Link></Link>
                        <Link to = '/pinned'><Nav.Link href="#link">Saved Bills</Nav.Link></Link>
                        <Link to = '/congressmembers'><Nav.Link href="#link">Reps. & Sens.</Nav.Link></Link> {/*Have a profile site for all the representatives and senators*/} 
                        <Link to = '/bills'><Nav.Link href="#link">News</Nav.Link></Link>
                        {/* <Nav.Link onClick = {() => this.flipState()}>Toggle  mode</Nav.Link> */}
                        
                        
                    </Nav>
                    <Form inline>
                        {/* ADD THIS LATER IN SOME OTHER SECTION <FormControl type="text" placeholder="Search Bills" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button> */}
                        <span className={this.state.toggleClass} onClick = {() => {this.changeClass(); this.flipState()}} style = {{
                            cursor: 'pointer',
                            fontSize: '150%'
                        }}>{this.state.content}</span>
                    </Form>
                </Navbar.Collapse>
            </Navbar>

            // <div class="card promoting-card">

            //     {/* <!-- Card content --> */}
            //     <div class="card-body d-flex flex-row">

            //         {/* <!-- Avatar --> */}
            //         <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg" class="rounded-circle mr-3" height="50px" width="50px" alt="avatar">

            //         {/* <!-- Content --> */}
            //         <div>

            //         {/* <!-- Title --> */}
            //         <h4 class="card-title font-weight-bold mb-2">New spicy meals</h4>
            //         {/* <!-- Subtitle --> */}
            //         <p class="card-text"><i class="far fa-clock pr-2"></i>07/24/2018</p>

            //         </div>

            //     </div>

            //     {/* <!-- Card image --> */}
            //     <div class="view overlay">
            //         <img class="card-img-top rounded-0" src="https://mdbootstrap.com/img/Photos/Horizontal/Food/full page/2.jpg" alt="Card image cap">
            //         <a href="#!">
            //         <div class="mask rgba-white-slight"></div>
            //         </a>
            //     </div>

            //     {/* <!-- Card content --> */}
            //     <div class="card-body">

            //         <div class="collapse-content">

            //         {/* <!-- Text --> */}
            //         <p class="card-text collapse" id="collapseContent">Recently, we added several exotic new dishes to our restaurant menu. They come from countries such as Mexico, Argentina, and Spain. Come to us, have some delicious wine and enjoy our juicy meals from around the world.</p>
            //         {/* <!-- Button --> */}
            //         <a class="btn btn-flat red-text p-1 my-1 mr-0 mml-1 collapsed" data-toggle="collapse" href="#collapseContent" aria-expanded="false" aria-controls="collapseContent"></a>
            //         <i class="fas fa-share-alt text-muted float-right p-1 my-1" data-toggle="tooltip" data-placement="top" title="Share this post"></i>
            //         <i class="fas fa-heart text-muted float-right p-1 my-1 mr-3" data-toggle="tooltip" data-placement="top" title="I like it"></i>

            //         </div>

            //     </div>

            // </div>
        )
    }
}
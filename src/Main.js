import React, {Component} from 'react';
import './App.css';
import BillPage from './billPage/BillPage'
import HomePage from './homePage/HomePage'
import PinnedPage from './pinnedPage/PinnedPage'
import SearchPage from './searchPage/SearchPage'
import Settings from './settingsPage/Settings'
import MemberPage from './memberPage/MemberPage'
import {
  BrowserRouter as Router,
  Switch, 
  Route
} from 'react-router-dom'

//use flutter for mobile
//check into redux

export default class Main extends Component {

  constructor(props){
    super();
    this.state = {
      point: props.point,
      size: props.size,
      pinnedCards: []
    }
  }

  update = () => {
    this.setState({point: this.props.point, size: this.props.size});
  }

  componentDidMount(){
      window.addEventListener('resize', this.update);
  }

  componentWillUnmount(){
      window.removeEventListener('resize', this.update);
  }

  forceChange = () => {
    this.forceUpdate();
  }

  updatePins = (e) => {
    console.log(e)
    this.setState({pinnedCards: e})
  }

  render(){
    return (
      <Router>
        <Switch>
          <Router path = '/bills'>
            <BillPage updatePins = {this.updatePins} size={0} point = {this.state.point} />
          </Router>
          <Router path = '/pinned'>
            <PinnedPage data = {this.state.pinnedCards} updatePins = {this.updatePins} size={0} point = {this.state.point} />
          </Router>
          <Router path = '/search'>
            <SearchPage />
          </Router>
          <Router path = '/settings'>
            <Settings size={0} point = {this.state.point} />
          </Router>
          <Route path = '/congress/:person' component = {MemberPage} />
          <Router path = '/'>
            <HomePage />
          </Router>
        </Switch>
      </Router>
    );
  }
}

import React from 'react';
import logo from './logo.svg';
import './App.css';
import useBreakpoints from './_customHooks/useBreakpoint'
import Main from './Main'

//use flutter for mobile
//check into redux

function App() {

  let point = useBreakpoints()

  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
  React.useEffect(() => {
    function handleResize() {
      point = point
      console.log('test', point)
    }

    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  }) 

  /*make a setting screen with a 'cog' fa and a 'bell' and 'bell slash'*/

  return (
    <Main size={0} point = {point} />
  );
}

export default App;

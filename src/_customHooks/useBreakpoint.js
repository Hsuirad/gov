import {useState, useEffect} from 'react';
import throttle from 'lodash.throttle';

const getDeviceConfig = (width) => {
    if(width < 320) {
        return 'xs';
    } else if(width >= 320 && width < 640) {
        return 'sm'; //all of them are clumped together
    } else if(width >= 640 && width < 730) {
        return 'md'; //15px margins
    } else if(width >= 730 && width < 1000){
        return 'lg'; //60 px margins
    } else if(width >= 1000) {
        return 'xlg'; //show side profile section
    }
};

const useBreakpoint = () => {
  const [brkPnt, setBrkPnt] = useState(() => getDeviceConfig(window.innerWidth));
  
  useEffect(() => {
    const calcInnerWidth = throttle(function() {
      setBrkPnt(getDeviceConfig(window.innerWidth))
    }, 200); 
    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return brkPnt;
}
export default useBreakpoint;
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

//URI 변경시, pageview 이벤트 전송 (GA4)
const RouteChangeTracker = () => {
  //location = url 추적
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  // localhost 추적 제외
  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize(process.env.REACT_APP_GA_ID);
      setInitialized(true);
    }
  }, []);

  // location 변경시 pageview 이벤트 발생
  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: location.pathname });
      ReactGA.send('pageview');
    }
  }, [initialized, location]);
};

export default RouteChangeTracker;

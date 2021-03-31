import './App.css';

import { useEffect } from 'react';

import { useStore } from './store-context';
import { InitializeVideoListing } from './actions';
import { VideoListing } from './video-listing/videoListing';
import { Sidenav } from './sidenav/sidenav';


import { videos } from './server/mock.api';

function App() {

  const { dispatch } = useStore();
  useEffect(() => {
    dispatch(new InitializeVideoListing(videos) );
  }, [dispatch]);

  return (
    <div className="App">
      <nav></nav>
      <div className="container">
        <Sidenav></Sidenav>
        <VideoListing/>
      </div>      
    </div>
  );
}

export default App;

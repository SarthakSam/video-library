import { useEffect } from 'react';
import axios from 'axios';

import './App.css';
import { useStore } from './store-context';
import { InitializeVideoListing } from './actions';
import { VideoListing } from './video-listing/videoListing';
import { Sidenav } from './sidenav/sidenav';

function App() {

  const { dispatch } = useStore();

  const getVideos = async () => {
    const res = await axios.get('/api/videos')
    dispatch(new InitializeVideoListing(res.data.videos) );
  }

  useEffect(() => {
    getVideos();
  }, []);

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

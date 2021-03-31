import { useEffect } from 'react';
import axios from 'axios';

import './App.css';
import { useStore } from './store-context';
import { InitializePlaylists, InitializeVideoListing } from './actions';
import { VideoListing } from './video-listing/videoListing';
import { Sidenav } from './sidenav/sidenav';

function App() {

  const { dispatch } = useStore();

  const getVideos = async () => {
    const res = await axios.get('/api/videos')
    dispatch(new InitializeVideoListing(res.data.videos) );
  }

  const getPlaylists = async () => {
    const res = await axios.get('/api/playlists')
    dispatch(new InitializePlaylists(res.data.playlists) );
  }

  useEffect(() => {
    getVideos();
    getPlaylists();
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

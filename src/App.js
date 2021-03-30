import './App.css';

import { useEffect } from 'react';

import { useStore } from './store-context';
import { InitializeVideoListing } from './actions';
import { VideoListing } from './video-listing/videoListing';


import { videos } from './server/mock.api';

function App() {

  const { dispatch } = useStore();
  useEffect(() => {
    dispatch(new InitializeVideoListing(videos) );
  }, []);

  return (
    <div className="App">
      <nav></nav>
      <aside></aside>
      <VideoListing/>
    </div>
  );
}

export default App;

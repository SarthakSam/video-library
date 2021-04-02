import { useEffect } from 'react';
import axios from 'axios';

import styles from './App.module.css';
import { useStore } from './store-context';
import { InitializePlaylists, InitializeVideoListing } from './actions';

import { Content } from './content/Content';

import { Nav } from './nav/Nav';
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
    <div className={ styles.App }>
      <div className={ styles.nav__container }>
        <Nav/>
      </div>
      <div className={ styles.sidenav__container }>
        <Sidenav />
      </div>
      <div className={ styles.content__container }>
        <Content />
      </div>
    </div>
  );
}

export default App;

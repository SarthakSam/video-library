import styles from './App.module.css';
import { Content } from './content/Content';
import { Nav } from './nav/Nav';
import { Sidenav } from './sidenav/sidenav';
import { Loader } from './common-components/loader/Loader';
import { useLoader } from './loader-context';

function App() {

  const { loading } = useLoader();

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
      <Loader loading = { loading } />
    </div>
  );
}

export default App;

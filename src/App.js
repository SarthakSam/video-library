import styles from './App.module.css';
import { Content } from './content/Content';
import { Nav } from './nav/Nav';
import { Sidenav } from './sidenav/sidenav';

function App() {

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

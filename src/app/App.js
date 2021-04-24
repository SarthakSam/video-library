import { Routes, Route } from 'react-router-dom';

import styles from './App.module.css';
import { Content } from '../content/Content';
import { Nav } from '../nav/Nav';
import { Loader } from '../common-components/loader/Loader';
import { useLoader } from '../contexts/loader-context';
import { NotificationContainer } from '../common-components/notification/Notification-container';
import { useNotifications } from '../contexts/notifications-context';
import { Signin } from '../signin/Signin';
import { Signup } from '../signup/Signup';

function App() {

  const { loading } = useLoader();
  const { notifications } = useNotifications();

  return (
    <div className={ styles.App }>
      <div className={ styles.nav__container }>
        <Nav/>
      </div>
      <div className={ styles.body__container }>
        <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Content />} />
          </Routes>
      </div>
      <Loader loading = { loading } />
      <NotificationContainer notifications = { notifications } />
    </div>
  );
}

export default App;

import Login from './screens/Login';
import Home from './screens/Home';

function App() {
  const loggedIn = true;
  if (loggedIn) {
    return Home();
  }

  return Login();
}

export default App;

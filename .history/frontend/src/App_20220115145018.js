import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './screens/Login';
import Home from './screens/Home';
import PostStudy from "./screens/PostStudy";
import Study from './screens/Study';
import Profile from './screens/Profile';
import ChoiceOnboard from './screens/ChoiceOnboard'

function App() {
  const loggedIn = false;
  return (
    <Router >
      {loggedIn ? (
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/postStudy" element={<PostStudy/>} />
          <Route exact path="/study/:studyID" element={<Study/>} />
          <Route exact path="/profile/:userID" element={<Profile/>} />
        </Routes>) : (
        <Routes>
          <Route exact path="/" element={<ChoiceOnboard/>} />
        </Routes>
      )}
    </Router>
  )
}

export default App;

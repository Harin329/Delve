import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import PostStudy from "./screens/PostStudy";
import Study from './screens/Study';
import Profile from './screens/Profile';
import PostStudyResults from './screens/PostStudyResults';
import ReportUpdate from "./screens/ReportUpdate";

function App() {
  const loggedIn = true;
  return (
    <Router >
      {loggedIn ? (
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/postStudy" element={<PostStudy/>} />
          <Route exact path="/study/:studyID" element={<Study/>} />
          <Route exact path="/profile/:userID" element={<Profile/>} />
          <Route exact path="/postResults/:studyID" element={<PostStudyResults/>} />
          <Route exact path="/postUpdate/:studyID" element={<ReportUpdate/>} />
        </Routes>) : (
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/signup" element={<Signup/>} />
        </Routes>
      )}
    </Router>
  )
}

export default App;

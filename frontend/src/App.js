import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";


import Login from './screens/Login';
import LandingPage from "./screens/LandingPage";
import ChoiceOnboard from "./screens/ChoiceOnboard";
import Signup from './screens/Signup';
import Home from './screens/Home';
import PostStudy from "./screens/PostStudy";
import Study from './screens/Study';
import Profile from './screens/Profile';
import PostStudyResults from './screens/PostStudyResults';
import ReportUpdate from "./screens/ReportUpdate";



function App () {

  const firebaseConfig = {
    apiKey: "AIzaSyCfzhkWjKe73Eb8Ojovc75dghbsDy-DU-E",
    authDomain: "nwhacks2022.firebaseapp.com",
    projectId: "nwhacks2022",
    storageBucket: "nwhacks2022.appspot.com",
    messagingSenderId: "1086232361678",
    appId: "1:1086232361678:web:347db725dcfd977a1eae9f"
  };  

  const app = initializeApp(firebaseConfig);

  const loggedIn = false;

  const auth = getAuth();
  const [user, setUser] = useState()
  const [test, setTest] = useState(true);

  useEffect(() => {
      // Handle user state changes
      
      onAuthStateChanged(auth, (user) => {
        setUser(user);
        setTest(false);
      })

    }, [test]);
    

  return (
    <Router >
      {user ? (
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/postStudy" element={<PostStudy/>} />
          <Route exact path="/study/:studyID" element={<Study/>} />
          <Route exact path="/profile/:userID" element={<Profile/>} />
          <Route exact path="/postResults/:studyID" element={<PostStudyResults/>} />
          <Route exact path="/postUpdate/:studyID" element={<ReportUpdate/>} />
        </Routes>) : (
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/ChoiceOnboard" element={<ChoiceOnboard/>} />
        </Routes>
      )}
    </Router>
  )
}

export default App;

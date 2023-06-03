import react, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Section from './components/Section/Section'
import Navbar from './components/Navbar/Navbar';
import Post from './components/Posts/Posts';
import Chat from './components/Chat/Chat';
import Form from './components/Form/Form';
import Subject from './components/Subjects/Subjects';
import Login from './components/Login/Login';
import { Redirect } from 'react-router-dom';
function App() {

  const [user, setUsert] = useState("user");

  if (user) {
    return (
      <div>
        <Navbar />
        {/* <Form/> */}
        <Router>
          <Route path="/sections" exact component={Section}></Route>
          <Route path="/all posts" exact component={Post}></Route>
          <Route path="/chat" exact component={Chat}></Route>
          <Route path="/subjects" exact component={Subject}></Route>
        </Router>
      </div>

    );
  } else {
    return (
      <div>

        <Router>

          <Redirect to="/login" />
          <Route path="/login" exact component={Login}></Route>
          {/* Important: this is how we go from one page to other page in react, we 
       use redirect but we need to definr Route , and use that route in redirect.
        */}
        </Router>

      </div>);
  }
}

export default App;

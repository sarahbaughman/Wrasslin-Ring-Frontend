import React, { useEffect, useState, useContext, } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './NavBar'
import Header from './Header'
import Login from './Login'
import Dashboard from './Dashboard'
import Wrestlers from './Wrestlers'
import CreateNewAccount from './WrestlerSignup'
import SwitchLabel from './SwitchLabel'
import BuildShow from './BuildShow'
import MatchBuilder from './MatchBuilder'

import { UserContext } from './../context/UserContext';


function App() {

const { user} = useContext(UserContext);
  
console.log(user)

return (
  <div>
    <Router>
        <Header/>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/wrestlers" component={Wrestlers}/>
          <Route exact path="/createnewaccount" component={SwitchLabel}/>
          <Route exact path="/matchbuilder" component={MatchBuilder}/>
        </Switch>
    </Router>
    <p>Hello from the app</p>
  </div>
)

}

export default App;

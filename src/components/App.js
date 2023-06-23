import React, {useContext, } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './NavBar'
import Header from './Header'
import Login from './Login'
import Dashboard from './Dashboard'
import Wrestlers from './Wrestlers'
import SwitchLabel from './SwitchLabel'
import BuildShow from './BuildShow'
import SubmitStoryline from './SubmitStoryline'
// import MatchBuilder from './BuildShow'

import { UserContext } from './../context/UserContext';


function App() {

const { user} = useContext(UserContext);

console.log("This is the user:")
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
          <Route exact path="/buildshow" component={BuildShow}/>
          <Route exact path="/submitstoryline" component={SubmitStoryline}/>
        </Switch>
    </Router>
    <p>Hello from the app</p>
  </div>
)

}

export default App;

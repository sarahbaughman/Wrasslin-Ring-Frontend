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
import Storylines from "./Storylines"
import WrestlerShowHistory from "./WrestlerShowHistory"
import WrestlerUpcomingShows from './WrestlerUpcomingShows'
import PromotorShowArchive from "./PromotorShowArchive"
import './Header.css'
import './app.css'


// import MatchBuilder from './BuildShow'

import { UserContext } from './../context/UserContext';


function App() {

const { user} = useContext(UserContext);

console.log("This is the user:")
console.log(user)

return (

    <Router style = {{display: 'inline-block'}}>
        <div className = 'entire-page-div'>
        <div className = 'header-div'>
          <Header/>
        </div>
        <main>
          <div className = 'nav-div'>
            <NavBar/>
          </div>
          <div className = 'main-div' style= {{display: 'inline-block'}}>
          <Switch>
            
        
              <Route exact path="/" component={Login}/> 
              <Route exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/wrestlers" component={Wrestlers}/>
              <Route exact path="/createnewaccount" component={SwitchLabel}/>
              <Route exact path="/buildshow" component={BuildShow}/>
              <Route exact path="/submitstoryline" component={SubmitStoryline}/>
              <Route exact path = "/storylines" component = {Storylines} />
              <Route exact path = "/showhistory" component = {WrestlerShowHistory} />
              <Route exact path = "/upcomingshows" component = {WrestlerUpcomingShows}/>
              <Route exact path = "/showarchive" component = {PromotorShowArchive}/> 
            
          
          
          </Switch>
          </div>
        </main>
        </div>
    </Router>

)

}

export default App;

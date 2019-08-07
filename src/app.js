import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from './components/Header'
import Games from './components/Games'
import Streams from './components/Streams'
import GameStreams from './components/GameStreams'




function App() {
    return (<Router>
      <Header />
      <div className="container">
        
          <Route exact path="/" component={Games} />
          <Route path="/top-streams" component={Streams} />
          <Route path="/game/:id" component={GameStreams} />
          
          </div>
          </Router>
    )
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { MainPage, GamePage, EntranceFeePage } from './pages';
import { Util } from './util'
import './main.css';

// layout when create app.
Util.layout();

ReactDOM.render(
  <Router>
    <div className="app" style={{ margin: Util.getPxFromDp(15) }}>
      <Route exact path="/" component={MainPage}/>
      <Route path="/entrance-fee" component={EntranceFeePage}/>
      <Route path="/game" component={EntranceFeePage}/>
    </div>
  </Router>
  , document.getElementById('root'));


import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MainPage, GamePage, EntranceFeeSettingPage, MaxPlayerSettingPage, DescriptionPage } from './pages';
import { Util } from './util'
import './main.css';

// layout when create app.
Util.layout();

ReactDOM.render(
  <Router>
    <div className="app" style={{ margin: Util.getPxFromDp(15) }}>
      <Route exact path="/" component={MainPage}/>
      <Route path="/entrance-fee" component={EntranceFeeSettingPage}/>
      <Route path="/game" component={GamePage}/>
      <Route path="/max-players" component={MaxPlayerSettingPage}/>
      <Route path="/description" component={DescriptionPage}/>
    </div>
  </Router>
  , document.getElementById('root'));


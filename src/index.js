import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import GameReducer from './redux/reducer';
import createBrowserHistory from 'history/createBrowserHistory'
import { MainPage, ResultPage, GamePage, EntranceFeeSettingPage, MaxPlayerSettingPage, DescriptionPage } from './pages';
import { Util } from './util'
import './main.css';

// layout when create app.
Util.layout();

export const store = createStore(GameReducer);
export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div className="app" style={{ margin: Util.getPxFromDp(15) }}>
        <Route exact path="/" component={MainPage}/>
        <Route path="/entrance-fee" component={EntranceFeeSettingPage}/>
        <Route path="/game" component={GamePage}/>
        <Route path="/max-players" component={MaxPlayerSettingPage}/>
        <Route path="/description" component={DescriptionPage}/>
        <Route path="/result" component={ResultPage}/>
      </div>
    </Router>
  </Provider>
  , document.getElementById('root'));


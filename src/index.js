import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import GameReducer from './redux/reducer';
import createBrowserHistory from 'history/createBrowserHistory'
import { MessageReceiver } from './components';
import { PkApi } from './gameSDK';
import {
  MainPage,
  ResultPage,
  GamePage,
  EntranceFeeSettingPage,
  MaxPlayerSettingPage,
  DescriptionPage,
  APITestPage,
  KickingPage,
} from './pages';
import './main.css';
import FastClick from 'react-fastclick-alt';
export const store = createStore(GameReducer);
export const history = createBrowserHistory();


ReactDOM.render(
  <FastClick>
    <Provider store={store}>
      <Router history={history}>
        <MessageReceiver>
          <Route exact path="/" component={MainPage}/>
          <Route path="/entrance-fee" component={EntranceFeeSettingPage}/>
          <Route path="/game" component={GamePage}/>
          <Route path="/kicking" component={KickingPage}/>
          <Route path="/max-players" component={MaxPlayerSettingPage}/>
          <Route path="/description" component={DescriptionPage}/>
          <Route path="/result" component={ResultPage}/>
          <Route path="/api" component={APITestPage}/>
        </MessageReceiver>
      </Router>
    </Provider>
  </FastClick>
  , document.getElementById('root'));


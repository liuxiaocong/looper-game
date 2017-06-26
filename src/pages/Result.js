/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 26/6/17.
 */
import React from 'react';
import { Panel, Avatar, Well, Button, PanelHeaderButton } from '../components';
import './Result.css';


export default class Result extends React.Component {

  render() {
    const testAvatar = require('../assets/test_avatar.jpg');
    const winnerImage = require('../assets/winner.png');
    const exitButton = <PanelHeaderButton
      icon="fa-power-off"
      color="red"
      onClick={() => {
        console.log('123');
        this.props.history.push('/')
      }}
    />;

    return (
      <Panel
        name="result-page"
        hasHeader={true}
        headerRightButton={exitButton}>
        <img className="logo" src={winnerImage} alt=""/>
        <Well>
          <Avatar url={testAvatar}/>
          <h1>Creative Mints</h1>
          <p>You earned 40 in the game!</p>
        </Well>
        <Button text="Play Again"/>
      </Panel>
    )
  }
};
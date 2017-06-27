/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React from 'react';
import { Panel, Well, List, ListItem, ListItemDescription, Button, PanelHeaderButton } from '../components';
import { connect } from 'react-redux'
import { SettingKeys } from '../consts';
import './Main.css';


const mapStateToProps = state => ({
  settings: state.settings,
});

class Main extends React.Component {

  render() {
    const leftHeaderButton =
            <PanelHeaderButton
              icon="fa-question-circle"
              onClick={() => this.props.history.push('/description')}/>;


    return (
      <Panel
        headerLeftButton={leftHeaderButton}
        hasHeader={true}>

        <Well hasPadding={true}>
          <List>
            <ListItem title="Entrance Fee"
                      text={`${this.props.settings[SettingKeys.EntranceFee]} Coins`}
                      onClick={() => this.props.history.push('/entrance-fee')}/>
            <ListItemDescription text="You and final winner will be rewarded for certain coins"/>
            <ListItem title="Max Player"
                      text={this.props.settings[SettingKeys.MaxPlayer]}
                      onClick={() => this.props.history.push('/max-players')}/>

            <div className="button-container">
              <Button text="Invite Players"/>
            </div>
          </List>
        </Well>
      </Panel>
    )
  }
}

export default connect(
  mapStateToProps,
)(Main);
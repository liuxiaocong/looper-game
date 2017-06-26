/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 26/6/17.
 */
import React from 'react';
import { Panel, PanelHeaderButton, PanelHeaderTitle, Well } from '../components';


export default class Description extends React.Component {

  render() {
    const panelLeftButton =
            <PanelHeaderButton
              icon="fa-chevron-left"
              onClick={this.props.history.goBack}/>;

    const panelHeaderTitle =
            <PanelHeaderTitle
              title="description"/>;

    return (
      <Panel
        hasHeader={true}
        headerTitle={panelHeaderTitle}
        headerLeftButton={panelLeftButton}>
        <Well>
          <ol>
            <li>Host has the right to start game anytime without waiting all players joint.</li>
            <li>The winner of each round is able to kick out one player from the list. If winner do not do so, the winner will be kicked out from game.</li>
            <li>Broadcaster can set entrance fee. Host and final winner will be able to receive certain coins based on total coins in the game.</li>
            <li>If broadcaster ends game halfway, the entrance fee will be refunded to players who are still in the game.</li>
          </ol>
        </Well>
      </Panel>
    )
  }
}
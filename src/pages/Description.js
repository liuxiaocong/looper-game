/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 26/6/17.
 */
import React from 'react';
import { Panel, PanelHeaderButton } from '../components';


export default class Description extends React.Component {

  render() {
    const panelLeftButton =
            <PanelHeaderButton
              icon="fa-chevron-left"
              onClick={this.props.history.goBack}/>;

    return (
      <Panel
        hasHeader={true}
        headerLeftButton={panelLeftButton}>
      </Panel>
    )
  }
}
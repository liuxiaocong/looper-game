/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 26/6/17.
 */
import React from 'react';
import { Panel, PanelHeaderButton, Well, ListRadio, ListRadioItem } from '../components';


export default class MaxPlayerSetting extends React.Component {

  render() {
    const panelLeftButton =
            <PanelHeaderButton
              icon="fa-chevron-left"
              onClick={this.props.history.goBack}/>;

    return (
      <Panel
        hasHeader={true}
        headerLeftButton={panelLeftButton}>

        <Well>
          <ListRadio name="max-player">
            <ListRadioItem/>
            <ListRadioItem/>
            <ListRadioItem/>
          </ListRadio>
        </Well>

      </Panel>
    )
  }
}
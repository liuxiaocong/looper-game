/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 26/6/17.
 */
import React from 'react';
import { Panel, PanelHeaderButton, Well, ListRadio } from '../components';

export default class MaxPlayerSetting extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'max-player',
      value: 6,
    }
  }

  // Change to Redux later for global control
  onChange = (newValue) => {
    // return data format is liek  [name]: value
    this.setState({ value: newValue[this.state.name] })
  };

  render() {
    const panelLeftButton = <PanelHeaderButton icon="fa-chevron-left"
                                               onClick={this.props.history.goBack}/>;

    return (
      <Panel
        hasHeader={true}
        headerLeftButton={panelLeftButton}>
        <Well>
          <ListRadio
            name={this.state.name}
            options={[
              { text: 6, value: 6 },
              { text: 8, value: 8 },
              { text: 10, value: 10 },
            ]}
            value={this.state.value}
            onChange={this.onChange}/>
        </Well>
      </Panel>
    )
  }
}
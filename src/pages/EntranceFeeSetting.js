/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React from 'react';
import { Panel, PanelHeaderButton, Well, ListRadio } from '../components';

export default class EntranceFeeSetting extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'entrance-fee',
      value: 10,
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
              { text: 'Free', value: 0 },
              { text: '10 Coins', value: 10 },
              { text: '50 Coins', value: 50 },
              { text: '100 Coins', value: 100 },
              { text: '200 Coins', value: 200 },
            ]}
            value={this.state.value}
            onChange={this.onChange}/>
        </Well>
      </Panel>
    )
  }
}
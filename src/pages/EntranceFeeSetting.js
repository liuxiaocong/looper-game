/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React from 'react';
import { Panel, PanelHeaderButton, Well, ListRadio } from '../components';
import { setEntranceFee } from '../redux/actions'
import { connect } from 'react-redux'
import { SettingKeys } from '../consts';


const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  setEntranceFee: fee => {
    dispatch(setEntranceFee(fee))
  },
});

class EntranceFeeSetting extends React.Component {

  onChange = (newValue) => {
    // return data format is liek  [name]: value
    this.props.setEntranceFee(newValue[SettingKeys.EntranceFee]);
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
            name={SettingKeys.EntranceFee}
            options={[
              { text: 'Free', value: 0 },
              { text: '10 Coins', value: 10 },
              { text: '50 Coins', value: 50 },
              { text: '100 Coins', value: 100 },
              { text: '200 Coins', value: 200 },
            ]}
            value={this.props.settings[SettingKeys.EntranceFee]}
            onChange={this.onChange}/>
        </Well>
      </Panel>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EntranceFeeSetting);
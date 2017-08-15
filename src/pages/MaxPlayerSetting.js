/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 26/6/17.
 */
import React from 'react';
import { Panel, PanelHeaderButton, Well, ListRadio, PanelHeaderTitle } from '../components';
import { setMaxPlayer } from '../redux/actions'
import { connect } from 'react-redux'
import { SettingKeys } from '../consts';


const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  setMaxPlayer: maxPlayer => {
    dispatch(setMaxPlayer(maxPlayer))
  },
});

class MaxPlayerSetting extends React.Component {

  onChange = (newValue) => {
    // return data format is like  [name]: value
    this.props.setMaxPlayer(newValue[SettingKeys.MaxPlayer])
  };

  render() {
    const panelLeftButton = <PanelHeaderButton icon="fa-chevron-left"
                                               onClick={this.props.history.goBack}/>;
    const panelHeaderTitle = <PanelHeaderTitle title="maxplayers"/>;

    return (
      <Panel
        hasHeader={true}
        headerTitle={panelHeaderTitle}
        headerLeftButton={panelLeftButton}>
        <Well hasPadding={false}>
          <ListRadio
            name={SettingKeys.MaxPlayer}
            options={[
              { text: 6, value: 6 },
              { text: 8, value: 8 },
              { text: 10, value: 10 },
            ]}
            value={this.props.settings[SettingKeys.MaxPlayer]}
            onChange={this.onChange}/>
        </Well>
      </Panel>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MaxPlayerSetting);
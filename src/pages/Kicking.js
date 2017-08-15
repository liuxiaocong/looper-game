/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 3/7/17.
 */
import React from 'react';
import { Panel, Well, PanelHeaderButton, PanelHeaderTextTitle, UserKickList, EndGameModal } from '../components';
import { connect } from 'react-redux'
import './Kicking.css';

const mapStateToProps = state => ({
  gameStore: state.gameStore,
});

class Kicking extends React.Component {

  constructor() {
    super();
    this.state = {
      countDown: 30,
    };
    this.countDownTimer = setInterval(() => {
      if (this.state.countDown - 1 === 0) {
        clearInterval(this.countDownTimer);
        this._onCountDownEnd();
      }
      this.setState({ countDown: this.state.countDown - 1 })
    }, 1000)
  }

  _onCountDownEnd() {
    console.log('countDownEnd')
  }

  _onKick(item) {
    console.log(item);
    clearInterval(this.countDownTimer);
    this._redirect();
  }

  _redirect() {

  }

  componentWillUnmount() {
    clearInterval(this.countDownTimer);
  }

  render() {
    const players = this.props.gameStore.GameData.Players;

    const closeButton = <PanelHeaderButton
      onClick={() => this.props.history.goBack}
      color="red"
      icon="fa-close"/>;

    return (
      <Panel
        name="kicking"
        hasHeader={true}
        headerTitle={
          <PanelHeaderTextTitle>
            <p>You are the winner this round!</p>
            <p>You can kick out one player in <span className="count-down">{this.state.countDown}</span> seconds</p>
          </PanelHeaderTextTitle>
        }
        headerRightButton={closeButton}>
        <Well hasPadding={false}>
          <UserKickList items={players} onKick={item => this._onKick(item)}/>
        </Well>
      </Panel>
    )
  }
}

export default connect(
  mapStateToProps,
)(Kicking);
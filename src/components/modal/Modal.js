/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import { Util } from '../../util';
import Well from '../Well';
import Button from '../Button';

export default class Modal extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool,
    content: PropTypes.object,
  };

  static defaultProps = {
    show: true,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const cornerSize = Util.getPxFromDp(50);
    const modalWidth = Util.getDimensions(120);
    const modalHeight = Util.getDimensions(180);
    const titleImg = require(`../../assets/title_${this.props.title}.png`);

    const modalShowStyle = this.props.show
      ? ''
      : 'hide';

    return (
      <div className={`modal ${modalShowStyle}`}>
        <div className="back-drop">

          <div className="modal-bg" style={{ height: modalHeight, width: modalWidth }}>
            <div className="top-wrap">
              <div className="top-left" style={{ width: cornerSize, height: cornerSize }}/>
              <div className="top-middle" style={{ height: cornerSize }}/>
              <div className="top-right" style={{ width: cornerSize, height: cornerSize }}/>
            </div>

            <div className="middle-wrap">
              <div className="middle-left" style={{ width: cornerSize }}/>
              <div className="middle-middle"/>
              <div className="middle-right" style={{ width: cornerSize }}/>
            </div>

            <div className="bottom-wrap">
              <div className="bottom-left" style={{ width: cornerSize, height: cornerSize }}/>
              <div className="bottom-middle" style={{ height: cornerSize }}/>
              <div className="bottom-right" style={{ width: cornerSize, height: cornerSize }}/>
            </div>
          </div>

          <div className="modal-content" style={{ height: modalHeight, width: modalWidth }}>
            <div><img className="title" src={titleImg} alt=""/></div>
            <Well>{ this.props.content }</Well>

            <div className="buttons">
              <Button text="Stay" width="42%" size="sm"/>
              <Button text="End" width="42%" color="red" size="sm"/>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
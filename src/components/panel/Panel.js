/**
 * Created by xiaoconglau on 21/06/2017.
 */
import React, { Component } from 'react';
import { Util } from '../../util'
import PanelHeaderButton from './PanelHeaderButton';
import PanelHeaderTitle from './PanelHeaderTitle';
import './Panel.css'

export default class Panel extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const cornerSize = Util.getPxFromDp(50);
    const size = {
      width: Util.getDimensions(30),
      height: Util.getDimensions(30),
    };

    return (
      <div className="panel">
        <div className="panel-bg" style={{ height: size.height, width: size.width }}>
          <div className="top-wrap">
            <div className="top-left" style={{ width: cornerSize, height: cornerSize }}/>
            <div className="top-middle" style={{ height: cornerSize }}/>
            <div className="top-right" style={{ width: cornerSize, height: cornerSize }}/>
          </div>

          <div className="middle-wrap">
            <div className="middle-left" style={{ width: cornerSize }}/>
            <div className="middle-middle">{ this.props.children }</div>
            <div className="middle-right" style={{ width: cornerSize }}/>
          </div>

          <div className="bottom-wrap">
            <div className="bottom-left" style={{ width: cornerSize, height: cornerSize }}/>
            <div className="bottom-middle" style={{ height: cornerSize }}/>
            <div className="bottom-right" style={{ width: cornerSize, height: cornerSize }}/>
          </div>
        </div>

        <div className="panel-buttons">
          <PanelHeaderButton color={'blue'} icon={'fa-question-circle'}/>
          <PanelHeaderTitle title={'entrancefee'}/>
          <PanelHeaderButton color={'red'} icon={'fa-remove'}/>
        </div>
      </div>
    )
  }
}

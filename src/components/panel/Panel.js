/**
 * Created by xiaoconglau on 21/06/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Panel.css'
import { Util } from '../../util'

export default class Panel extends Component {

  static propTypes = {
    name: PropTypes.string,
    hasHeader: PropTypes.bool,
    headerLeftButton: PropTypes.object,
    headerRightButton: PropTypes.object,
    headerTitle: PropTypes.object,
  };

  static defaultProps = {
    hasHeader: false,
    name: '',
  };

  render() {
    const cornerSize = Util.getPxFromDp(50);
    const panelSize = Util.getDimensions(30);
    const headerHeight = Util.getPxFromDp(50);

    const panelHeader = this.props.hasHeader && (
        <div className="panel-header" style={{ height: headerHeight }}>
          {this.props.headerLeftButton || <span className="place-holder"/>}
          {this.props.headerTitle || <span/>}
          {this.props.headerRightButton || <span className="place-holder"/>}
        </div>
      );

    return (
      <div className={`panel ${this.props.name}`} style={{ height: panelSize, width: panelSize }}>

        {/* this Bg thing only for background*/}
        <div className="panel-bg">
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

        <div className="panel-content" style={{ padding: Util.getPxFromDp(12) }}>
          {panelHeader}
          { this.props.children }
        </div>
      </div>
    )
  }
}

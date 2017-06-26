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
  };

  render() {
    const cornerSize = Util.getPxFromDp(50);
    const panelSize = Util.getDimensions(30);

    const panelHeader = this.props.hasHeader && (
        <div className="panel-header" style={{ height: cornerSize }}>
          {this.props.headerLeftButton || <span/>}
          {this.props.headerTitle || <span/>}
          {this.props.headerRightButton || <span/>}
        </div>
      );

    const contentMargin = this.props.hasHeader
      ? { paddingTop: cornerSize }
      : {};

    return (
      <div className={`panel ${this.props.name}`}>
        {/* this Bg thing only for background*/}
        <div className="panel-bg" style={{ height: panelSize, width: panelSize }}>
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

        {panelHeader}

        <div className="panel-content" style={{ padding: Util.getPxFromDp(15), ...contentMargin }}>
          { this.props.children }
        </div>
      </div>
    )
  }
}

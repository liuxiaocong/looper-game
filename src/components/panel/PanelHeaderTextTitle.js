/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 3/7/17.
 */
import React from 'react';
import './PanelHeaderTextTitle.css';

export default class PanelHeaderTextTitle extends React.Component {

  render() {
    return (
      <div className="panel-header-text-title">{this.props.children}</div>
    )
  }
}

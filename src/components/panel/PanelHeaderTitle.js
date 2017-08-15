/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 25/6/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './PanelHeaderTitle.css';

export default class PanelHeaderTitle extends React.Component {

  static propTypes = {
    title: PropTypes.oneOf(['default', 'description', 'end', 'entrancefee', 'maxplayers']),
  };

  static defaultProps = {
    title: 'default',
  };

  render() {
    const image = require(`../../assets/title_${this.props.title}.png`);

    return (
      <div className="panel-header-title">
        <img src={image} alt=""/>
      </div>
    )
  }
}


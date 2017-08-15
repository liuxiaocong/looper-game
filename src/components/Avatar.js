/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 26/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.css';


class Avatar extends React.Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    size: PropTypes.number, // because it is a square, so just need one side.
    hasBorder: PropTypes.bool,
  };

  static defaultProps = {
    size: 240,
    hasBorder: true,
  };

  render() {
    const { url, size } = this.props;

    const borderStyle = this.props.hasBorder
      ? 'with-border'
      : '';

    return (
      <div className={`avatar ${borderStyle}`} style={{ width: size, height: size }}>
        <img src={url} alt=""/>
      </div>
    )
  }
}

export default Avatar;
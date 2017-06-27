/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 26/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.css';


const Avatar = ({ url }) => {
  return (
    <div className="avatar">
      <img src={url} alt=""/>
    </div>
  )
};

Avatar.propTypes = {
  url: PropTypes.string,
};

export default Avatar;
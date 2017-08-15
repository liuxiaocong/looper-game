/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 3/7/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import './UserKickList.css';

export default class UserKickList extends React.Component {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onKick: PropTypes.func,
  };

  render() {

    const listItems = this.props.items.map((item, index) =>
      <li key={index}>
        <a className="close-button" onClick={() => this.props.onKick(item)}>
          <i className="fa fa-close"/>
        </a>

        <Avatar url={item.avatar} size={120} hasBorder={false}/>
        <span className="name">{item.name}</span>
      </li>,
    );

    return (
      <ul className="user-kick-list">{listItems}</ul>
    )
  }

}
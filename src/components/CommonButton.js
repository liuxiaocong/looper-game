/**
 * Created by xiaoconglau on 21/06/2017.
 */
import React, { Component } from 'react';

export default class CommentButton extends Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <p>Button</p>
    )
  }

  componentDidMount() {

  }

  //End Mounting

  //Updating
  componentWillReceiveProps(nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState) {

    return true;
  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  //End Updating

  //Un Mounting
  componentWillUnmount() {

  }
}

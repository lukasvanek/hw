import * as actions from './actions';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default function start(WrappedComponent) {
  class Start extends Component {

    static propTypes = {
      start: PropTypes.func.isRequired,
    };

    componentDidMount() {
      const { start } = this.props;
      // Client side changes must be dispatched on componentDidMount, aka
      // after the first app render, to match client and server HTML. Otherwise,
      // React attempt to reuse markup will fail.
      start();
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }

  }

  Start = connect(null, actions)(Start);

  return Start;
}

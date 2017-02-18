import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';

let serverFetching = false;
let serverFetchingPromises = null;
let actionDone = false;

export default function serverFetch(Wrapped, actions, callback, paramName) {
  class ServerFetched extends Component {
    static propTypes = {
      params: PropTypes.object,
    };

    constructor(props) {
      super(props);
      this.state = { actionDone: false };
      this.setActionStart = this.setActionStart.bind(this);
      this.setActionDone = this.setActionDone.bind(this);
    }

    componentWillMount() {
      if (actionDone) this.setState({ actionDone: true });
      if (!serverFetching) return;
      callback(this.props, this.pushPromise, this.setActionStart, () => {
        actionDone = true;
      });
    }

    componentDidMount() {
      callback(this.props, this.pushPromise, this.setActionStart, this.setActionDone);
    }

    componentWillReceiveProps(nextProps) {
      const { params } = this.props;
      if (paramName && params[paramName] !== nextProps.params[paramName]) {
        callback(nextProps, this.pushPromise, this.setActionStart, this.setActionDone);
      }
    }

    setActionStart() {
      actionDone = false;
      this.setState({ actionDone: false });
    }

    setActionDone() {
      this.setState({ actionDone: true });
    }

    pushPromise(promise) {
      if (!serverFetching) return;
      serverFetchingPromises.push(promise);
    }

    render() {
      return (
        <Wrapped {...this.props} fetchDone={this.state.actionDone} />
      );
    }
  }
  const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
  return connect(null, mapDispatchToProps)(ServerFetched);
}

export const resolvingServerFetch = renderAppCallback => {
  serverFetching = true;
  serverFetchingPromises = [];
  try {
    renderAppCallback();
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  } finally {
    serverFetching = false;
    // Wait until all promises in an array are either rejected or fulfilled.
    // http://bluebirdjs.com/docs/api/reflect.html
    const promises = serverFetchingPromises.map(promise => promise.reflect());
    serverFetchingPromises = null;
    return Promise.all(promises); // eslint-disable-line no-unsafe-finally
  }
};

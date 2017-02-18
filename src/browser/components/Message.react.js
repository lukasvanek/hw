import './Message.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

class Message extends Component {

  static propTypes = {
    messages: PropTypes.object,
    type: PropTypes.string,
  };

  render() {
    const { messages, type, textStyle = {} } = this.props;
    const message = messages.get(type);

    return (
      <div>
        {message ?
          <div className={cx('message', { autohide: message.autohide })} style={textStyle}>
            {message.text}
          </div>
          :
          <div />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages.map,
  };
}

import { showMessage, hideMessage } from '../../common/messages/actions';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  showMessage,
  hideMessage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Message);

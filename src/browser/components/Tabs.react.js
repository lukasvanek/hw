import './Tabs.scss';
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

export default class Tabs extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.selectTab = this.selectTab.bind(this);
    this.state = {
      selectedTab: 0,
      starting: false
    };
  }

  componentWillMount() {
    this.setState({ starting: true });
    setTimeout(() => this.setState({ starting: false }), 10);
  }

  selectTab(n) {
    this.setState({ selectedTab: n, starting: true });
    setTimeout(() => this.setState({ starting: false }), 10);
  }

  render() {
    const { items } = this.props;

    const tabWidth = 100 / items.length;

    const buttonStyle = {
      width: `${tabWidth}%`
    };

    const inkStyle = {
      width: `${tabWidth}%`,
      left: `${tabWidth * this.state.selectedTab}%`
    };

    return (
      <div>
        <div className="tabs">
          {items.map((item, n) =>
            <button
              key={n}
              className={cx('tabs-tab', { active: n === this.state.selectedTab })}
              onClick={() => this.selectTab(n)}
              style={buttonStyle}
            >
              {item.label}
            </button>
          )}
          <div className="tabs-inkline">
            <div className="tabs-ink" style={inkStyle} />
          </div>
        </div>
        <div className={cx('children', { starting: this.state.starting })}>
          {items.map((item, n) =>
            <div
              className={cx('tabs-content', { active: n === this.state.selectedTab })}
              key={n}
            >
              {item.content}
            </div>
          )}
        </div>

      </div>
    );
  }
}

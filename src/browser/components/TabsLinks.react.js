import './Tabs.scss';
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
import _ from 'lodash';


export default class Tabs extends Component {

  static propTypes = {
    links: PropTypes.array.isRequired,
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.selectTab = this.selectTab.bind(this);
    this.state = {
      selectedTab: 0,
    };
  }

  componentDidMount() {
    const { links, location } = this.props;
    const n = _.findIndex(links, (link) => link.to === location.pathname.replace(/\/$/, ''));
    this.selectTab(n);
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    if (location.pathname.replace(/\/$/, '') !== nextProps.location.pathname.replace(/\/$/, '')) {
      const n = _.findIndex(nextProps.links, (link) =>
        link.to === nextProps.location.pathname.replace(/\/$/, '')
      );
      this.selectTab(n);
    }
  }

  selectTab(n) {
    this.setState({ selectedTab: n });
  }

  render() {
    const { links, location } = this.props;

    const tabWidth = 100 / links.length;

    const buttonStyle = {
      width: `${tabWidth}%`,
    };

    const inkStyle = {
      width: `${tabWidth}%`,
      left: `${tabWidth * this.state.selectedTab}%`,
    };


    const l = location.pathname.replace(/\/$/, '');

    return (
      <div>
        <div className="tabs">
          {links.map((link, n) =>
            <Link
              key={n}
              className={cx('tabs-tab', { active: l === link.to })}
              to={link.to}
              style={buttonStyle}
            >
              {link.label}
            </Link>
          )}
          <div className="tabs-inkline">
            <div className="tabs-ink" style={inkStyle} />
          </div>
        </div>
      </div>
    );
  }
}

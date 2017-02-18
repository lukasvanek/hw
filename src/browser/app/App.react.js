import './Main.scss';
import Helmet from 'react-helmet';
import React, { Component, PropTypes } from 'react';
import start from '../../common/app/start';
import cx from 'classnames';

import favicon from '../../common/app/favicon';

// v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
const bootstrap4Metas = [
  { charset: 'utf-8' },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
  },
  {
    'http-equiv': 'x-ua-compatible',
    content: 'ie=edge',
  },
];

class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  render() {
    const { children, location } = this.props;

    return (
      <div
        className={cx('app', {
          home: location.pathname === '/',
        })}
      >
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title="Homework"
          titleTemplate="%s"
        />
        {/* Pass location to ensure header active links are updated. */}


        <div className="web-container">
          {children}
        </div>

      </div>
    );
  }

}

App = start(App);


export default App;

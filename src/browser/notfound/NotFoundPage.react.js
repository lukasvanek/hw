import Helmet from 'react-helmet';
import React, { Component } from 'react';
import { Link } from 'react-router';

class Page extends Component {

  render() {
    const title = "Error";

    return (
      <div className="notfound-page">
        <Helmet title={title} />
        <h1>
          Error
        </h1>
        <p>
          Something went wrong
        </p>
        <Link to="/">
          Click here to continue
        </Link>
      </div>
    );
  }

}

export default Page;

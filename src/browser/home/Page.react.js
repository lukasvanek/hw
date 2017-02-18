import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Page extends Component {
  render() {
    return (
  		<div className="container">
  		  <a href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg01.jpg">
  		    <figure>
  		      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg01.jpg" alt="" />
  		      <figcaption>
  		        Lorem ipsum dolor sit amet
  		      </figcaption>
  		    </figure>
  		  </a>
  		</div>
    );
  }

}


export default Page;

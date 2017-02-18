import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import serverFetch from '../../common/_tools/serverFetch';
import { getImages, toggleFav, rmImage } from '../../common/images/actions';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  render() {
    const { toggleFav, rmImage } = this.props;
    let images = this.props.images;
    if (this.state.value && this.state.value.length > 0) {
      images = images.filter((image) => {
        const input = this.state.value.toLowerCase();
        const title = image.title.toLowerCase();
        if (title.indexOf(input) > -1) return true;
        return false;
      });
    }
    return (
      <div className="container">
        <div className="search-box">
          <input type="text" placeholder="Search" value={this.state.value} onChange={this.handleChange} autoFocus />
        </div>
        <div className="grid">
          {images.valueSeq().map((image) =>
            <a key={image._id}>
              <figure>
                <img src={image.url} alt="" />
                <figcaption>
                  <div className="title">{image.title}</div>
                  <div className="controls">
                    <button className="fav" onClick={() => toggleFav(image)}>
                      <i
                        className={cx('', {
                      'ion-android-favorite-outline': !image.fav,
                      'ion-android-favorite': image.fav,
                    })}
                      />
                    </button>
                    <button className="remove" onClick={() => rmImage(image)}>
                      <i className="ion-ios-trash-outline" />
                    </button>
                  </div>
                </figcaption>
              </figure>
            </a>
          )}
        </div>
      </div>
    );
  }
}

// ne ideální, ale funkční server-side rendering
Page = serverFetch(Page, { getImages },
({ getImages }, pushPromise, start, done) => {
  start();
  const promise = new Promise(getImages);
  pushPromise(promise);
});

function mapStateToProps(state) {
  return {
    images: state.images.map,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleFav,
  rmImage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Page);

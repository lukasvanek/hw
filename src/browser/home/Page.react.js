import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import serverFetch from '../../common/_tools/serverFetch';
import { getImages, toggleFav, rmImage } from '../../common/images/actions';

class Page extends Component {
  render() {
    const { images, toggleFav, rmImage } = this.props;
    return (
  		<div className="container">
        {images.valueSeq().map((image) =>
          <a key={image._id}>
            <figure>
              <img src={image.url} alt="" />
              <figcaption>
                {image.title}
                <button onClick={() => toggleFav(image)}>
                  <i className={cx('', {
                    'ion-android-favorite-outline': !image.fav,
                    'ion-android-favorite': image.fav,
                  })} />
                </button>
                <button onClick={() => rmImage(image)}>
                  <i className="ion-ios-trash-outline" />
                </button>
                
                ion-android-favorite
              </figcaption>
            </figure>
          </a>
        )}
  		</div>
    );
  }

}




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

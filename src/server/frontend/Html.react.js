import React, { Component, PropTypes } from 'react';

export default class Html extends Component {

  static propTypes = {
    appCssFilename: PropTypes.string,
    bodyHtml: PropTypes.string.isRequired,
    googleAnalyticsId: PropTypes.string.isRequired,
    helmet: PropTypes.object.isRequired,
    isProduction: PropTypes.bool.isRequired,
  };

  render() {
    const { appCssFilename, bodyHtml, googleAnalyticsId, helmet, isProduction, hotjarId } = this.props;
    const linkStyles = appCssFilename &&
      <link
        href={appCssFilename}
        rel="stylesheet"
      />;



    return (
      <html {...helmet.htmlAttributes.toComponent()}>
        <head>
          <meta
            name="google-site-verification"
            content="CYLVufnI_4NqZZUcSIptcvwhx2ZbAF5BVe0tixZ60ac"
          />
          {helmet.title.toComponent()}
          {helmet.base.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {helmet.script.toComponent()}
          {linkStyles}
          <link
            href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800&amp;subset=latin-ext" rel="stylesheet" />
        </head>
        <body dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </html>
    );
  }

}

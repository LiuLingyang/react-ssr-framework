import React from 'react';
import { Helmet } from 'react-helmet';

class Bar extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Bar</title>
        </Helmet>
        <div>Bar2</div>
      </div>
    );
  }
}

export default Bar;

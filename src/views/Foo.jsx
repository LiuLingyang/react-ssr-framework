import React from 'react';
import { Helmet } from 'react-helmet';

class Foo extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Foo</title>
        </Helmet>
        <div>Foo2</div>
      </div>
    );
  }
}

export default Foo;

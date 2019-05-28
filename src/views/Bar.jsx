import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Switch } from 'react-router-dom';
import { NestedRoute } from '../router';

class Bar extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Bar</title>
        </Helmet>
        <div>Bar</div>
        <div className="view">
          <Switch>
            {
              this.props.router.map((route, i) =>
                <NestedRoute key={i} {...route}/>
              )
            }
          </Switch>
        </div>
      </div>
    );
  }
}

Bar.propTypes = {
  router: PropTypes.array
};

export default Bar;

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch } from 'react-router-dom';
import { NestedRoute } from '../router';

interface BarProps {
  router: any[];
}
interface BarState {}

class Bar extends React.Component<BarProps, BarState> {
  render() {
    return (
      <div>
        <Helmet>
          <title>Bar</title>
        </Helmet>
        <div>Bar</div>
        <div className="view">
          <Switch>
            {this.props.router.map((route, i) => (
              <NestedRoute key={i} {...route} />
            ))}
          </Switch>
        </div>
      </div>
    );
  }
}

export default Bar;

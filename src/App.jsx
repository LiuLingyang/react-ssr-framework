import React from 'react';
import {
  Switch,
  Redirect,
  NavLink
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { router, NestedRoute, StatusRoute } from './router';
import './assets/app.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>This is App page</title>
          <meta name="keywords" content="React SSR"></meta>
        </Helmet>
        <div className="title">This is a react ssr demo</div>
        <ul className="nav">
          <li><NavLink to="/bar">Bar</NavLink></li>
          <li><NavLink to="/baz">Baz</NavLink></li>
          <li><NavLink to="/foo">Foo</NavLink></li>
          <li><NavLink to="/top-list">TopList</NavLink></li>
        </ul>
        <div className="view">
          <Switch>
            {
              router.map((route, i) =>
                <NestedRoute key={i} {...route}/>
              )
            }
            <Redirect from="/" to="/bar" exact/>
            <StatusRoute code={404}>
              <div>
                <h1>Not Found</h1>
              </div>
            </StatusRoute>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

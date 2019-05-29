import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { router, NestedRoute, StatusRoute } from './router';
import { setClientLoad } from '@store/actions/actions';
import './assets/style/style.scss';
import './App.scss';

@connect(
  () => ({}),
  { setClientLoad }
)
class App extends React.Component {
  componentDidMount() {
    // 客户端 setClientLoad 设置为 true
    this.props.setClientLoad(true);
  }
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
          <li><NavLink to="/bar/child">Bar-child</NavLink></li>
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

App.propTypes = {
  setClientLoad: PropTypes.func
};

export default App;

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTopList } from '../store/actions/actions';
import ListItem from '../components/ListItem';
import './TopList.scss';

@connect(
  state => ({
    clientShouldLoad: state.clientShouldLoad,
    topList: state.topList
  }),
  { fetchTopList }
)
class TopList extends React.Component {
  componentDidMount() {
    // 判断是否需要加载数据
    if (this.props.clientShouldLoad === true) {
      this.props.fetchTopList();
    }
  }
  render() {
    const { match, topList } = this.props;
    return (
      <div>
        <Helmet>
          <title>Top List</title>
        </Helmet>
        <ul className="list-wrapper">
          {
            topList.map(item => {
              return <li className="list-item" key={item.id}>
                <NavLink to={`${match.url}/${item.id}`}><ListItem {...item} /></NavLink>
              </li>;
            })
          }
        </ul>
      </div>
    );
  }
}

TopList.propTypes = {
  match: PropTypes.object,
  clientShouldLoad: PropTypes.bool,
  topList: PropTypes.array,
  fetchTopList: PropTypes.func
};

export default TopList;

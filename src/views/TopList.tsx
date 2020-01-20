import React from 'react';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTopList } from '../store/actions/actions';
import { TopDetail } from '@store/constants/actionTypes';
import ListItem from '../components/ListItem';
import './TopList.scss';

interface TopListMappedState {
  clientShouldLoad: boolean;
  topList: TopDetail[];
}
interface TopListMappedMethod {
  fetchTopList: ({ cookies: any }) => void;
}
interface TopListOwnProps {
  match: any;
}

export type TopListProps = TopListMappedState & TopListMappedMethod & TopListOwnProps;

interface TopListState {}

class TopList extends React.Component<TopListProps, TopListState> {
  componentDidMount() {
    // 判断是否需要加载数据
    if (this.props.clientShouldLoad === true) {
      this.props.fetchTopList({ cookies: undefined });
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
          {topList.map(item => {
            return (
              <li className="list-item" key={item.id}>
                <NavLink to={`${match.url}/${item.id}`}>
                  <ListItem name={item.name} picUrl={item.picUrl} />
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect<TopListMappedState, TopListMappedMethod, TopListOwnProps>(
  (state: any) => ({
    clientShouldLoad: state.clientShouldLoad,
    topList: state.topList
  }),
  (dispatch: any) => ({
    fetchTopList: bindActionCreators(fetchTopList, dispatch)
  })
)(TopList);

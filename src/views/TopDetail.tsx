import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TopDetail } from '@store/constants/actionTypes';
import { fetchTopDetail } from '@store/actions/actions';

interface TopDetailMappedState {
  clientShouldLoad: boolean;
  topDetail: TopDetail;
}
interface TopDetailMappedMethod {
  fetchTopDetail: ({ id: number }) => void;
}
interface TopDetailOwnProps {
  match: any;
}

export type TopDetailProps = TopDetailMappedState & TopDetailMappedMethod & TopDetailOwnProps;

interface TopDetailState {}

class TopDetailPage extends React.Component<TopDetailProps, TopDetailState> {
  componentDidMount() {
    const id = this.props.match.params.id;
    if (this.props.clientShouldLoad === true) {
      this.props.fetchTopDetail({ id });
    }
  }
  render() {
    const { topDetail } = this.props;
    return (
      <div>
        <Helmet>
          <title>{topDetail.name}</title>
        </Helmet>
        <div>
          <img src={topDetail.pic} width="120" height="120" style={{ float: 'left', marginRight: '20px' }} />
          <span dangerouslySetInnerHTML={{ __html: topDetail.info }}></span>
        </div>
      </div>
    );
  }
}

export default connect<TopDetailMappedState, TopDetailMappedMethod, TopDetailOwnProps>(
  (state: any) => ({
    clientShouldLoad: state.clientShouldLoad,
    topDetail: state.topDetail
  }),
  (dispatch: any) => ({
    fetchTopDetail: bindActionCreators(fetchTopDetail, dispatch)
  })
)(TopDetailPage);

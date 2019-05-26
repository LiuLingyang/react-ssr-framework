import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { setClientLoad, fetchTopDetail } from '../store/actions/actions';

class TopDetail extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    if (this.props.clientShouldLoad === true) {
      this.props.dispatch(fetchTopDetail(id));
    } else {
      this.props.dispatch(setClientLoad(true));
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
          <img src={topDetail.pic} width="120" height="120" style={{ float: 'left', 'marginRight': '20px' }}/>
          <span dangerouslySetInnerHTML={{ __html: topDetail.info }}></span>
        </div>
      </div>
    );
  }
}

TopDetail.propTypes = {
  match: PropTypes.object,
  clientShouldLoad: PropTypes.bool,
  dispatch: PropTypes.func,
  topDetail: PropTypes.object
};

export default TopDetail;

import React from 'react';
import PropTypes from 'prop-types';

class ListItem extends React.Component {
  render() {
    const { topTitle, picUrl } = this.props;
    return (
      <div>
        <div>{topTitle}</div>
        <div>
          <img src={picUrl} width="120" height="120" />
        </div>
      </div>
    );
  }
}

ListItem.propTypes = {
  topTitle: PropTypes.string,
  picUrl: PropTypes.string
};

export default ListItem;

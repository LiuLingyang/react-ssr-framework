import React from 'react';

interface ListItemProps {
  name: string;
  picUrl: string;
}
interface ListItemState {}

class ListItem extends React.Component<ListItemProps, ListItemState> {
  render() {
    const { name, picUrl } = this.props;
    return (
      <div>
        <div>{name}</div>
        <div>
          <img src={picUrl} width="120" height="120" />
        </div>
      </div>
    );
  }
}

export default ListItem;

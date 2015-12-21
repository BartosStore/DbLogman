import React from 'react';
import BaseComponent from './baseComponent';

class TableContent extends BaseComponent {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    var index = 0;
    var nodes = this.props.data.map(function mapDataToComponent(obj) {
      index = index + 1;

      return (
        <tr>
          <td>{index}</td>
          <td>{obj.aid}</td>
          <td>{obj.usr}</td>
          <td>{obj.dat}</td>
          <td>{obj.moc}</td>
          <td>{obj.acc}</td>
        </tr>
      );
    });

    return (
      <tbody>
        {nodes}
      </tbody>
    );
  }
}

TableContent.propTypes = {
  data: React.PropTypes.array
};

TableContent.defaultProps = {
};

export default TableContent;

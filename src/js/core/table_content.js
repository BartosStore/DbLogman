import React from 'react';
import BaseComponent from './baseComponent';

class TableContent extends BaseComponent {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {

    console.log('==============================================');
    console.log('TableContent ' + this.props.data);
    if (this.props.data === '{}') {console.log('<<<<<<<<<<')} {console.log('>>>>>>>>>>')};

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
      <div>
        <hr />
        <table>
          <thead>
          <tr>
            <th>index</th>
            <th>action ID</th>
            <th>user</th>
            <th>date & time</th>
            <th>module caption</th>
            <th>action caption</th>
          </tr>
          </thead>

          <tbody>
            {nodes}
          </tbody>
        </table>
        <hr />
      </div>
    );
  }
}

TableContent.propTypes = {
  data: React.PropTypes.array
};

TableContent.defaultProps = {
};

export default TableContent;

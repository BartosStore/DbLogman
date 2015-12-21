import React from 'react';
import gener from './gener';
import BaseComponent from './baseComponent';

import TableContent from './table_content';

var tableStyle = {
  border: '1px solid black'
};

var config = {
  ttFiltr: [
    {
      cExample: ''
    }
  ]
};

class Connector extends BaseComponent {
  constructor() {
    super();
    this.state = {
      text: 'DB data...',
      isActive: false,
      logData: []
    };
  }

  componentDidMount() {
    var
      url = 'http://kryton/cgi-bin/wspd_cgi.sh/swusrlog',
      jsonData = '',
      ttFiltr = config.ttFiltr;

    ttFiltr[0].cUserFltr = 'miba';

    gener.addParams([
      {name: 'ttFiltr', data: ttFiltr}
    ]);

    gener.setLogin('vaso', '2222', 'apso');

    gener.sendRequest(
      url,
      (data) => {
        jsonData = gener.getParam(data, 'ttUser');

        this.setState({logData: jsonData});
      }
    );
  }

  handleClick() {
    this.setState({text: 'You clicked on Connector component. Dont do this again!'});
  }

  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>
        <hr />
        <h2>{this.props.label}</h2>
        {this.state.text}
        {this.props.selectedUser}

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
          <TableContent data={this.state.logData} />
        </table>

        <hr />
      </div>
    );
  }
}

export default Connector;

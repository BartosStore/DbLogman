import React from 'react';
import gener from './gener';
import BaseComponent from './baseComponent';

import Record from './record';

var tableStyle = {
  border: '1px solid black'
};

class Connector extends BaseComponent {
  constructor() {
      super();
      this.state = {
        text: 'DB data...',
        isActive: false,
        logInfo: []
      };
  }

  componentDidMount() {
      var url = 'http://kryton/cgi-bin/wspd_cgi.sh/swusrlog';
      var jsonData = '';

      gener.setLogin('vaso', '2222', 'apso');

      gener.sendRequest(
        url,
        (data) => {
            jsonData = gener.getParam(data, 'ttUser');

            this.setState({logInfo: jsonData});
        }
      );
  }

  handleClick() {
    this.setState({text: 'You clicked on Connector component. Dont do this again!'});
  }

  render() {
    var index = 0;
    var nodes = this.state.logInfo.map(function mapInfoToComponent(obj) {
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
      <div onClick={this.handleClick.bind(this)}>
        <hr />
        <h2>{this.props.label}</h2>
        {this.state.text}
        <br />
        <table style={tableStyle}>
          {nodes}
        </table>
        <hr />
      </div>
    );
  }
}

export default Connector;

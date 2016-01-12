import React from 'react';
import BaseComponent from './baseComponent';
import Combobox from 'react-select';
import UserButton from 'react-button';
import gener from './gener';
import TableContent from './table_content';

var filterStyle = {
  border: '1px solid red',
  width: '100px'
};

var config = {
  ttFiltr: [
    {
      cExample: ''
    }
  ]
};

class Selector extends BaseComponent {
  constructor() {
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      text: 'Selector text...',
      availableUsers: [],
      userFilter: '',
      logData: []
    };
  }

  componentDidMount() {
    var
      url = 'http://kryton/cgi-bin/wspd_cgi.sh/swusfltr',
      jsonData = '';

    gener.setLogin('vaso', '2222', 'apso');

    gener.sendRequest(
      url,
      (data) => {
        jsonData = gener.getParam(data, 'ttFltr');

        this.setState({availableUsers: jsonData});
      }
    );
  }

  handleComponentClick() {
    this.setState({text: 'I saw you! You clicked on Selector component!'});
  }

  handleButtonClick() {
    console.log('miba:handleButtonClick> ' + sessionStorage.selectedUser);

    this.getLogData();
    /*this.setState({userFilter: sessionStorage.selectedUser});*/
  }

  logChange(object) {
    console.log('Selected: ' + object.value);
    sessionStorage.selectedUser = object.value;
  }

  getLogData() {
    var
      url = 'http://kryton/cgi-bin/wspd_cgi.sh/swusrlog',
      jsonData = '',
      ttFiltr = config.ttFiltr;

    ttFiltr[0].cUserFltr = sessionStorage.selectedUser;

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

  render() {
    return (
      <div onClick={this.handleComponentClick.bind(this)}>
        <hr />

        <h2>{this.props.label}</h2>
        {this.state.text}
        <br />
        <br />

        <label htmlFor="userInput"><h3>{this.props.comboLabel}</h3></label>
        <Combobox
          addLabelText="TEST"
          autofocus
          clearable={false}
          name="selected-user"
          options={this.state.availableUsers}
          onChange={this.logChange}
          placeholder="Select user:" />

        <UserButton onClick={this.handleButtonClick}>Send</UserButton>
        <br />
        {this.state.userFilter}

        <div style={filterStyle}>
          state.userFilter: <b>{this.state.userFilter}</b>
        </div>

        <TableContent data={this.state.logData} />
      </div>
    );
  }
}

export default Selector;

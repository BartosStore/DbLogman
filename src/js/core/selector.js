import React from 'react';
import BaseComponent from './baseComponent';
import Combobox from 'react-select';
import UserButton from 'react-button';
import Connector from './connector';
import gener from './gener';

function logChange(object) {
  console.log('Selected: ' + object);
  sessionStorage.selectedUser = object.value;
}

class Selector extends BaseComponent {
  constructor() {
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      text: 'Selector text...',
      availableUsers: [],
      userFilter: ''
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
    this.setState({userFilter: sessionStorage.selectedUser});
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
          ref="combobox"
          autofocus
          clearable={true}
          name="selected-user"
          options={this.state.availableUsers}
          onChange={logChange}
          placeholder="Select user:" />

        <UserButton onClick={this.handleButtonClick}>Send</UserButton>
        <br />
        {this.state.userFilter}

        <Connector label="Welcome to Connector space" selectedUser={this.state.userFilter} />
      </div>
    );
  }
}

export default Selector;

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

var comboboxStyle = {
  margin: 'auto',
  width: '300px'
};

var tableContentStyle = {
  margin: 'auto'
}

var theme = {
  style: { borderRadius: '5px', width: '80px' },
  disabledStyle: { background: 'gray'},
  overStyle: { background: '#fafafa', color: 'black'},
  activeStyle: { background: '#e5e5e5' },
  pressedStyle: {background: 'magenta', fontWeight: 'bold'},
  overPressedStyle: {background: 'purple', fontWeight: 'bold'}
}

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
    this.logChange = this.logChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      availableUsers: [],
      userFilter: '',
      logData: [],
      selectValue: {"label":"a-hla", "value":"a-hla"}
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

  logChange(object) {
    console.log('Selected: ' + object.value);
    this.setState({selectValue: object.value});
  }

  handleComponentClick() {
    this.setState({text: 'I saw you! You clicked on Selector component!'});
  }

  handleButtonClick() {
    this.getLogData();
  }

  getLogData() {
    var
      url = 'http://kryton/cgi-bin/wspd_cgi.sh/swusrlog',
      jsonData = '',
      ttFiltr = config.ttFiltr;

    ttFiltr[0].cUserFltr = this.state.selectValue;

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

        <h2>{this.props.comboLabel}</h2>

          <Combobox
            name="selected-user"
            ref="userSelect"
            placeholder="Select user for filtering:"
            style={comboboxStyle}
            autofocus
            options={this.state.availableUsers}
            value={this.state.selectValue}
            onChange={this.logChange}
            clearable={true}
            searchable={true} />

          <UserButton theme={theme} onClick={this.handleButtonClick}>Send</UserButton>
          <br />
          {this.state.userFilter}

        <TableContent style={tableContentStyle} data={this.state.logData} />
      </div>
    );
  }
}

export default Selector;

import React from 'react';
import BaseComponent from './baseComponent';

var recordStyle = {
  border: '1px solid',
  margin: '5px',
  width: '300px'
};

class Record extends BaseComponent {
  constructor() {
      super();
      this.state = {
      };
  }

  render() {
      return (
        <div style={recordStyle}>
          <h2>ID akce: {this.props.aid}</h2>
          <b>{this.props.moc}</b>; {this.props.acc}
          <br />
          Uzivatel: <b>{this.props.usr}</b>
          <br />
          Datum a cas: <b>{this.props.dat}</b>
        </div>
      );
  }
}

Record.propTypes = {
  index: React.PropTypes.number,
  aid: React.PropTypes.number,
  dat: React.PropTypes.string,
  moc: React.PropTypes.string,
  acc: React.PropTypes.string
};

Record.defaultProps = {
  index: 0,
  aid: 0,
  dat: '',
  moc: '',
  acc: ''
};

export default Record;

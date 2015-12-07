import React from 'react';
import Connector from './connector';

class FaceModule extends React.Component {
  render() {
    return (
      <div>

        State: {this.props.status}
        <br />

        <Connector label="Welcome to Connector space" />
        <br />

      </div>
    );
  }
}

export default FaceModule;

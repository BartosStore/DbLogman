import React from 'react';
import Selector from './selector';

class FaceModule extends React.Component {
  render() {
    return (
      <div>
        State: {this.props.status}
        <br />

        <Selector label="Welcome to Selector space" comboLabel="User filter" />
        <br />
      </div>
    );
  }
}

FaceModule.propTypes = {
  status: React.PropTypes.string
};

FaceModule.defaultProps = {
  status: 'none'
};

export default FaceModule;

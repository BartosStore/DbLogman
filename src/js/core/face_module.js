import React from 'react';
import Selector from './selector';

class FaceModule extends React.Component {
  render() {
    return (
      <div>
        <Selector comboLabel="User filter" />
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

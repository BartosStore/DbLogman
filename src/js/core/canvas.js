import React from 'react';
import BaseComponent from './baseComponent';

class Record extends BaseComponent {
  constructor() {
      super();
      this.state = {
      };
  }

  render() {
      console.log('canvas');

      return (
        <div>
          <h2>I am record number {this.props.index}</h2>
          Canvas text...
          <br />
          ID akce: {this.props.aid}

        </div>
      );
  }
}

Canvas.propTypes = {
  index: React.PropTypes.integer,
  aid: React.PropTypes.integer
};

Canvas.defaultProps = {
  index: 0,
  aid: 0
};

export default Record;

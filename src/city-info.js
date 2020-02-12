import React, {PureComponent} from 'react';

export default class CityInfo extends PureComponent {
  render() {
    const {info} = this.props;
    const displayName = `${info.Development}`;

    return (
      <div>
        <p>
          {displayName}
        </p>
        <h2>{info.AvailableLots} LOTS</h2>
      </div>
    );
  }
}

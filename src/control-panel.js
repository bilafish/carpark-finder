import React, {PureComponent} from 'react';

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return (
      <Container>
        <div>
          <h3>Carpark Availability in Singapore</h3>
          <p>
            Map showing list of carparks and number of lots available.
          </p>
          <p>Real-time data provided by LTA.</p>
        </div>
      </Container>
    );
  }
}

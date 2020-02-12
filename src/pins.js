import React, {PureComponent} from 'react';
import {Marker} from 'react-map-gl';

// const ICON = `M18.258,3.266c-0.693,0.405-1.46,0.698-2.277,0.857c-0.653-0.686-1.586-1.115-2.618-1.115c-1.98,0-3.586,1.581-3.586,3.53c0,0.276,0.031,0.545,0.092,0.805C6.888,7.195,4.245,5.79,2.476,3.654C2.167,4.176,1.99,4.781,1.99,5.429c0,1.224,0.633,2.305,1.596,2.938C2.999,8.349,2.445,8.19,1.961,7.925C1.96,7.94,1.96,7.954,1.96,7.97c0,1.71,1.237,3.138,2.877,3.462c-0.301,0.08-0.617,0.123-0.945,0.123c-0.23,0-0.456-0.021-0.674-0.062c0.456,1.402,1.781,2.422,3.35,2.451c-1.228,0.947-2.773,1.512-4.454,1.512c-0.291,0-0.575-0.016-0.855-0.049c1.588,1,3.473,1.586,5.498,1.586c6.598,0,10.205-5.379,10.205-10.045c0-0.153-0.003-0.305-0.01-0.456c0.7-0.499,1.308-1.12,1.789-1.827c-0.644,0.28-1.334,0.469-2.06,0.555C17.422,4.782,17.99,4.091,18.258,3.266`;

const ICON = `M45.5 0h-43v43h16.2l5.9 5 5.8-5h15.1z`;

const SIZE = 40;

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default class Pins extends PureComponent {
  render() {
    const {data, onClick} = this.props;

    return data.map((city, index) => {
        if (city.Location.length > 0) {
          const coordinates = city.Location.split(" ")
          return (
            <Marker key={`marker-${index}`} longitude={parseFloat(coordinates[1])} latitude={parseFloat(coordinates[0])}>
              <svg
                height={SIZE}
                width={SIZE}
                viewBox="0 0 50 50"
                style={{
                  cursor: 'pointer',
                  fill: '#4691f6',
                  stroke: 'none',
                  transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                }}
                onClick={() => onClick(city)}
              >

                <path d={ICON} />
                <text x="15" y="25" fill="white">{city.AvailableLots}</text>
              </svg>
            </Marker>
          )
        }
        });
  }
}

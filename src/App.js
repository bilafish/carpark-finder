import './App.css';
import React, {Component} from 'react';
import MapGL, {Popup, NavigationControl, FullscreenControl, ScaleControl} from 'react-map-gl';
import 'mapbox-gl/src/css/mapbox-gl.css';
import ControlPanel from './control-panel';
import Pins from './pins';
import CityInfo from './city-info';
import NavBar from './Navbar';
import dotenv from 'dotenv';
// import mockData from './mockData.js';

const TOKEN = process.env.MAPBOX_KEY; // Set your mapbox token here

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  position: 'absolute',
  bottom: 36,
  left: 0,
  padding: '10px'
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 1.367676,
        longitude: 103.806701,
        zoom: 11,
        bearing: 0,
        pitch: 0
      },
      isLoading: true,
      data: [],
      popupInfo: null
    };
  }

  componentDidMount() {
    this.fetchData()
      .then(data => {
        console.log(data)
        this.setState({
          isLoading: false,
          data: data
        });
      })
      .catch(error => console.log(error))
  }

  fetchData() {
    const apiEndpoint = `https://wheretopark.netlify.com/.netlify/functions/carparks`

    return (fetch(apiEndpoint, { headers: { "Accept": "application/json" } })
      .then((response) => response.json())
      .then(data => data)
      .catch(error => console.log(error)))
  }

  _updateViewport = viewport => {
    this.setState({viewport});
  };

  _onClickMarker = city => {
    this.setState({popupInfo: city});
  };



  _renderPopup() {
    const {popupInfo} = this.state;
    let coordinates = ((popupInfo != null) ? popupInfo.Location.split(" ") : ["0", "0"]);
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={parseFloat(coordinates[1])}
          latitude={parseFloat(coordinates[0])}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <CityInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const {viewport} = this.state;

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <NavBar />
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={this._updateViewport}
          mapboxApiAccessToken={TOKEN}
        >
          <Pins data={this.state.data} onClick={this._onClickMarker} />

          {this._renderPopup()}

          <div style={fullscreenControlStyle}>
            <FullscreenControl />
          </div>
          <div style={navStyle}>
            <NavigationControl />
          </div>
          <div style={scaleControlStyle}>
            <ScaleControl />
          </div>

          <ControlPanel containerComponent={this.props.containerComponent} />
        </MapGL>
      </div>
    );
  }
}

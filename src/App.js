import "./App.css";
import React, { Component } from "react";
import MapGL, {
  Popup,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  FlyToInterpolator
} from "react-map-gl";
import "mapbox-gl/src/css/mapbox-gl.css";
// import ControlPanel from './control-panel';
import Pins from "./pins";
import CityInfo from "./city-info";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
// import mockData from "./mockData.js";

const TOKEN = process.env.REACT_APP_MAPBOX_KEY; // Set your mapbox token here

const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  margin: 10
};

const navStyle = {
  position: "absolute",
  top: 36,
  left: 0,
  padding: "10px"
};

const scaleControlStyle = {
  position: "absolute",
  bottom: 36,
  left: 0,
  padding: "10px"
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
    // this.setState({
    //   isLoading: false,
    //   data: mockData
    // });
    this.fetchData()
      .then(data => {
        console.log(data);
        this.setState({
          isLoading: false,
          data: data
        });
      })
      .catch(error => console.log(error));
  }

  fetchData() {
    const apiEndpoint = `https://wheretopark.netlify.com/.netlify/functions/carparks`;
    return fetch(apiEndpoint, { headers: { Accept: "application/json" } })
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error));
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _onViewportChange = viewport => {
    viewport.zoom = 13; //Whatever zoom level you want
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  _goToViewport = (longitude, latitude) => {
    this._onViewportChange({
      longitude,
      latitude,
      zoom: 13,
      transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
      transitionDuration: "auto"
    });
  };

  _onClickMarker = city => {
    // Add camera transition when map marker is clicked
    let coordinates = city != null ? city.Location.split(" ") : ["0", "0"];
    this._goToViewport(parseFloat(coordinates[1]), parseFloat(coordinates[0]));
    this.setState({ popupInfo: city });
  };

  // Renders a popup when a pin marker is clicked
  _renderPopup() {
    const { popupInfo } = this.state;
    let coordinates =
      popupInfo != null ? popupInfo.Location.split(" ") : ["0", "0"];
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={parseFloat(coordinates[1])}
          latitude={parseFloat(coordinates[0])}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <CityInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;

    return (
      <div style={{ width: "100%", height: "100%", background: "#292929" }}>
        <NavBar />
        <MapGL
          {...viewport}
          width="100%"
          height="83%"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={this._updateViewport}
          mapboxApiAccessToken={TOKEN}
        >
          <Pins data={this.state.data} onClick={this._onClickMarker} />
          {this._renderPopup()}
          <GeolocateControl
            onViewportChange={this._onViewportChange}
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          <div style={navStyle}>
            <NavigationControl />
          </div>
          <div style={scaleControlStyle}>
            <ScaleControl />
          </div>
          {/*<ControlPanel containerComponent={this.props.containerComponent} >*/}
        </MapGL>
        <Footer />
      </div>
    );
  }
}

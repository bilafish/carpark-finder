import "./App.css";
import React, { Component } from "react";
import MapGL, {
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  FlyToInterpolator,
  Marker
} from "react-map-gl";
import "mapbox-gl/src/css/mapbox-gl.css";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import { Group } from "./components/ClusterMarker";
import Cluster from "./components/Cluster";
import Drawer from "./components/Drawer";
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
      popupInfo: {},
      showDrawer: false
    };
    this.drawer = React.createRef();
  }

  componentDidMount() {
    // this.setState({
    //   isLoading: false,
    //   data: mockData
    // });
    this.fetchData()
      .then(data => {
        this.setState({
          isLoading: false,
          data: data
        });
      })
      .catch(error => console.log(error));
  }

  fetchData() {
    const apiEndpoint = `https://wheretopark.netlify.app/.netlify/functions/carparks`;
    return fetch(apiEndpoint, { headers: { Accept: "application/json" } })
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error));
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _onViewportChange = viewport => {
    viewport.zoom = 14; //Whatever zoom level you want
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
    // Shows side drawer with carpark info
    this.setState({ popupInfo: city });
    setTimeout(() => {
      this.drawer.current.showDrawerHandler();
    }, 700);
  };

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
          ref={ref => (this.mapRef = ref)}
        >
          {this.mapRef && (
            <Cluster
              map={this.mapRef.getMap()}
              radius={20}
              extent={512}
              nodeSize={40}
              element={clusterProps => (
                <Group
                  onViewportChange={this.onViewportChange}
                  {...clusterProps}
                />
              )}
            >
              {this.state.data.map((point, index) => {
                if (point.Location.length > 0) {
                  let coordinates = point.Location.split(" ");
                  return (
                    <Marker
                      key={index}
                      longitude={parseFloat(coordinates[1])}
                      latitude={parseFloat(coordinates[0])}
                      lots={point.AvailableLots}
                    >
                      <div
                        style={{
                          color: "#fff",
                          background: "#1978c8",
                          borderRadius: "20px",
                          textAlign: "center",
                          padding: "6px",
                          cursor: "pointer"
                        }}
                        onClick={() => this._onClickMarker(point)}
                      >
                        {point.AvailableLots}
                      </div>
                    </Marker>
                  );
                } else {
                  return null;
                }
              })}
            </Cluster>
          )}
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
          <Drawer ref={this.drawer} data={this.state.popupInfo} />
        </MapGL>
        <Footer />
      </div>
    );
  }
}

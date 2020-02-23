import React from "react";

export class Group extends React.PureComponent {
  render() {
    const {
      cluster
      // superCluster
    } = this.props;
    // if you want to access the levaves in this cluster group
    // const leaves = superCluster.getLeaves(cluster.properties.cluster_id, 3);
    // the number of leaves in this cluster group
    // const count = cluster.properties.point_count_abbreviated;
    const count = cluster.properties.sum;
    return (
      <div>
        <div
          style={{
            height: "3em",
            width: "3em",
            position: "absolute",
            backgroundColor: "snow",
            color: "#1a1a1a",
            borderRadius: "3em",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <span>{count}</span>
        </div>
      </div>
    );
  }
}

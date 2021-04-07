import React from "react";
import ReactMapGL from "react-map-gl";

import "./index.scss";

class TravelMap extends React.Component {
  render() {
    return (
      <div className="travel-map">
        <div className="being-code">
          <ReactMapGL
            width={400}
            height={400}
            latitude={37.7577}
            longitude={-122.4376}
            zoom={8}
          />
        </div>
      </div>
    );
  }
}
export default TravelMap;

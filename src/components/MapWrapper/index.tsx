import React from "react";

export const MapWrapper = React.memo(
    () => {
        return <div id="map-container-place" style={{ width: '100%', height: '100%' }}></div>;
    },
    () => true,
);
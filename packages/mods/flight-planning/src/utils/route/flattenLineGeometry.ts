import * as turf from "@turf/turf";

export const flattenGeometry = (
    geometry: turf.helpers.FeatureCollection<
        turf.helpers.LineString | turf.helpers.MultiLineString | turf.helpers.Geometry,
        turf.helpers.Properties
    >
) => {
    const flatGeometry: turf.Position[] = [];
    for (const feature of geometry.features) {
        const { coordinates } = feature.geometry;
        const isArray = coordinates && Array.isArray(coordinates);
        if (isArray) {
            coordinates.map((coords) => flatGeometry.push(coords as turf.Position));
        } else flatGeometry.push(coordinates);
    }
    return turf.lineString(flatGeometry);
};

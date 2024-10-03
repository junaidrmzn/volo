export const checkIfSourceExists = (map: maplibregl.Map, layerId: string) => {
    return map.getSource(`${layerId}-source`) !== undefined;
};

const mockMapLibreMap = {
    addLayer: jest.fn(),
    removeLayer: jest.fn(),
    easeTo: jest.fn(),
    addSource: jest.fn(),
    removeSource: jest.fn(),
    addImage: jest.fn(),
    removeImage: jest.fn(),
    addControl: jest.fn(),
    getCanvas: jest.fn().mockReturnValue({
        style: {
            cursor: "inherit",
        },
    }),
    removeControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
    off: jest.fn(),
    once: (_: string, callback: Function) => {
        callback();
    },
    getLayer: () => ({}),
    getSource: () => ({}),
    hasImage: () => ({}),
    style: {},
    setStyle: () => {},
    dragRotate: {
        disable: jest.fn(),
    },
    touchZoomRotate: {
        disableRotation: jest.fn(),
    },
};
mockMapLibreMap.style = {
    ...mockMapLibreMap,
};

const mockMapLibreMarker = {
    on: jest.fn(),
    off: jest.fn(),
    addTo: jest.fn(),
    setLngLat: jest.fn(),
    remove: jest.fn(),
    setDraggable: jest.fn(),
};
mockMapLibreMarker.addTo = jest.fn().mockReturnValue({ ...mockMapLibreMarker });
mockMapLibreMarker.setLngLat = jest.fn().mockReturnValue({ ...mockMapLibreMarker });

export { mockMapLibreMap, mockMapLibreMarker };

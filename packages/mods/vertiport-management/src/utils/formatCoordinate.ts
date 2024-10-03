export const parseCoordinate = (coordinate: string | undefined): number => {
    const number = Number(coordinate);
    return Number.isNaN(number) ? 0 : number;
};

export const formatCoordinate = (value: string) => {
    const [latitude, longitude] = value
        .toString()
        .split(",")
        .map((coordinate) => coordinate.trim());

    return {
        latitude: parseCoordinate(latitude),
        longitude: parseCoordinate(longitude),
        height: 0,
    };
};

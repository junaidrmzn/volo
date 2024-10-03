export const isArrayOfCoordinates = (bounds: unknown): bounds is number[][] => {
    return (
        Array.isArray(bounds) &&
        bounds.every(
            (item) =>
                Array.isArray(item) && item.length === 2 && typeof item[0] === "number" && typeof item[1] === "number"
        )
    );
};

import { LayoutOptions, PaintOptions } from "@voloiq/map";

export const circleMarkerTemplate = (color: string) => `
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" x2="18" y1="9" y2="9" stroke="${color}" stroke-width="2" />
        <line x1="9" x2="9" y1="0" y2="18" stroke="${color}" stroke-width="2">
    </svg>
`;

export const circleLayout = () => {
    const layout: LayoutOptions = {
        "line-join": "round",
        "line-cap": "round",
    };
    return layout;
};
export const circlePaint = (color: string) => {
    const paint: PaintOptions = {
        "line-color": color,
        "line-opacity": 0.8,
        "line-width": 2,
        "line-dasharray": [1, 2],
    };
    return paint;
};

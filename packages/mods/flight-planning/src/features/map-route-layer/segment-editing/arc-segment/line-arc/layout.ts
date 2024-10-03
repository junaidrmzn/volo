import { LayoutOptions, PaintOptions } from "@voloiq/map";

export const lineArcLayout = () => {
    const layout: LayoutOptions = {
        "line-join": "round",
        "line-cap": "round",
    };
    return layout;
};

export const lineArcPaint = (color: string) => {
    const paint: PaintOptions = {
        "line-color": color,
        "line-opacity": 0.8,
        "line-width": 10,
    };

    return paint;
};

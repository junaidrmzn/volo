import { LayoutOptions } from "@voloiq/map";

export const straightLineLayout = () => {
    const layout: LayoutOptions = {
        "line-join": "round",
        "line-cap": "round",
    };
    return layout;
};

export const straightLinePaint = (color: string) => ({
    "line-color": color,
    "line-opacity": 0.8,
    "line-width": 10,
});

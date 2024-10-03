import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
import { withDateTimeInputLocale } from "./withDateTimeInputLocale";
import { withLocalFeatureFlagsProvider } from "./withLocalFeatureFlagsProvider";
import { withTheme } from "./withTheme";

export const globalTypes = {
    colorMode: {
        name: "colorMode",
        description: "Global color mode for components",
        defaultValue: "light",
        toolbar: {
            icon: "eye",
            items: ["light", "dark"],
        },
    },
};

export const decorators = [withTheme, withDateTimeInputLocale, withLocalFeatureFlagsProvider];

const customViewports = {
    "2xs": {
        name: "Apple iPhone 8+",
        styles: {
            width: "414px",
            height: "736px",
        },
    },
    sm: {
        name: "Microsoft Surface Pro 3",
        styles: {
            width: "1024px",
            height: "1440px",
        },
    },
    md: {
        name: "Lenovo IdeaPad",
        styles: {
            width: "1280px",
            height: "800px",
        },
    },
    lg: {
        name: 'Apple MacBook Pro 15"',
        styles: {
            width: "1440px",
            height: "900px",
        },
    },
    xl: {
        name: 'Desktop Monitors 24-27"',
        styles: {
            width: "1920px",
            height: "1080px",
        },
    },
    "2xl": {
        name: 'Apple iMac 27"',
        styles: {
            width: "2560px",
            height: "1440px",
        },
    },
};

export const parameters = {
    controls: { expanded: true },
    actions: { argTypesRegex: "^on.*" },
    viewport: {
        viewports: customViewports,
    },
};

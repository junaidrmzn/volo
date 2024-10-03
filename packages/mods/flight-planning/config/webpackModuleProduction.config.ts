import path from "node:path";
import { webpackModuleConfiguration } from "../../../../config/webpack/webpackModule.config";

const rootPath = path.resolve(__dirname, "..");

export default webpackModuleConfiguration({
    rootPath,
    moduleName: "flightPlanning",
    exposesOverwrites: {
        "./MapRoute": "./src/map-route-microfrontend/map-route/MapRouteWithData",
        "./MapRouteOption": "./src/map-route-microfrontend/map-route-option/MapRouteOptionWithData",
    },
});

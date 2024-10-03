import type { Configuration } from "webpack";
import { container } from "webpack";
import { merge } from "webpack-merge";
import { sharedDependencies } from "./webpack.module.shared";
import { webpackBaseConfiguration } from "./webpackBase.config";

const { ModuleFederationPlugin } = container;

export type WebpackModuleConfigurationOptions = {
    rootPath: string;
    // Name of the module must not contain dashes: https://github.com/webpack/webpack/pull/11934
    moduleName: string;
    filePathPrefix?: string;
    exposesOverwrites?: Record<string, string>;
};
export const webpackModuleConfiguration = (options: WebpackModuleConfigurationOptions): Configuration => {
    const { rootPath, moduleName, filePathPrefix, exposesOverwrites } = options;
    const defaultExposes = { "./App": "./src/App" };
    return merge(webpackBaseConfiguration({ rootPath }), {
        plugins: [
            new ModuleFederationPlugin({
                name: moduleName,
                filename: filePathPrefix ? `${filePathPrefix}/remoteEntry.js` : "remoteEntry.js",
                remotes: {},
                exposes: exposesOverwrites ? { ...defaultExposes, ...exposesOverwrites } : { ...defaultExposes },
                shared: sharedDependencies,
            }),
        ],
    });
};

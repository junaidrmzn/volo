import path from "node:path";
import type { Configuration as WebpackConfiguration } from "webpack";
import type { Configuration as WebpackDevelopmentServerConfiguration } from "webpack-dev-server";
import merge from "webpack-merge";
import { withMocks } from "../webpack.utils";
import { getProxyConfigMap } from "./getProxyConfigMap";
import type { WebpackBaseConfigurationOptions } from "./webpackBase.config";
import { webpackBaseConfiguration } from "./webpackBase.config";

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/27570
type Configuration = {
    devServer?: WebpackDevelopmentServerConfiguration;
} & WebpackConfiguration;

export type WebpackDevelopmentConfigurationOptions = Pick<
    WebpackBaseConfigurationOptions,
    "rootPath" | "babelConfigFilePath" | "bundleEntryFilePath"
> & { port: number };
export const webpackDevelopmentConfiguration = (options: WebpackDevelopmentConfigurationOptions): Configuration => {
    const { rootPath, port, babelConfigFilePath, bundleEntryFilePath } = options;

    return merge(webpackBaseConfiguration({ rootPath, babelConfigFilePath, bundleEntryFilePath }), {
        devtool: "source-map",
        devServer: {
            compress: true,
            port,
            hot: false,
            historyApiFallback: true,
            static: [
                { directory: path.resolve(rootPath, "dist") },
                ...(withMocks() ? [{ directory: path.resolve(rootPath, "../../../scripts/msw") }] : []),
            ],
            proxy: withMocks() ? undefined : getProxyConfigMap(),
        },
    });
};

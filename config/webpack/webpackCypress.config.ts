import type { Configuration } from "webpack";
import { DefinePlugin } from "webpack";

export const webpackCypressConfiguration = (): Configuration => {
    return {
        mode: "development",
        devtool: false,
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: [/node_modules/],
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                transpileOnly: true,
                            },
                        },
                    ],
                },
                { test: /\.css$/i, use: ["style-loader", "css-loader"] },
                {
                    test: /\.svg$/i,
                    issuer: /\.(ts|tsx)?$/,
                    use: ["@svgr/webpack"],
                },
            ],
        },
        plugins: [
            new DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            }),
        ],
    };
};

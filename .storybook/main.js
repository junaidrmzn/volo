const path = require("path");
const glob = require("glob");
const toRelativePath = (_path) => path.join(__dirname, "..", _path);

const getStories = () =>
    ["packages/**/*.stories.tsx", "packages/**/*.stories.mdx", "packages/**/stories/*.tsx"]
        .map((pattern) => glob.sync(pattern).filter((story) => !story.includes("node_modules")))
        .flat()
        .map(toRelativePath);

module.exports = {
    stories: getStories(),
    addons: ["@storybook/addon-a11y", "@storybook/addon-essentials", "storybook-xstate-addon/preset"],
    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: "react-docgen-typescript",
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            compilerOptions: {
                allowSyntheticDefaultImports: false,
                esModuleInterop: false,
            },
        },
    },
    core: { builder: "webpack5" },
    webpackFinal: async (config) => {
        // Default rule for images /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
        const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test(".svg"));
        fileLoaderRule.exclude = /\.svg$/;

        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.(ts|tsx)?$/,
            loader: "@svgr/webpack",
        });

        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    "@svgr/webpack": toRelativePath("node_modules/@svgr/webpack"),
                    "@emotion/core": toRelativePath("node_modules/@emotion/react"),
                    "emotion-theming": toRelativePath("node_modules/@emotion/react"),
                },
            },
        };
    },
};

module.exports = (api) => {
    api.cache.using(() => process.env.NODE_ENV);

    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    targets: {
                        esmodules: true,
                    },
                },
            ],
            "@babel/preset-typescript",
            [
                "@babel/preset-react",
                {
                    runtime: "automatic",
                },
            ],
        ],
        plugins: ["inline-react-svg"],
    };
};

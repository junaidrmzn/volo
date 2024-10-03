module.exports = {
    platform: "azure",
    endpoint: "https://dev.azure.com/volocopter/",
    hostRules: [
        {
            hostType: "npm",
            matchHost: "pkgs.dev.azure.com",
        },
    ],
    repositories: ["voloiq/voloiq-ui"],
};

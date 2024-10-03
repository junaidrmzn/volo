const getRestrictedImports = function (allowedImports = [], additionalImportPatterns = []) {
    const paths = [
        {
            name: "react",
            importNames: ["FC"],
            message: "Please don't use FC, use FCC instead (no import needed).",
        },
    ];

    const importPatterns = [
        {
            group: ["@chakra-ui/*", "@volocopter/design-library-react/*"],
            message: "Please use @volocopter/design-library-react instead",
        },
        {
            group: ["@testing-library/*", "!@testing-library/jest-dom", "!@testing-library/react-hooks"],
            message: "Please use @voloiq/testing instead",
        },
        { group: ["i18next", "react-i18next"], message: "Please use @voloiq/i18n instead" },
        { group: ["react-router", "react-router-dom"], message: "Please use @voloiq/routing instead" },
        {
            group: ["**/dist/**", "**/[A-Z]*/src/**"],
            message: "Please don't import from dist or src folders, use package entrypoint instead",
        },
        ...additionalImportPatterns,
    ];

    const filteredPatterns = importPatterns.filter(
        (restrictedImport) => !restrictedImport.group.some((library) => allowedImports.includes(library))
    );

    return ["error", { patterns: filteredPatterns, paths }];
};

module.exports = {
    root: true,
    extends: [
        // the order matters here!
        "@volocopter/eslint-config",
        "plugin:prettier/recommended", // this always has to come last
    ],
    rules: {
        "no-restricted-imports": getRestrictedImports(),
        "no-type-assertion/no-type-assertion": "warn",
    },
    // override restricted imports for specific patterns (e.g. the design system library has the right to import chakra)
    overrides: [
        {
            files: ["**/libs/design-library/**"],
            rules: { "no-restricted-imports": getRestrictedImports(["@testing-library/*", "@chakra-ui/*"]) },
        },
        {
            files: ["**/libs/testing/**"],
            rules: { "no-restricted-imports": getRestrictedImports(["@testing-library/*"]) },
        },
        {
            files: ["**/libs/date-time-input/**"],
            rules: { "no-restricted-imports": getRestrictedImports(["@testing-library/*"]) },
        },
        {
            files: ["**/libs/app-shell/**"],
            rules: { "no-restricted-imports": getRestrictedImports(["@testing-library/*"]) },
        },
        {
            files: ["**/libs/resource-overview/**"],
            rules: { "no-restricted-imports": getRestrictedImports(["@testing-library/*"]) },
        },
        {
            files: ["**/libs/time-scheduler/**"],
            rules: { "no-restricted-imports": getRestrictedImports(["@testing-library/*"]) },
        },
        {
            files: ["**/libs/auth/**"],
            rules: { "no-restricted-imports": getRestrictedImports(["@testing-library/*"]) },
        },
        {
            files: ["**/libs/utils/**"],
            rules: { "no-restricted-imports": getRestrictedImports(["@testing-library/*"]) },
        },
        {
            files: ["**/libs/feature-flags/**"],
            rules: { "no-restricted-imports": getRestrictedImports(["@testing-library/*"]) },
        },
        {
            files: ["**/libs/date-time/**"],
            rules: { "no-restricted-imports": getRestrictedImports(["@testing-library/*"]) },
        },
        {
            files: ["**/libs/i18n/**"],
            rules: { "no-restricted-imports": getRestrictedImports(["i18next"]) },
        },
        {
            files: ["**/libs/routing/**"],
            rules: { "no-restricted-imports": getRestrictedImports(["react-router-dom"]) },
        },
        {
            files: ["**/libs/error-views/**"],
            rules: { "no-restricted-imports": getRestrictedImports(["@testing-library/*", "react-router-dom"]) },
        },
        {
            files: ["**/libs/filter-panel/**"],
            rules: { "no-restricted-imports": getRestrictedImports(["@testing-library/*", "react-router-dom"]) },
        },
        {
            files: ["**/mods/flight-test-definition/libs/components/**"],
            rules: {
                "no-restricted-imports": getRestrictedImports(
                    [],
                    [
                        {
                            group: ["@voloiq/flight-test-definition-api/*"],
                            message: "The components should be agnostic from the API to ensure their reusability",
                        },
                    ]
                ),
            },
        },
        {
            files: ["**/scripts/**", "**/libs/service/**"],
            rules: { "unicorn/prefer-module": "off" },
        },
        {
            files: ["**/src/**/*.test.{js,ts,tsx}"],
            extends: ["plugin:testing-library/react"],
        },
    ],
    ignorePatterns: [
        "**/dist/**",
        "**/build-statistics/**",
        "**/coverage/**",
        "**/node_modules/**",
        "**/src/api",
        "**/*.guard.ts*",
        "**/mockServiceWorker.js",
    ],
};

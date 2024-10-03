# VoloIQ UI

Welcome to the VoloIQ application frontend! This application is built using React.
If you are a backend developer venturing into the frontend world, React is a JavaScript library for building user interfaces 😉.
We also use TypeScript, a superset of JavaScript that adds optional static typing, to ensure a more maintainable codebase.
Webpack is used for building and bundling the application.

We take code quality and testing seriously, which is why we use a combination of tools to ensure that our code is well-written and free of errors.
ESLint is used for linting the code, Prettier is used for code formatting, Jest is used for unit testing, and Cypress is used for component and end-to-end testing.

## Get Started

### System Prerequisites

-   yarn: 1.22.19
-   npm: 8.19.3
-   Node.js version 16.20 or higher. You can check your current version by running `node -v` in the terminal.
-   UNIX system (Linux or macOS). If you are on Windows, we recommend using the Windows Subsystem for Linux (WSL) to run the application (Find a guide on how to set up WSL [here](https://confluence.volocopter.org/display/VIQ/How+to+set+up+your+dev+environment+in+WSL)).
-   OSX only: Some third party libraries require low-level libraries to be installed. Please find more instructions [here](https://github.com/Automattic/node-canvas/wiki/Installation:-Mac-OS-X#homebrew).
-   Requirements for `node-gyp`, these are platform dependent and can be found [here](https://github.com/nodejs/node-gyp#installation).

Before proceeding, please make sure that your system meets these requirements.

### Authentication

In order to access our internal libraries published in our internal NPM feed, you'll need to authenticate with your credentials. Here are the instructions to do so:

1. [Set up Azure credentials with yarn](https://confluence.volocopter.org/display/VIQ/How+to+connect+to+private+Azure+Artifacts+feeds#HowtoconnecttoprivateAzureArtifactsfeeds-SetupyourPackageManagerwithCredentials)
2. Convert it to base64
    - On MacOS: `echo -n "volocopter:$TOKEN" | base64`
3. Now add your converted token against "npmAuthIdent" in your root .yarnrc.yml file
4. Add a file name ~/.yarnrc.yml and place below code and replace `YOUR_TOKEN` with the token in step 2:

    > If the token doesn't work try adding 'volocopter:' before token and then convert it to base64

    ```
    npmRegistries:
      https://pkgs.dev.azure.com/volocopter/_packaging/common/npm/registry/:
        npmAlwaysAuth: true
        npmAuthIdent: YOUR_TOKEN
      https://pkgs.dev.azure.com/volocopter/voloiq/_packaging/voloiq-typescript-api/npm/registry/:
        npmAlwaysAuth: true
        npmAuthIdent: YOUR_TOKEN
    ```

5. If you're using mac, make sure your mac terminal and IDE's terminal versions are same

### Setup

To get started, clone the repository and run the following commands (make sure to have admin access while doing it):

1. `yarn install`
2. `yarn setup`

#### Troubleshooting

1. Error: `gyp ERR! stack Error: 'gyp' failed with exit code: 1`

    For MacOS users, there is a chance that `node-gyp` will cause some headache when running `yarn install`.
    If the error above happens, make sure to download xcode from App Store and install it. To check if it's installed successfully, run 'xcode-select -p' in terminal

    make sure your default node version is 16.20 or above. And you've met system pre-reqs above
    Basically, this error happens frequently on MacOS Catalina and newer versions if your Xcode Command Line Tools is not installed or if you have an old version of it.

2. Error: `AssertionError: Spaces in action input filenames not supported`

    If you see this error you might want to make sure your local path to this repo does not contain any folders with spaces in their names.

3. Error: `error Workspaces can only be enabled in private projects.`
   If you see this error, you might want to check yarn/releases folder and see if the file contains the same version

## Creating a New Package

To create new libs, mods, or apps, please use:
`yarn generate:package [lib | mod | app] @voloiq/[lib | mod | app]-name`

Example: `yarn generate:package app @voloiq/app-test`

## Running With the Dev Server

There is a Proxy which proxies the local requests to the dev api. (https://app.dev.voloiq.io/). This is an easy way to run your frontend locally with connection to the backend already deployed to dev.

-   Start your app as usual with `yarn start:voloiq`
-   In another terminal window, start the proxy server with `yarn start:voloiq:proxy`
    -   Paste the token from the Dev Website into the CLI prompts
        -   Go to (https://app.dev.voloiq.io/) and open one project there, use the Developer Tools Network Tab and click on one call. There you should find the Bearer Token (Authorization) and the Cookie. In the following example you find a more detailed description.
-   Then you need to navigate to a module like "flight-test-definition" in your terminal `cd ~/code/voloiq-ui/packages/mods/flight-test-definition` and run `yarn start:module`
    -   If you need more projects at once, do this in several windows in the specific folders

### Example:

-   Open (https://app.dev.voloiq.io/flight-test-definition/overview) with your Dev Tools Network Tab open.
-   Click on the call "definitions?size..."
-   There you find under Authorization the Bearer Token. Click three times which highlights the whole token (including "Bearer") and then copy it into the terminal
-   Do the same for the value under Cookie. Copy it with "\_oauth2_proxy="

### Troubleshooting with Netskope (on Mac)

-   If you get these errors, when using the proxy:

    ```
        Proxy request error: Error: self-signed certificate in certificate chain
        at TLSSocket.onConnectSecure (node:\_tls_wrap:1550:34)
        at TLSSocket.emit (node:events:514:28)
        at TLSSocket.\_finishInit (node:\_tls_wrap:967:8)
        at ssl.onhandshakedone (node:\_tls_wrap:743:12) {
        code: 'SELF_SIGNED_CERT_IN_CHAIN'
        }
    ```

-   Explanation: The proxy doesn't know where the new CA signed certificates are living, which is related to Netskope installed on your computer.
-   You need to add the Netscope Certificates to your computer, where the proxy can find it.
-   Please follow the steps from this source (Azure CLI and VoloIQ UI Proxy): (https://confluence.volocopter.org/pages/viewpage.action?spaceKey=VIQ&title=How+to+add+Netskope+certificate)
-   After that, you should be able to use the proxy normally as described above

## Running With a Backend

The base URL of the backend is specified via the environment variable `BACKEND_BASE_URL`.
In non-production environments (`NODE_ENV !== "production"`), the backend is expected to run locally by default.
So if the frontend is running in development mode and you have not specified a base URL for the backend, then `http://localhost` is automatically assumed as the base url.
In order to let the application know which port your local backend is listening on, you should specify the default port of your backend API in `/config/local-backend.config.ts`.
This uses [Webpack's devServer.proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy) to automatically map outgoing requests to the right port - so if you notice the outgoing requests in your browser's network tab are actually going to port `8080` all the time, that's why.

For production builds, we aim at having environment agnostic builds.
This means that all configurations that vary in different environments should be passed into the built container as environment variables.
This keeps us true to the principles of the [12-Factor App](https://12factor.net/config) and allows a built Docker image to be deployed to any environment.
For the backend URL, this means that it must not yet be defined at build time, otherwise it would be hardcoded into the built bundle.
Instead, we define the backend URL for production builds with `$BACKEND_BASE_URL` as a placeholder and substitute it with the actual backend base URL at deploy time (before we start the Docker container) using [`envsubst`](https://www.gnu.org/software/gettext/manual/html_node/envsubst-Invocation.html).

For example, in a `docker-compose.yml` file:

```

environment:

-   BACKEND_BASE_URL=https://backend.com

```

During the build process, the value of the `BACKEND_BASE_URL` will be replaced in the final build with the actual value https://backend.com.
This way, you can make sure that your application is configured correctly in any environment, without the need to hardcode any values.
Please make sure that the backend is up and running and accessible at the URL that you have specified.

### Type-safe API definitions

This project utilizes the OpenAPI specification to document our API endpoints and generate TypeScript types for consumption in other projects.
By defining our API endpoints in a machine-readable format, we are able to automate the process of generating strongly-typed clients, which improves developer experience and reduces the likelihood of runtime errors.
In order to consume the generated TypeScript types in your project, you will need to perform the following steps:

1. Add the appropriate package from the internal NPM feed as a dependency in your project. The package name should be in the format `@voloiq-typescript-api/${apiName}-types`.
2. Import the types and type guards in your code as needed.
3. Use the types in the function signatures and the type guards for runtime type checking.
4. Rebuild and test your application.

Please note that updating to a new version of the generated types may require changes in your consuming code.
Review the API documentation and any breaking changes that might have been introduced in the new version.
Also, don't forget to refer to the "Updating to the Latest Version" section of the [TS API Generator's README file](https://dev.azure.com/volocopter/voloiq/_git/voloiq-typescript-api-types?path=/README.md) in order to understand the process of updating the package to the latest version.

### Backend service ports

Refer to the [/config/local-backend.config.ts](./config/local-backend.config.ts) file to find the backend service ports used when running the application in development mode.

## Translation Files

Translation files can be updated using the [translation](./translations) script.

```

Upload or download translation files to or from lokalise

Usage: translations <command> [<args>]

Environment Variables:
LOKALISE_PROJECT_ID the project id
LOKALISE_API_TOKEN your API token. You can get it from https://app.lokalise.com/profile API tokens

Commands:
download [tags] downloads translation files matching zero, one or more space-separated tags
upload [path] uploads all translation files in the repository root or optionally a subdirectory

Choose wisely my friend.

```

For example, the following command downloads all translation files tagged with `aircraft-management` or `vertiport-managment`

```

./translations download aircraft-management vertiport-management

```

For example, the following command uploads all translation files in `packages/libs/resource-overview/`

```

./translations upload packages/libs/resource-overview/

```

## Upgrading the design-library-react dependency

The current design library setup with the theme provider requires upgrading the @volocopter/design-library-react dependency in each module simultaneously.
To make the process easier than editing each individual package.json file, a simple yarn command can be used.

`yarn up @volocopter/design-library-react@VERSION`

Execute this command in the root directory of the project.

Example: `yarn up @volocopter/design-library-react@14.0.3`

## Adding new feature flags

All feature identifiers are specified in [volocopters flagsmith instance](https://flagsmith.volocloud.org).
To use a feature flag, it must first be configured there and can then be used in voloiq.
How to use the feature flag hooks is described in the [readme of the feature flag package](packages/libs/feature-flags/README.md) (@voloiq/feature-flags).

To prevent unwanted behavior for long-lasting feature flags during a Flagsmith Api outage, each feature flag must also be listed with a [fallback value](https://dev.azure.com/volocopter/devops/_git/devops-voloiq-services-appconfig?path=/configuration/apps/voloiq-ui.yml) in the app configuration of the VoloIQ.

## Further Documentation

-   [CONTRIBUTING](./docs/CONTRIBUTING.md)
-   [IDE Setup](https://confluence.volocopter.org/display/VIQ/How+to+set+up+Visual+Studio+Code)
-   [Testing](./docs/testing.md)
-   [RBAC](./docs/rbac.md)
-   [Publishing a library (locally)](./docs/lib_publish.md)

```

```

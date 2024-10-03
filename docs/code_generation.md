# Code Generation

We use [orval](https://github.com/anymaniax/orval) to generate typings based on our OAS contracts stored in the [voloiq-openapi-schemas](https://dev.azure.com/volocopter/voloiq/_git/voloiq-openapi-schemas) repository. Each package contains a `generate:code` script in their root `package.json` file which makes use of the `generate-service` command exposed by the `service` library.

## Usage of the `generate-service` command

This global command can be used in all packages and allows you to generate code based on an OAS yaml file. By default, the command assumes the OAS lives in the [voloiq-openapi-schemas](https://dev.azure.com/volocopter/voloiq/_git/voloiq-openapi-schemas) repository and will be fetched remotely.

### Fetching an OAS remotely

`yarn generate-service -n logbook`  
Will fetch the file `logbook.yaml` in the [voloiq-openapi-schemas](https://dev.azure.com/volocopter/voloiq/_git/voloiq-openapi-schemas) repository under `logbook/logbook.yaml`.

### Fetching an OAS remotely with a specific version

`yarn generate-service -n logbook -v v2`  
Will fetch the file `logbook_v2.yaml` in the [voloiq-openapi-schemas](https://dev.azure.com/volocopter/voloiq/_git/voloiq-openapi-schemas) repository under `logbook/logbook_v2.yaml`.

### Fetching an OAS locally

`yarn generate-service -n logbook -s ./logbook.yaml`  
Will use the local file `./logbook.yaml`.

## How are the OAS fetched remotely

Locally, HTTP requests are made to the Azure DevOps REST APIs with the Azure DevOps token provided in the root `.env` file. In the pipeline, the whole [voloiq-openapi-schemas](https://dev.azure.com/volocopter/voloiq/_git/voloiq-openapi-schemas) repository is cloned at the checkout step in the pipeline templates, therefore no HTTP requests are made.  
See more in the code in [createGenerator.ts](../packages/libs/service/src/generator/createGenerator.ts).

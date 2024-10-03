# Run tests locally

In order to run the Battery Management E2E journey tests locally, you need to:

-   Open two terminals and run:
    -   `docker compose up` in the root folder of the battery-management backend branch to start backend services
    -   `npx cypress open` in `/packages/mods/battery-management` to launch the Cypress test runner
-   Click on the test you want to start or click `run all`

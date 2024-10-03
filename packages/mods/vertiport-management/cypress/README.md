# Run tests locally

In order to run the Vertiport Management E2E journey tests locally, you need to:

-   Open two terminals and run:
    -   `docker compose up` in the root folder of the vertiport-management backend branch to start backend services
    -   `yarn cypress:open` in `/packages/mods/vertiport-management` to launch the Cypress test runner
-   Click on the test you want to start or click `run all`

If you are missing some libraries:

-   apt-get install libatk-bridge2.0-0
-   sudo apt-get install libnss3
-   apt install libgtk-3-0
-   sudo apt install libgbm-dev

Support for WSL2: https://docs.cypress.io/guides/references/advanced-installation#Windows-Subsystem-for-Linux

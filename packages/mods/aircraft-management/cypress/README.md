# Run tests locally
In order to run the AIRCRAFT Management e2e journey tests locally, you need to:
- Open two terminals and run:
  - `docker-compose up postgres aircraft_mgmt app` in the root folder to start the frontend and its backend services
  - `yarn cypress:open` in `/packages/mods/resources` to launch the Cypress test runner
- Click on the test you want to run
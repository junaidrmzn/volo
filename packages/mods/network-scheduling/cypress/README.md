# Run tests locally
In order to run the Network Scheduling Management e2e journey tests locally, you need to:
- Open two terminals and run:
  - `docker-compose up app` in the root folder to start the frontend and its backend services
  - `yarn cypress:open` in `/packages/mods/network-scheduling` to launch the Cypress test runner
- Click on the test you want to run
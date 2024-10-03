# Run tests locally

In order to run the Commercial Scheduling E2E tests locally, you need to:

-   Run:
    -   `docker-compose up commercial_scheduling_postgres` in the root folder to start the database
    -   `./gradlew bootRun --args='--spring.profiles.active=local'` in the root folder of the backend project (because the dedicted docker container is running in an infinite loop)
    -   `yarn start:voloiq` in `/packages/mods/commercial-scheduling` to lauchen the frontend
    -   `yarn cypress:open` in `/packages/mods/commercial-scheduling` to launch the Cypress test runner
-   Click on the test you want to run

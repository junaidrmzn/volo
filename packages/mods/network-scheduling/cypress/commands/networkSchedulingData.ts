export const resetNetworkSchedulingDatabase = () => {
    cy.exec(
        `echo "TRUNCATE TABLE event CASCADE" | docker exec -i $(docker ps -f name=network_scheduling_postgres -q) psql -U postgres -d networkscheduling -p 5442`
    );
};

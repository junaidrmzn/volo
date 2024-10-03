import { Connection, anyConnection } from "@voloiq/commercial-scheduling-api/v1";
import { Route } from "@voloiq/routing";
import { ConnectionOverview } from "../../src/features/connection/ConnectionOverview";
import { getConnectionInterceptor, getRegionsInterceptor } from "../interceptors";
import { CypressServiceProvider } from "./CypressResources";

type SetupConnectionInterceptorsOptions = {
    connection?: Connection;
};

export const mountConnectionOverview = () => {
    cy.mount(
        <CypressServiceProvider initialEntries={["/overview"]}>
            <Route path="overview/*" element={<ConnectionOverview />} />
        </CypressServiceProvider>
    );
};

export const setupConnectionInterceptors = (options: SetupConnectionInterceptorsOptions = {}) => {
    const { connection = anyConnection() } = options;

    getRegionsInterceptor();
    getConnectionInterceptor(connection);
};

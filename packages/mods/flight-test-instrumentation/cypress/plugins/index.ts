// pg-native has to be explicitely listed in the dependencies otherwise an error arrises
import { Pool } from "pg";

const pool = new Pool({
    host: "localhost",
    port: 6543,
    user: "postgres",
    password: "postgres",
    database: "postgres_fti",
});

const setup = (on: Cypress.PluginEvents) => {
    on("task", {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        query: (value: { query: string; values?: any }) => {
            const { query, values } = value;
            return pool.query(query, values);
        },
    });
};

// eslint-disable-next-line import/no-default-export
export default setup;

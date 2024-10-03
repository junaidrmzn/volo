import { addBatteries } from "./addBatteries";
import { addEsuTypes } from "./addEsuTypes";
import { addLocations } from "./addLocations";
import { addVtolTypes } from "./addVtolTypes";
import { resetBatteryManagementDatabase } from "./resetBatteryManagementDatabase";

declare global {
    namespace Cypress {
        // eslint-disable-next-line prefer-type-alias/prefer-type-alias
        interface Chainable {
            resetBatteryManagementDatabase(): Chainable;
            addVtolTypes(): Chainable;
            addEsuTypes(): Chainable;
            addBatteries(): Chainable;
            addLocations(): Chainable;
        }
    }
}

Cypress.Commands.add("resetBatteryManagementDatabase", resetBatteryManagementDatabase);
Cypress.Commands.add("addVtolTypes", addVtolTypes);
Cypress.Commands.add("addEsuTypes", addEsuTypes);
Cypress.Commands.add("addBatteries", addBatteries);
Cypress.Commands.add("addLocations", addLocations);

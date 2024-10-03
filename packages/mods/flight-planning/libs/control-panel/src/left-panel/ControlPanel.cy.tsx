import { ControlPanel } from "./ControlPanel";
import { routeOption, routes, waypoints } from "./defaultControlPanelProps";

describe("Flight Planning Control Panel", () => {
    it("User can edit waypoints", () => {
        cy.mount(<ControlPanel waypoints={waypoints} routeOption={routeOption} routes={routes} />);

        // Implement test here
    });
});

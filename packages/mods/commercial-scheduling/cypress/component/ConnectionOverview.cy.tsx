import { anyConnection } from "@voloiq/commercial-scheduling-api/v1";
import { connectionOverview } from "../page-objects";
import { mountConnectionOverview, setupConnectionInterceptors } from "../resources/ConnectionCypressResources";

describe("ConnectionOverview", () => {
    const name = "Connection";

    it("render connection overview", () => {
        setupConnectionInterceptors({ connection: anyConnection({ name }) });

        mountConnectionOverview();

        connectionOverview.findHeading().should("be.visible");
        connectionOverview.findAddButton().should("be.visible");
        connectionOverview.findListItem(name).should("be.visible");
    });
});

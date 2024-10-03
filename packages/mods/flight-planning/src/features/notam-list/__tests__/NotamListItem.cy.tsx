import { Feature } from "@voloiq/flight-planning-api/v1";
import { Sidebar } from "../../../components";
import { CypressAppShellWithMemoryRouter } from "../../../testing/TestWrapper";
import { mockedBaseUrl } from "../../../testing/url";
import { NotamListItem } from "../NotamListItem";

const mockNotam: Feature = {
    type: "Feature",
    geometry: {
        type: "GeometryCollection",
        geometries: [
            {
                type: "Point",
                coordinates: [12.5, 41.95],
            },
        ],
    },
    properties: {
        lon: 16.2667,
        lat: 39.9333,
        text: "OPERATIONAL COORDINATION ASSURED",
        type: "N",
        year: 2023,
        qcode: "QSCXX",
        scope: "E",
        issued: "2023-09-01T12:53:00Z",
        number: 4834,
        radius: 243,
        series: "M",
        purpose: "BO",
        traffic: "IV",
        location: "LIRR",
        metadata: {
            geometrySources: ["point_and_radius"],
            lastUpdateTimestamp: "2023-10-20T11:21:57Z",
        },
        schedule: "SAT AND SUN H24",
        maximumFL: 999,
        minimumFL: 0,
        routeOptionId: 6,
        affectedFIR: "LIXX",
        countryCode: "ITA",
        effectiveEnd: "2023-10-28T00:00:00Z",
        publisherNOF: "LIIC",
        effectiveStart: "2023-09-03T00:00:00Z",
        externalId: "",
        createdAt: "2023-10-27T11:18:51.857582Z",
    },
};

const TestComponent = () => {
    return (
        <CypressAppShellWithMemoryRouter
            baseUrl={mockedBaseUrl}
            initialEntries={["/route-options/34/map/notams"]}
            path="/route-options/:routeOptionId/map/notams"
        >
            <Sidebar>
                <NotamListItem notamFeature={mockNotam} />
            </Sidebar>
        </CypressAppShellWithMemoryRouter>
    );
};

describe("Notam List Item", () => {
    it("renders the Notam text", () => {
        cy.mount(<TestComponent />);
        cy.findByText("OPERATIONAL COORDINATION ASSURED").should("be.visible");
    });

    it("renders the effectiveStart and effectiveEnd", () => {
        cy.mount(<TestComponent />);
        const dateFormatter = new Intl.DateTimeFormat("en", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        const formattedEffectiveStart = dateFormatter.format(new Date("2023-09-03T00:00:00Z"));
        const formattedEffectiveEnd = dateFormatter.format(new Date("2023-10-28T00:00:00Z"));

        cy.findByText(formattedEffectiveStart).should("be.visible");
        cy.findByText(formattedEffectiveEnd).should("be.visible");
    });

    it("renders the schedule", () => {
        cy.mount(<TestComponent />);
        cy.findByText("SAT AND SUN H24").should("be.visible");
    });
});

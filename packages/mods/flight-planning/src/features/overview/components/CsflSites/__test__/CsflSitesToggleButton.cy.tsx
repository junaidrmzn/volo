import { Box, List, VStack } from "@volocopter/design-library-react";
import { Route, anyRoute } from "@voloiq/flight-planning-api/v1";
import { Checkbox } from "../../../../../../cypress/selectors";
import { CypressAppShell, CypressServiceProvider } from "../../../../../testing/TestWrapper";
import { mockedBaseUrl } from "../../../../../testing/url";
import {
    makeGetCsflSitesInterceptor,
    makeGetSelectedCsflSitesInterceptor,
    makePostSelectedCsflSitesInterceptor,
} from "../../../../__mocks__/cypress";
import { CsflSitesToggleButton } from "../CsflSitesToggleButton";

const mockRoute = anyRoute();

type TestComponentProps = { showCsflSites?: boolean; route?: Route };

const TestComponent = (props: TestComponentProps) => {
    const { showCsflSites = false, route } = props;
    return (
        <CypressAppShell>
            <CypressServiceProvider baseUrl={mockedBaseUrl}>
                <Box
                    flexDirection="column"
                    bgColor="white"
                    pos="absolute"
                    top={28}
                    right={24}
                    width="300px"
                    height="420px"
                    alignItems="normal"
                    overflow="hidden"
                    boxShadow="lg"
                    borderRadius="lg"
                >
                    <VStack alignItems="start" p={3} flex="0 1 auto">
                        <List width="100%">
                            <CsflSitesToggleButton
                                showCsflSites={showCsflSites}
                                handleShowCsflSites={cy.stub().as("mockedHandleShowCsflSites")}
                                selectedRoute={route}
                            />
                        </List>
                    </VStack>
                </Box>
            </CypressServiceProvider>
        </CypressAppShell>
    );
};

beforeEach(() => {
    makeGetCsflSitesInterceptor();
});

describe("Csfl Sites Toggle", () => {
    it("should not show csfl sites", () => {
        cy.mount(<TestComponent />);
        cy.findByTestId("switch-show-csfl-sites").click();
        cy.get("@mockedHandleShowCsflSites").should("not.be.calledOnce");
    });

    it("should show csfl sites", () => {
        cy.mount(<TestComponent route={mockRoute} />);
        cy.findByTestId("switch-show-csfl-sites").click();
        cy.get("@mockedHandleShowCsflSites").should("be.calledOnce");
    });

    it("should able to unselect all csfl sites", () => {
        makeGetSelectedCsflSitesInterceptor([]);
        cy.mount(<TestComponent route={mockRoute} />);

        cy.findByTestId("switch-show-csfl-sites").click();
        cy.findByTestId("switch-show-csfl-sites").should("not.be.disabled");
        cy.get("@mockedHandleShowCsflSites").should("be.calledOnce");

        Checkbox.findByName("Site 1").should("not.be.checked");
        Checkbox.findByName("Site 2").should("not.be.checked");
        Checkbox.findByName("Site 3").should("not.be.checked");

        cy.findByTestId("form-modal-heading").should("exist");

        makePostSelectedCsflSitesInterceptor();
        cy.findByRole("button", { name: /save/i }).click();
        cy.wait("@postSelectedCsflSites").its("response.statusCode").should("equal", 200);
        cy.findByTestId("form-modal-heading").should("not.exist");
    });

    it("should able to select one csfl sites", () => {
        makeGetSelectedCsflSitesInterceptor([]);
        cy.mount(<TestComponent route={mockRoute} />);

        cy.findByTestId("switch-show-csfl-sites").click();
        cy.findByTestId("switch-show-csfl-sites").should("not.be.disabled");
        cy.get("@mockedHandleShowCsflSites").should("be.calledOnce");

        Checkbox.findByName("Site 1").click({ force: true });

        Checkbox.findByName("Site 1").should("be.checked");
        Checkbox.findByName("Site 2").should("not.be.checked");
        Checkbox.findByName("Site 3").should("not.be.checked");

        cy.findByTestId("form-modal-heading").should("exist");

        makePostSelectedCsflSitesInterceptor();
        cy.findByRole("button", { name: /save/i }).click();
        cy.wait("@postSelectedCsflSites").its("response.statusCode").should("equal", 200);
        cy.findByTestId("form-modal-heading").should("not.exist");
    });

    it("should able to select all csfl sites", () => {
        makeGetSelectedCsflSitesInterceptor([]);
        cy.mount(<TestComponent route={mockRoute} />);

        cy.findByTestId("switch-show-csfl-sites").click();
        cy.findByTestId("switch-show-csfl-sites").should("not.be.disabled");
        cy.get("@mockedHandleShowCsflSites").should("be.calledOnce");

        Checkbox.findByName("Site 1").click({ force: true });
        Checkbox.findByName("Site 2").click({ force: true });
        Checkbox.findByName("Site 3").click({ force: true });

        Checkbox.findByName("Site 1").should("be.checked");
        Checkbox.findByName("Site 2").should("be.checked");
        Checkbox.findByName("Site 3").should("be.checked");

        cy.findByTestId("form-modal-heading").should("exist");

        makePostSelectedCsflSitesInterceptor();
        cy.findByRole("button", { name: /save/i }).click();
        cy.wait("@postSelectedCsflSites").its("response.statusCode").should("equal", 200);
        cy.findByTestId("form-modal-heading").should("not.exist");
    });

    it("should close select csfl sites modal", () => {
        cy.mount(<TestComponent route={mockRoute} />);

        cy.findByTestId("switch-show-csfl-sites").click();
        cy.findByTestId("switch-show-csfl-sites").should("not.be.disabled");
        cy.get("@mockedHandleShowCsflSites").should("be.calledOnce");

        cy.findByTestId("form-modal-heading").should("exist");
        cy.findByRole("button", { name: /cancel/i }).click();
        cy.findByTestId("form-modal-heading").should("not.exist");
    });

    it("should display deleted badge if csfl-site has been deleted", () => {
        cy.mount(<TestComponent route={mockRoute} />);

        cy.findByTestId("switch-show-csfl-sites").click();
        cy.findAllByTestId("checkbox-listItem").first().should("include.text", "Deleted");
    });
});

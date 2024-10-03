import { Box } from "@volocopter/design-library-react";
import { ScrollableContainer } from "./ScrollableContainer";
import { useOverflowDirections } from "./useOverflowDirections";

describe("Scrollable Container", () => {
    it("should not render any buttons if its children does not overflow parent", () => {
        const TestComponent = () => {
            const { overflowDirections, ref } = useOverflowDirections();

            return (
                <ScrollableContainer overflowDirections={overflowDirections} scrollContainerRef={ref}>
                    <Box>Hello World</Box>
                </ScrollableContainer>
            );
        };
        cy.mount(<TestComponent />);

        cy.findByText("Hello World").should("be.visible");
        cy.findByRole("Scroll right").should("not.exist");
        cy.findByRole("Scroll left").should("not.exist");
    });

    it("should make children scrollable by adding buttons if children overflows parent", () => {
        const TestComponent = () => {
            const { overflowDirections, ref } = useOverflowDirections();

            return (
                <Box width="300px">
                    <ScrollableContainer overflowDirections={overflowDirections} scrollContainerRef={ref}>
                        <Box whiteSpace="nowrap" fontSize="sm" lineHeight="double" p={3}>
                            Home
                        </Box>
                        <Box whiteSpace="nowrap" fontSize="sm" lineHeight="double" p={3}>
                            About
                        </Box>
                        <Box whiteSpace="nowrap" fontSize="sm" lineHeight="double" p={3}>
                            Contact Us
                        </Box>
                        <Box whiteSpace="nowrap" fontSize="sm" lineHeight="double" p={3}>
                            Imprint
                        </Box>
                        <Box whiteSpace="nowrap" fontSize="sm" lineHeight="double" p={3}>
                            Data Protection
                        </Box>
                    </ScrollableContainer>
                </Box>
            );
        };
        cy.mount(<TestComponent />);

        cy.findByText("Home").should("be.visible");
        cy.findByText("Data Protection").should("not.be.visible");

        cy.findByRole("button", { name: "Scroll left" }).should("not.exist");
        cy.findByRole("button", { name: "Scroll right" }).click();
        cy.findByText("Home").should("not.be.visible");

        cy.findByRole("button", { name: "Scroll right" }).click();
        cy.findByText("Data Protection").should("be.visible");

        cy.findByRole("button", { name: "Scroll right" }).should("not.exist");
        cy.findByRole("button", { name: "Scroll left" }).click();
        cy.findByRole("button", { name: "Scroll left" }).click();

        cy.findByText("Home").should("be.visible");
        cy.findByText("Data Protection").should("not.be.visible");
    });

    it("should scroll initially selected child into view", () => {
        const TestComponent = () => {
            const { overflowDirections, ref } = useOverflowDirections();

            return (
                <Box width="300px">
                    <ScrollableContainer overflowDirections={overflowDirections} scrollContainerRef={ref}>
                        <Box whiteSpace="nowrap" fontSize="sm" lineHeight="double" p={3}>
                            Home
                        </Box>
                        <Box whiteSpace="nowrap" fontSize="sm" lineHeight="double" p={3}>
                            About
                        </Box>
                        <Box whiteSpace="nowrap" fontSize="sm" lineHeight="double" p={3}>
                            Contact Us
                        </Box>
                        <Box whiteSpace="nowrap" fontSize="sm" lineHeight="double" p={3}>
                            Imprint
                        </Box>
                        <Box whiteSpace="nowrap" fontSize="sm" lineHeight="double" p={3} aria-selected="true">
                            Data Protection
                        </Box>
                    </ScrollableContainer>
                </Box>
            );
        };
        cy.mount(<TestComponent />);

        cy.findByText("Home").should("not.be.visible");
        cy.findByText("Data Protection").should("be.visible");
    });

    it("should scroll selected child back into view when using the scroll button", () => {
        const TestComponent = () => {
            const { overflowDirections, ref } = useOverflowDirections();

            return (
                <Box width="300px">
                    <ScrollableContainer overflowDirections={overflowDirections} scrollContainerRef={ref}>
                        <Box whiteSpace="nowrap" fontSize="sm" lineHeight="double" p={3}>
                            Home
                        </Box>
                        <Box whiteSpace="nowrap" fontSize="sm" lineHeight="double" p={3}>
                            About
                        </Box>
                        <Box whiteSpace="nowrap" fontSize="sm" lineHeight="double" p={3}>
                            Contact Us
                        </Box>
                        <Box whiteSpace="nowrap" fontSize="sm" lineHeight="double" p={3}>
                            Imprint
                        </Box>
                        <Box whiteSpace="nowrap" fontSize="sm" lineHeight="double" p={3} aria-selected="true">
                            Data Protection
                        </Box>
                    </ScrollableContainer>
                </Box>
            );
        };
        cy.mount(<TestComponent />);

        cy.findByText("Home").should("not.be.visible");
        cy.findByText("Data Protection").should("be.visible");

        cy.findByRole("button", { name: "Scroll left" }).click();
        cy.findByRole("button", { name: "Scroll left" }).click();

        cy.findByText("Home").should("be.visible");
        cy.findByText("Data Protection").should("not.be.visible");
    });
});

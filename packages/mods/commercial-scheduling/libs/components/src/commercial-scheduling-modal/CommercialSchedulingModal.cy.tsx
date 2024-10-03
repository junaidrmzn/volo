import { Button, useDisclosure } from "@volocopter/design-library-react";
import { CommercialSchedulingModal } from "./CommercialSchedulingModal";

const TestCommercialSchedulingModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button variant="primary" onClick={onOpen}>
                Open Modal
            </Button>
            <CommercialSchedulingModal heading="Heading" subHeading="SubHeading" isOpen={isOpen} onClose={onClose}>
                Modal Body
            </CommercialSchedulingModal>
        </>
    );
};

describe("CommercialSchedulingModal", () => {
    it("render commercial scheduling modal", () => {
        cy.mount(<TestCommercialSchedulingModal />);

        cy.findByRole("button", { name: /open modal/i }).click();
        cy.findByText("Heading").should("be.visible");
        cy.findByLabelText("minus").should("be.visible");
        cy.findByText("SubHeading").should("be.visible");
        cy.findByText("Modal Body").should("be.visible");
    });

    it("close commercial scheduling modal", () => {
        cy.mount(<TestCommercialSchedulingModal />);

        cy.findByRole("button", { name: /open modal/i }).click();

        cy.findByRole("button", { name: /close/i }).click();
        cy.findByText("Modal Body").should("not.exist");
    });
});

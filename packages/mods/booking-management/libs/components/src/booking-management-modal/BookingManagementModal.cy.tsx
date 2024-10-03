import { Button, useDisclosure } from "@volocopter/design-library-react";
import { BookingManagementModal } from "./BookingManagementModal";

const TestBookingManagementModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button variant="primary" onClick={onOpen}>
                Open Modal
            </Button>
            <BookingManagementModal heading="Heading" subHeading="SubHeading" isOpen={isOpen} onClose={onClose}>
                Modal Body
            </BookingManagementModal>
        </>
    );
};

describe("BookingManagementModal", () => {
    it("render booking management modal", () => {
        cy.mount(<TestBookingManagementModal />);

        cy.findByRole("button", { name: /open modal/i }).click();
        cy.findByText("Heading").should("be.visible");
        cy.findByLabelText("minus").should("be.visible");
        cy.findByText("SubHeading").should("be.visible");
        cy.findByText("Modal Body").should("be.visible");
    });

    it("close booking management modal", () => {
        cy.mount(<TestBookingManagementModal />);

        cy.findByRole("button", { name: /open modal/i }).click();

        cy.findByRole("button", { name: /close/i }).click();
        cy.findByText("Modal Body").should("not.exist");
    });
});

import { Text } from "@volocopter/design-library-react";
import { BookingCard } from "./BookingCard";

const BookingCardTest = (
    <BookingCard title="Booking Card">
        <Text>Text</Text>
    </BookingCard>
);

describe("BookingCard", () => {
    it("render booking card", () => {
        cy.mount(BookingCardTest);
        cy.findByText("Booking Card").should("be.visible");
        cy.findByText("Text").should("be.visible");
    });
});

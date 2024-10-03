import { Text } from "@volocopter/design-library-react";
import { BookingManagementList } from "./BookingManagementList";

const TestBookingManagementList = () => {
    const list = ["list item 1"];

    return (
        <BookingManagementList list={list}>
            <Text>List Title</Text>
        </BookingManagementList>
    );
};

describe("BookingManagementList", () => {
    it("render booking management list", () => {
        cy.mount(<TestBookingManagementList />);

        cy.findByText("List Title").should("be.visible");
        cy.findByText("list item 1").should("be.visible");
    });
});

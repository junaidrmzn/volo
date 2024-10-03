import { TimeZoneProvider } from "@voloiq/date-time";
import { DateTimeDisplayWithLabel, DateTimeDisplayWithLabelProps } from "./DateTimeDisplayWithLabel";

const timeZone = "Asia/Karachi";
const value = "2024-01-01T00:00:00.000Z";

const TestDateTimeDisplayWithLabel = (props: DateTimeDisplayWithLabelProps) => {
    return (
        <TimeZoneProvider timeZone={timeZone}>
            <DateTimeDisplayWithLabel {...props} />
        </TimeZoneProvider>
    );
};

describe("DateTimeDisplayWithLabel", () => {
    it("render", () => {
        cy.mount(<TestDateTimeDisplayWithLabel value={value} />);
        cy.findByText("2024-01-01 05:00").should("be.visible");
    });

    it("render with label", () => {
        cy.mount(<TestDateTimeDisplayWithLabel label="Label" value={value} />);
        cy.findByText(/label/i).should("be.visible");
        cy.findByText("2024-01-01 05:00").should("be.visible");
    });
});

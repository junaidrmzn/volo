import { TimeZoneProvider } from "@voloiq/date-time";
import { DateTimeRangeDisplay, DateTimeRangeDisplayProps } from "./DateTimeRangeDisplay";

const timeZone = "Asia/Karachi";
const startDate = "2024-01-01T00:00:00.000Z";
const endDate = "2024-01-08T00:00:00.000Z";

const TestDateTimeRangeDisplay = (props: DateTimeRangeDisplayProps) => {
    return (
        <TimeZoneProvider timeZone={timeZone}>
            <DateTimeRangeDisplay {...props} />
        </TimeZoneProvider>
    );
};

describe("DateTimeRangeDisplay", () => {
    it("render", () => {
        cy.mount(<TestDateTimeRangeDisplay startDate={startDate} endDate={endDate} />);
        cy.findByText("2024-01-01 05:00").should("be.visible");
        cy.findByLabelText("minus").should("be.visible");
        cy.findByText("2024-01-08 05:00").should("be.visible");
    });

    it("render with label", () => {
        cy.mount(<TestDateTimeRangeDisplay label="Label" startDate={startDate} endDate={endDate} />);
        cy.findByText(/label:/i).should("be.visible");
        cy.findByText("2024-01-01 05:00").should("be.visible");
        cy.findByLabelText("minus").should("be.visible");
        cy.findByText("2024-01-08 05:00").should("be.visible");
    });
});

import type { BoxProps } from "@volocopter/design-library-react";
import { Box, ThemeProvider } from "@volocopter/design-library-react";
import { add, format, startOfToday } from "date-fns";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { I18nProvider } from "@voloiq/i18n";
import type { TimeRange, TimeSchedulerTranslations } from "../../src";
import {
    TimeScheduler,
    TimeSchedulerRow,
    TimeSchedulerRowContent,
    TimeSchedulerRowItem,
    TimeSchedulerRowLabel,
} from "../../src";
import { startOfQuarterHour } from "../../src/time-utils/quarterHour";
import { isInViewport, isNotInViewport } from "../support/assertions";

const ItemBox = (props: BoxProps) => (
    <Box bg="gray.200" borderRadius="sm" p={1} whiteSpace="nowrap" width="100%" color="darkBlue.900" {...props} />
);

const translations: TimeSchedulerTranslations = {
    scrollLeftButtonLabel: "Scroll left",
    scrollRightButtonLabel: "Scroll right",
    zoomInButtonLabel: "Zoom in",
    zoomOutButtonLabel: "Zoom out",
};

const renderExpandedItems = (items: []) => (
    <Box bg="gray.300" borderRadius="sm" p={1} whiteSpace="nowrap" width="100%" color="darkBlue.900">
        Expanded Items {items.length}
    </Box>
);

const today = startOfToday();

describe("When a user uses the time scheduler", () => {
    beforeEach(() => {
        cy.mount(
            <LocalFeatureFlagsProvider configurationOverride={{ timeGridStickyHeader: { enabled: false } }}>
                <ThemeProvider>
                    <I18nProvider>
                        <TimeScheduler
                            onRangeUpdate={(range: TimeRange, previousRange: TimeRange) =>
                                // eslint-disable-next-line no-console
                                console.log({ range, previousRange })
                            }
                            translations={translations}
                            config={{
                                renderExpandedItems,
                            }}
                        >
                            <TimeSchedulerRow>
                                <TimeSchedulerRowLabel>VoloCity</TimeSchedulerRowLabel>
                                <TimeSchedulerRowContent>
                                    <TimeSchedulerRowItem
                                        id="1"
                                        startDate={add(new Date(), { minutes: 5 })}
                                        endDate={add(new Date(), { minutes: 25 })}
                                    >
                                        <ItemBox>Trade Fair</ItemBox>
                                    </TimeSchedulerRowItem>
                                    <TimeSchedulerRowItem
                                        id="2"
                                        startDate={add(new Date(), { minutes: 11 })}
                                        endDate={add(new Date(), { minutes: 20 })}
                                    >
                                        <ItemBox>Exhibition</ItemBox>
                                    </TimeSchedulerRowItem>
                                    <TimeSchedulerRowItem
                                        id="3"
                                        startDate={new Date()}
                                        endDate={add(new Date(), { minutes: 10 })}
                                    >
                                        <ItemBox>Demo Flight</ItemBox>
                                    </TimeSchedulerRowItem>
                                </TimeSchedulerRowContent>
                            </TimeSchedulerRow>
                        </TimeScheduler>
                    </I18nProvider>
                </ThemeProvider>
            </LocalFeatureFlagsProvider>
        );
    });
    it("then they can see the row label", () => {
        cy.findByText("VoloCity");
    });

    it("then they can see row items", () => {
        cy.findByText("Trade Fair");
        cy.findByText("Exhibition");
        cy.findByText("Demo Flight");
    });

    it("then they can scroll to the left and to the right", () => {
        const currentQuarterHourLabelText = format(startOfQuarterHour(new Date()), "HH:mm");
        cy.findAllByText(currentQuarterHourLabelText).first().should("be.visible");

        cy.findByRole("button", { name: "Scroll right" }).click().click().click().click().click();

        cy.findAllByText(currentQuarterHourLabelText).first().should("not.be.visible");

        cy.findByRole("button", { name: "Scroll left" }).click().click().click().click().click();
        cy.findAllByText(currentQuarterHourLabelText).first().should("be.visible");
    });

    it("then they can zoom out and the displayed unit will switch from hours to days", () => {
        const currentDayLabelText = format(today, "EEE dd.LL.yy");
        cy.findByText(currentDayLabelText).should("be.visible");

        cy.findByRole("button", { name: "Zoom out" })
            .click()
            .click()
            .click()
            .click()
            .click()
            .click()
            .click()
            .click()
            .click();

        const currentMonthLabelText = format(today, "MMM yy");
        cy.findByText(currentMonthLabelText).should("be.visible");
    });

    it("then they can zoom out and too small items will be grouped and expanded", () => {
        cy.findByRole("button", { name: "Zoom out" }).click().click().click().click().click().click().click().click();
        cy.findByText("Expanded Items 2").should("be.visible");
    });
});

describe("When a user uses the time scheduler with groups", () => {
    beforeEach(() => {
        cy.mount(
            <LocalFeatureFlagsProvider configurationOverride={{ timeGridStickyHeader: { enabled: false } }}>
                <ThemeProvider>
                    <I18nProvider>
                        <TimeScheduler translations={translations}>
                            <TimeSchedulerRow>
                                <TimeSchedulerRowLabel>
                                    <Box p={1} background="monochrome.100" boxSize="full">
                                        VoloCity
                                    </Box>
                                </TimeSchedulerRowLabel>
                                <TimeSchedulerRowContent>
                                    <TimeSchedulerRowItem
                                        id="1"
                                        startDate={add(new Date(), { hours: 1 })}
                                        endDate={add(new Date(), { hours: 2 })}
                                        group="blue"
                                    >
                                        <ItemBox bg="darkBlue.200">Item</ItemBox>
                                    </TimeSchedulerRowItem>
                                    <TimeSchedulerRowItem
                                        id="2"
                                        startDate={add(new Date(), { hours: 3 })}
                                        endDate={add(new Date(), { hours: 4 })}
                                        group="coral"
                                    >
                                        <ItemBox bg="coral.200">Item</ItemBox>
                                    </TimeSchedulerRowItem>
                                </TimeSchedulerRowContent>
                            </TimeSchedulerRow>
                        </TimeScheduler>
                    </I18nProvider>
                </ThemeProvider>
            </LocalFeatureFlagsProvider>
        );
    });
    it("then they can see the different groups in different rows", () => {
        cy.findAllByText("Item").should((items) => {
            const [item1, item2] = items;
            expect(item1?.getBoundingClientRect().top).to.not.eql(
                item2?.getBoundingClientRect().top,
                "item 1 should not be in the same row with item 2"
            );
        });
    });
});

describe("When a user uses the time scheduler with persistence", () => {
    const mountTimeScheduler = () =>
        cy.mount(
            <LocalFeatureFlagsProvider configurationOverride={{ timeGridStickyHeader: { enabled: false } }}>
                <ThemeProvider>
                    <I18nProvider>
                        <TimeScheduler
                            translations={translations}
                            config={{
                                persistSettings: true,
                                identifier: "persistence-test",
                                renderExpandedItems,
                            }}
                        >
                            <TimeSchedulerRow>
                                <TimeSchedulerRowLabel>
                                    <Box p={1} background="monochrome.100" boxSize="full">
                                        VoloCity
                                    </Box>
                                </TimeSchedulerRowLabel>
                                <TimeSchedulerRowContent>
                                    <TimeSchedulerRowItem
                                        id="1"
                                        startDate={add(new Date(), { minutes: 5 })}
                                        endDate={add(new Date(), { minutes: 25 })}
                                    >
                                        <ItemBox>Trade Fair</ItemBox>
                                    </TimeSchedulerRowItem>
                                    <TimeSchedulerRowItem
                                        id="2"
                                        startDate={add(new Date(), { minutes: 11 })}
                                        endDate={add(new Date(), { minutes: 20 })}
                                    >
                                        <ItemBox>Exhibition</ItemBox>
                                    </TimeSchedulerRowItem>
                                    <TimeSchedulerRowItem
                                        id="3"
                                        startDate={new Date()}
                                        endDate={add(new Date(), { minutes: 10 })}
                                    >
                                        <ItemBox>Demo Flight</ItemBox>
                                    </TimeSchedulerRowItem>
                                </TimeSchedulerRowContent>
                            </TimeSchedulerRow>
                        </TimeScheduler>
                    </I18nProvider>
                </ThemeProvider>
            </LocalFeatureFlagsProvider>
        );

    const reloadPage = mountTimeScheduler;

    beforeEach(() => {
        cy.clearLocalStorage();
        mountTimeScheduler();
    });

    it("then their zoom level will be persisted on page reload", () => {
        const currentDayLabelText = format(today, "EEE dd.LL.yy");
        cy.findByText(currentDayLabelText).should("be.visible");

        cy.findByRole("button", { name: "Zoom out" })
            .click()
            .click()
            .click()
            .click()
            .click()
            .click()
            .click()
            .click()
            .click();

        const currentMonthLabelText = format(today, "MMM yy");
        cy.findByText(currentMonthLabelText).should("be.visible");

        reloadPage();
        cy.findByText(currentMonthLabelText).should("be.visible");
    });

    it("then their scroll position will be persisted on page reload", () => {
        cy.findByText("Trade Fair").should("be.visible");
        const currentQuarterHourLabelText = format(startOfQuarterHour(new Date()), "HH:mm");
        cy.findAllByText(currentQuarterHourLabelText).first().should("be.visible");

        cy.findByRole("button", { name: "Scroll right" }).click().click().click().click().click();

        cy.findAllByText(currentQuarterHourLabelText).first().should("not.be.visible");

        reloadPage();
        cy.findAllByText(currentQuarterHourLabelText).first().should("not.be.visible");

        cy.findByRole("button", { name: "Scroll left" }).click().click().click().click().click();
        cy.findAllByText(currentQuarterHourLabelText).first().should("be.visible");

        reloadPage();
        cy.findAllByText(currentQuarterHourLabelText).first().should("be.visible");
    });
});

describe("When a user uses the time scheduler with sticky header", () => {
    beforeEach(() => {
        cy.mount(
            <LocalFeatureFlagsProvider>
                <ThemeProvider>
                    <I18nProvider>
                        <TimeScheduler translations={translations}>
                            {Array.from({ length: 20 }).map((_, rowIndex) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <TimeSchedulerRow key={rowIndex}>
                                    <TimeSchedulerRowLabel>
                                        <Box p={1} background="monochrome.100" boxSize="full" width="100px">
                                            VoloCity {rowIndex}
                                        </Box>
                                    </TimeSchedulerRowLabel>
                                </TimeSchedulerRow>
                            ))}
                        </TimeScheduler>
                    </I18nProvider>
                </ThemeProvider>
            </LocalFeatureFlagsProvider>
        );
    });

    it("then they can see the header all the time", () => {
        const currentDayLabelText = format(today, "EEE dd.LL.yy");
        cy.findByText(currentDayLabelText).then(isInViewport);
        cy.findByText("VoloCity 0").then(isInViewport);
        cy.findByText("VoloCity 19").then(isNotInViewport);

        cy.scrollTo("bottom");
        cy.findByText(currentDayLabelText).then(isInViewport);
        cy.findByText("VoloCity 0").then(isNotInViewport);
        cy.findByText("VoloCity 19").then(isInViewport);
    });
});

describe("When a user loads the time scheduler for the first time", () => {
    beforeEach(() => {
        cy.mount(
            <LocalFeatureFlagsProvider>
                <ThemeProvider>
                    <I18nProvider>
                        <TimeScheduler
                            timelineStartDate={new Date("2022-01-01 09:00:00 AM")}
                            translations={translations}
                        >
                            {Array.from({ length: 20 }).map((_, rowIndex) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <TimeSchedulerRow key={rowIndex}>
                                    <TimeSchedulerRowLabel>
                                        <Box p={1} background="monochrome.100" boxSize="full" width="100px">
                                            VoloCity {rowIndex}
                                        </Box>
                                    </TimeSchedulerRowLabel>
                                </TimeSchedulerRow>
                            ))}
                        </TimeScheduler>
                    </I18nProvider>
                </ThemeProvider>
            </LocalFeatureFlagsProvider>
        );
    });

    it("then they can see the provided initial date when time grid loads", () => {
        const currentDayLabelText = format(new Date("2022-01-01 09:00:00 AM"), "EEE dd.LL.yy");
        cy.findByText(currentDayLabelText).should("be.visible");
    });
});

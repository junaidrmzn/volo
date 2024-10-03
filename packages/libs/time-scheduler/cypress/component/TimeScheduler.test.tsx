import type { BoxProps } from "@volocopter/design-library-react";
import { Box, ThemeProvider } from "@volocopter/design-library-react";
import { add, addDays, format, isAfter, isBefore, parseISO, startOfToday } from "date-fns";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { I18nProvider } from "@voloiq/i18n";
import type { TimeRangeNew, TimeSchedulerTranslationsNew } from "../../src";
import {
    TimeSchedulerNew,
    TimeSchedulerRowContentNew,
    TimeSchedulerRowItemNew,
    TimeSchedulerRowLabelNew,
    TimeSchedulerRowNew,
} from "../../src";
import { startOfQuarterHour } from "../../src/time-utils/quarterHour";
import {
    assertTimeDisplayAndDottedLinesAreOnSameXPosition,
    isInViewport,
    isNotInViewport,
    isOnVerticalTimeIndicator,
} from "../support/assertions";

const ItemBox = (props: BoxProps) => (
    <Box bg="gray.200" borderRadius="sm" p={1} whiteSpace="nowrap" width="100%" color="darkBlue.900" {...props} />
);

const translations: TimeSchedulerTranslationsNew = {
    scrollLeftButtonLabel: "Scroll left",
    scrollRightButtonLabel: "Scroll right",
    zoomInButtonLabel: "Zoom in",
    zoomOutButtonLabel: "Zoom out",
    closeButton: "Close",
    title: "Go To Date",
    go: "Go",
};

const renderExpandedItems = (items: []) => (
    <Box bg="gray.300" borderRadius="sm" p={1} whiteSpace="nowrap" width="100%" color="darkBlue.900">
        Expanded Items {items.length}
    </Box>
);

const scroll = (
    direction: "vertical" | "horizontal",
    amount: number,
    scrollContainer = cy.findByTestId("time-grid-container")
) => {
    if (direction === "horizontal") {
        scrollContainer.scrollTo(amount, 0);
    } else {
        // when scrolling vertically, we need to scroll on the window because the scrollContainer is what's overflowing in this case
        cy.scrollTo(0, amount);
    }
    const wheelEvent = direction === "horizontal" ? { deltaX: amount } : { deltaY: amount };
    scrollContainer.trigger("wheel", { ...wheelEvent, force: true });
};

const zoomOutOneLevel = () =>
    cy
        .findByRole("button", { name: "Zoom out" })
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click()
        .click();

const today = startOfToday();

describe("When a user uses the time scheduler", () => {
    beforeEach(() => {
        cy.mount(
            <LocalFeatureFlagsProvider configurationOverride={{ timeGridStickyHeader: { enabled: false } }}>
                <ThemeProvider>
                    <I18nProvider>
                        <TimeSchedulerNew
                            onRangeUpdate={(range: TimeRangeNew, previousRange: TimeRangeNew) =>
                                // eslint-disable-next-line no-console
                                console.log({ range, previousRange })
                            }
                            translations={translations}
                            config={{
                                renderExpandedItems,
                            }}
                        >
                            <TimeSchedulerRowNew>
                                <TimeSchedulerRowLabelNew>VoloCity</TimeSchedulerRowLabelNew>
                                <TimeSchedulerRowContentNew>
                                    <TimeSchedulerRowItemNew
                                        id="1"
                                        startDate={add(new Date(), { minutes: 5 })}
                                        endDate={add(new Date(), { minutes: 25 })}
                                    >
                                        <ItemBox>Trade Fair</ItemBox>
                                    </TimeSchedulerRowItemNew>
                                    <TimeSchedulerRowItemNew
                                        id="2"
                                        startDate={add(new Date(), { minutes: 11 })}
                                        endDate={add(new Date(), { minutes: 20 })}
                                    >
                                        <ItemBox>Exhibition</ItemBox>
                                    </TimeSchedulerRowItemNew>
                                    <TimeSchedulerRowItemNew
                                        id="3"
                                        startDate={new Date()}
                                        endDate={add(new Date(), { minutes: 10 })}
                                    >
                                        <ItemBox>Demo Flight</ItemBox>
                                    </TimeSchedulerRowItemNew>
                                    <TimeSchedulerRowItemNew
                                        id="4"
                                        startDate={startOfQuarterHour(new Date())}
                                        endDate={startOfQuarterHour(add(new Date(), { hours: 2 }))}
                                    >
                                        <ItemBox>Starts and Ends at the Quarter Hour</ItemBox>
                                    </TimeSchedulerRowItemNew>
                                    <TimeSchedulerRowItemNew
                                        id="5"
                                        startDate={today}
                                        endDate={add(new Date(), { hours: 5 })}
                                    >
                                        <ItemBox>A long event</ItemBox>
                                    </TimeSchedulerRowItemNew>
                                </TimeSchedulerRowContentNew>
                            </TimeSchedulerRowNew>
                        </TimeSchedulerNew>
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

    it("then they can scroll to the left and to the right using the buttons", () => {
        cy.findByText("Exhibition").should("be.visible");

        cy.findByRole("button", { name: "Scroll right" }).click().click().click().click().click();

        cy.findByText("Exhibition").should("not.be.visible");

        cy.findByRole("button", { name: "Scroll left" }).click().click().click().click().click();
        cy.findByText("Exhibition").should("be.visible");
    });

    it("then they can scroll to the left and to the right using the buttons after date range selection", () => {
        cy.contains("button", format(new Date(), "yyyy-MM-dd")).click();

        cy.get(`[aria-label="${format(today, "MMMM d, yyyy")}"]`).click();
        cy.get(`[aria-label="${format(addDays(today, 1), "MMMM d, yyyy")}"]`).click();

        cy.contains("button", "Done").click();

        cy.findByText("A long event").should("be.visible");

        cy.findByRole("button", { name: "Scroll right" }).click().click().click().click().click();

        cy.findByText("A long event").should("not.be.visible");

        cy.findByRole("button", { name: "Scroll left" }).click().click().click().click().click();
        cy.findByText("A long event").should("be.visible");
    });

    it("scroll using the buttons updates date range", () => {
        cy.contains("button", format(new Date(), "yyyy-MM-dd")).should("exist").click();

        cy.get(`[aria-label="${format(today, "MMMM d, yyyy")}"]`).click();
        cy.get(`[aria-label="${format(addDays(today, 2), "MMMM d, yyyy")}"]`).click();
        cy.contains("button", "Done").click();

        cy.findByRole("button", { name: "Scroll right" }).click().click().click().click().click();
        cy.contains("button", format(today, "yyyy-MM-dd")).should("not.exist");
    });

    it("then they can scroll to the left and to the right using the mousewheel", () => {
        cy.findByText("Exhibition").should("be.visible");

        scroll("horizontal", 2000);

        cy.findByText("Exhibition").should("not.be.visible");

        scroll("horizontal", -2000);
        cy.findByText("Exhibition").should("be.visible");
    });

    it("then they can scroll to the left and to the right using the mousewheel after date range selection", () => {
        cy.contains("button", format(new Date(), "yyyy-MM-dd")).click();

        cy.get(`[aria-label="${format(today, "MMMM d, yyyy")}"]`).click();
        cy.get(`[aria-label="${format(addDays(today, 1), "MMMM d, yyyy")}"]`).click();

        cy.contains("button", "Done").click();

        cy.findByText("A long event").should("be.visible");

        cy.findByTestId("time-grid-container").trigger("wheel", { deltaX: 2000, force: true });
        cy.findByText("A long event").should("not.be.visible");

        cy.findByTestId("time-grid-container").trigger("wheel", { deltaX: -2000, force: true });
        cy.findByText("A long event").should("be.visible");
    });

    it("scroll using the mousewheel updates date range", () => {
        cy.contains("button", format(new Date(), "yyyy-MM-dd")).should("exist").click();

        cy.get(`[aria-label="${format(today, "MMMM d, yyyy")}"]`).click();
        cy.get(`[aria-label="${format(addDays(today, 2), "MMMM d, yyyy")}"]`).click();
        cy.contains("button", "Done").click();

        cy.findByTestId("time-grid-container").trigger("wheel", { deltaX: 2000, force: true });
        cy.contains("button", format(today, "yyyy-MM-dd")).should("not.exist");
    });

    it("then they can scroll infinitely to the left even if they scroll very quickly", () => {
        const scrollAmountIndicatingVeryFastScroll = -5000;
        scroll("horizontal", scrollAmountIndicatingVeryFastScroll);
        cy.findAllByTestId("time-display")
            .first()
            .invoke("data", "date")
            .then((firstDate) => {
                scroll("horizontal", scrollAmountIndicatingVeryFastScroll);
                cy.findAllByTestId("time-display")
                    .first()
                    .invoke("data", "date")
                    .then((secondDate) => {
                        expect(isBefore(parseISO(secondDate.toString()), parseISO(firstDate.toString()))).to.eql(
                            true,
                            "Earliest displayed date after scrolling should be before earliest displayed date before scrolling"
                        );
                    });
            });
    });

    it("then they can scroll infinitely to the right even if they scroll very quickly", () => {
        const scrollAmountIndicatingVeryFastScroll = 25_000;
        scroll("horizontal", scrollAmountIndicatingVeryFastScroll);
        cy.findAllByTestId("time-display")
            .last()
            .invoke("data", "date")
            .then((firstDate) => {
                scroll("horizontal", scrollAmountIndicatingVeryFastScroll);
                cy.findAllByTestId("time-display")
                    .last()
                    .invoke("data", "date")
                    .then((secondDate) => {
                        expect(isAfter(parseISO(secondDate.toString()), parseISO(firstDate.toString()))).to.eql(
                            true,
                            "Latest displayed date after scrolling should be after latest displayed date before scrolling"
                        );
                    });
            });
    });

    it("then they can zoom out and the displayed unit will switch from hours to days", () => {
        const currentDayLabelText = format(today, "EEE-dd-MMMM");
        cy.findByText(currentDayLabelText).should("be.visible");

        zoomOutOneLevel();

        const currentMonthLabelText = format(today, "MMMM yyyy");
        cy.findByText(currentMonthLabelText).should("be.visible");
    });

    it("then they can zoom out and too small items will be grouped and expanded", () => {
        zoomOutOneLevel();
        cy.findByText("Expanded Items 2").should("be.visible");
    });

    it("then they can see dotted lines below the dates for all zoom levels", () => {
        assertTimeDisplayAndDottedLinesAreOnSameXPosition();
        zoomOutOneLevel();
        assertTimeDisplayAndDottedLinesAreOnSameXPosition();
        zoomOutOneLevel();
        assertTimeDisplayAndDottedLinesAreOnSameXPosition();
    });

    it("then they can see their items in the correct position with the correct size", () => {
        cy.findByText("Starts and Ends at the Quarter Hour")
            .parent("[data-testid='time-grid-item']")
            .then((jqueryElement) => {
                const [demoFlightElement] = jqueryElement;
                if (!demoFlightElement) {
                    throw new Error("Element should exist");
                }
                const { startDate } = demoFlightElement.dataset;
                isOnVerticalTimeIndicator(demoFlightElement, startDate);
                const { endDate } = demoFlightElement.dataset;
                isOnVerticalTimeIndicator(demoFlightElement, endDate, false);
            });
    });

    it("then they can see an indication for the current time", () => {
        cy.findByTestId("now-indicator").then((jqueryElement) => {
            const [nowIndicatorElement] = jqueryElement;
            if (!nowIndicatorElement) {
                throw new Error("Element should exist");
            }
            const { date } = nowIndicatorElement.dataset;
            const startOfQuarterHourDate = startOfQuarterHour(parseISO(date ?? ""));
            const endOfQuarterHourDate = add(startOfQuarterHourDate, { minutes: 15 });
            console.log({ date, startOfQuarterHourDate, endOfQuarterHourDate });
            cy.get(`[data-date="${startOfQuarterHourDate.toISOString()}"][data-testid="vertical-date-indicator"]`).then(
                (jqueryElement) => {
                    const [verticalIndicatorElement] = jqueryElement;
                    if (!verticalIndicatorElement) {
                        throw new Error("Element should exist");
                    }
                    const { left: elementLeft } = nowIndicatorElement.getBoundingClientRect();
                    const { left: verticalIndicatorElementLeft, width: verticalIndicatorElementWidth } =
                        verticalIndicatorElement.getBoundingClientRect();

                    expect(elementLeft).to.be.gte(
                        verticalIndicatorElementLeft + verticalIndicatorElementWidth,
                        "Now indication is after vertical indicator element"
                    );
                }
            );
            cy.get(`[data-date="${endOfQuarterHourDate.toISOString()}"][data-testid="vertical-date-indicator"]`).then(
                (jqueryElement) => {
                    const [verticalIndicatorElement] = jqueryElement;
                    if (!verticalIndicatorElement) {
                        throw new Error("Element should exist");
                    }
                    const { left: elementLeft } = nowIndicatorElement.getBoundingClientRect();
                    const { left: verticalIndicatorElementLeft, width: verticalIndicatorElementWidth } =
                        verticalIndicatorElement.getBoundingClientRect();

                    expect(elementLeft).to.be.lte(
                        verticalIndicatorElementLeft + verticalIndicatorElementWidth,
                        "Now indication is before vertical indicator element"
                    );
                }
            );
        });
    });
});

describe("When a user uses the time scheduler with groups", () => {
    beforeEach(() => {
        cy.mount(
            <LocalFeatureFlagsProvider configurationOverride={{ timeGridStickyHeader: { enabled: false } }}>
                <ThemeProvider>
                    <I18nProvider>
                        <TimeSchedulerNew translations={translations}>
                            <TimeSchedulerRowNew>
                                <TimeSchedulerRowLabelNew>
                                    <Box p={1} background="monochrome.100" boxSize="full">
                                        VoloCity
                                    </Box>
                                </TimeSchedulerRowLabelNew>
                                <TimeSchedulerRowContentNew>
                                    <TimeSchedulerRowItemNew
                                        id="1"
                                        startDate={add(new Date(), { hours: 1 })}
                                        endDate={add(new Date(), { hours: 2 })}
                                        group="blue"
                                    >
                                        <ItemBox bg="darkBlue.200">Item</ItemBox>
                                    </TimeSchedulerRowItemNew>
                                    <TimeSchedulerRowItemNew
                                        id="2"
                                        startDate={add(new Date(), { hours: 3 })}
                                        endDate={add(new Date(), { hours: 4 })}
                                        group="coral"
                                    >
                                        <ItemBox bg="coral.200">Item</ItemBox>
                                    </TimeSchedulerRowItemNew>
                                </TimeSchedulerRowContentNew>
                            </TimeSchedulerRowNew>
                        </TimeSchedulerNew>
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
                        <TimeSchedulerNew
                            translations={translations}
                            config={{
                                persistSettings: true,
                                identifier: "persistence-test",
                                renderExpandedItems,
                            }}
                        >
                            <TimeSchedulerRowNew>
                                <TimeSchedulerRowLabelNew>
                                    <Box p={1} background="monochrome.100" boxSize="full">
                                        VoloCity
                                    </Box>
                                </TimeSchedulerRowLabelNew>
                                <TimeSchedulerRowContentNew>
                                    <TimeSchedulerRowItemNew
                                        id="1"
                                        startDate={add(new Date(), { minutes: 5 })}
                                        endDate={add(new Date(), { minutes: 25 })}
                                    >
                                        <ItemBox>Trade Fair</ItemBox>
                                    </TimeSchedulerRowItemNew>
                                    <TimeSchedulerRowItemNew
                                        id="2"
                                        startDate={add(new Date(), { minutes: 11 })}
                                        endDate={add(new Date(), { minutes: 20 })}
                                    >
                                        <ItemBox>Exhibition</ItemBox>
                                    </TimeSchedulerRowItemNew>
                                    <TimeSchedulerRowItemNew
                                        id="3"
                                        startDate={new Date()}
                                        endDate={add(new Date(), { minutes: 10 })}
                                    >
                                        <ItemBox>Demo Flight</ItemBox>
                                    </TimeSchedulerRowItemNew>
                                </TimeSchedulerRowContentNew>
                            </TimeSchedulerRowNew>
                        </TimeSchedulerNew>
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
        const currentDayLabelText = format(today, "EEE-dd-MMMM");
        cy.findByText(currentDayLabelText).should("be.visible");

        zoomOutOneLevel();

        const currentMonthLabelText = format(today, "MMMM yyyy");
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

describe("When a user uses the time scheduler with many rows", () => {
    beforeEach(() => {
        cy.mount(
            <LocalFeatureFlagsProvider>
                <ThemeProvider>
                    <I18nProvider>
                        <TimeSchedulerNew translations={translations}>
                            {Array.from({ length: 20 }).map((_, rowIndex) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <TimeSchedulerRowNew key={rowIndex}>
                                    <TimeSchedulerRowLabelNew>
                                        <Box p={1} background="monochrome.100" boxSize="full" width="100px">
                                            VoloCity {rowIndex}
                                        </Box>
                                    </TimeSchedulerRowLabelNew>
                                </TimeSchedulerRowNew>
                            ))}
                        </TimeSchedulerNew>
                    </I18nProvider>
                </ThemeProvider>
            </LocalFeatureFlagsProvider>
        );
    });

    it("then they can see the header all the time", () => {
        const currentDayLabelText = format(today, "EEE-dd-MMMM");
        cy.findByText(currentDayLabelText).then(isInViewport);

        scroll("vertical", 2000);

        cy.findByText(currentDayLabelText).then(isInViewport);
    });

    it("then they can scroll vertically and see the last row", () => {
        cy.findByText("VoloCity 0").then(isInViewport);
        cy.findByText("VoloCity 19").then(isNotInViewport);

        scroll("vertical", 2000);

        cy.findByText("VoloCity 0").then(isNotInViewport);
        cy.findByText("VoloCity 19").then(isInViewport);
    });

    it("then scrolling vertically does not also scroll horizontally", () => {
        cy.findByTestId("time-grid-container").then((element) => {
            const scrollLeftBeforeScroll = element.scrollLeft();
            scroll("vertical", 1000);
            cy.findByTestId("time-grid-container").then((element) => {
                const scrollLeftAfterScroll = element.scrollLeft();
                expect(scrollLeftBeforeScroll).to.eql(scrollLeftAfterScroll);
            });
        });
    });
});

describe("When a user loads the time scheduler for the first time", () => {
    beforeEach(() => {
        cy.mount(
            <LocalFeatureFlagsProvider>
                <ThemeProvider>
                    <I18nProvider>
                        <TimeSchedulerNew
                            timelineStartDate={new Date("2022-01-01 09:00:00 AM")}
                            translations={translations}
                        >
                            {Array.from({ length: 20 }).map((_, rowIndex) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <TimeSchedulerRowNew key={rowIndex}>
                                    <TimeSchedulerRowLabelNew>
                                        <Box p={1} background="monochrome.100" boxSize="full" width="100px">
                                            VoloCity {rowIndex}
                                        </Box>
                                    </TimeSchedulerRowLabelNew>
                                </TimeSchedulerRowNew>
                            ))}
                        </TimeSchedulerNew>
                    </I18nProvider>
                </ThemeProvider>
            </LocalFeatureFlagsProvider>
        );
    });

    it("then they can see the provided initial date when time grid loads", () => {
        const currentDayLabelText = format(new Date("2022-01-01 09:00:00 AM"), "EEE-dd-MMMM");
        cy.findByText(currentDayLabelText).should("be.visible");
    });
});

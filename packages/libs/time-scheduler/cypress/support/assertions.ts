export const isInViewport = (element: JQuery<HTMLElement>) => {
    cy.window().then((window) => {
        const { documentElement } = window.document;
        const bottom = documentElement.clientHeight;
        const right = documentElement.clientWidth;
        const rect = element[0]?.getBoundingClientRect();
        expect(rect?.top).to.be.lessThan(bottom);
        expect(rect?.bottom).to.be.greaterThan(0);
        expect(rect?.right).to.be.greaterThan(0);
        expect(rect?.left).to.be.lessThan(right);
    });
};

export const isNotInViewport = (element: JQuery<HTMLElement>) => {
    cy.window().then((window) => {
        const { documentElement } = window.document;
        const bottom = documentElement.clientHeight;
        const right = documentElement.clientWidth;
        const rect = element[0]?.getBoundingClientRect();
        const isOutsideVerticalViewport =
            (rect?.top ?? Number.NEGATIVE_INFINITY) > bottom || (rect?.bottom ?? Number.POSITIVE_INFINITY) < 0;
        const isOutsideHorizontalViewport =
            (rect?.left ?? Number.NEGATIVE_INFINITY) > right || (rect?.right ?? Number.POSITIVE_INFINITY) < 0;
        const isNotInViewport = isOutsideVerticalViewport || isOutsideHorizontalViewport;

        expect(isNotInViewport, "is not in viewport").to.eql(true);
    });
};

export const isOnVerticalTimeIndicator = (
    element: HTMLElement,
    isoDate: string | undefined,
    compareLeftElementSide = true
) => {
    cy.get(`[data-date="${isoDate}"][data-testid="vertical-date-indicator"]`).then((jqueryElement) => {
        const [verticalIndicatorElement] = jqueryElement;
        if (!verticalIndicatorElement) {
            throw new Error("Element should exist");
        }
        const { left: elementLeft, right: elementRight } = element.getBoundingClientRect();
        const { left: verticalIndicatorElementLeft, width: verticalIndicatorElementWidth } =
            verticalIndicatorElement.getBoundingClientRect();

        expect(compareLeftElementSide ? elementLeft : elementRight).to.eql(
            verticalIndicatorElementLeft + verticalIndicatorElementWidth,
            "Element and vertical time indicator are at the same x position"
        );
    });
};

export const assertTimeDisplayAndDottedLinesAreOnSameXPosition = () =>
    cy
        .findAllByTestId("time-display")
        .first()
        .then((jqueryElement) => {
            const [timeDisplayElement] = jqueryElement;
            if (!timeDisplayElement) {
                throw new Error("Element should exist");
            }
            const { date } = timeDisplayElement.dataset;
            isOnVerticalTimeIndicator(timeDisplayElement, date);
        });

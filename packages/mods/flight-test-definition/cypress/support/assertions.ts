export const isInViewport = (element: JQuery<HTMLElement>) => {
    cy.window().should((window) => {
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
    cy.window().should((window) => {
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

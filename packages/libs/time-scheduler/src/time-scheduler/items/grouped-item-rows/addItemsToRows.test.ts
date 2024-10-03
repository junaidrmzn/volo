import { add, sub } from "date-fns";
import { addItemsToRows } from "./addItemsToRows";

describe("add items to empty rows", () => {
    test("items will be in different rows if they overlap", () => {
        const itemA = { startDate: new Date(), endDate: add(new Date(), { days: 2 }) };
        const itemB = { startDate: new Date(), endDate: add(new Date(), { days: 3 }) };
        const itemC = { startDate: add(new Date(), { days: 1 }), endDate: add(new Date(), { days: 3 }) };

        expect(addItemsToRows([itemA, itemB, itemC])).toIncludeSameMembers([[itemA], [itemB], [itemC]]);
    });

    test("items will be in the same row if they do not overlap", () => {
        const itemA = { startDate: new Date(), endDate: add(new Date(), { days: 1 }) };
        const itemB = { startDate: add(new Date(), { days: 2 }), endDate: add(new Date(), { days: 3 }) };
        const itemC = { startDate: add(new Date(), { days: 4 }), endDate: add(new Date(), { days: 5 }) };

        expect(addItemsToRows([itemA, itemB, itemC])).toIncludeSameMembers([[itemA, itemB, itemC]]);
    });

    test("items will be in the same row if they do not overlap even if other items do overlap", () => {
        const itemA = { startDate: add(new Date(), { days: 2 }), endDate: add(new Date(), { days: 3 }) };
        const itemB = { startDate: new Date(), endDate: add(new Date(), { days: 1 }) };
        const itemC = { startDate: new Date(), endDate: add(new Date(), { days: 1 }) };
        const itemD = { startDate: new Date(), endDate: add(new Date(), { days: 4 }) };
        const itemE = { startDate: new Date(), endDate: add(new Date(), { days: 3 }) };

        expect(addItemsToRows([itemA, itemB, itemC, itemD, itemE])).toIncludeSameMembers([
            [itemB, itemA],
            [itemC],
            [itemD],
            [itemE],
        ]);
    });

    test("only overlapping items will be in different rows", () => {
        const itemA = { startDate: new Date(), endDate: add(new Date(), { days: 1 }) };
        const itemB = { startDate: add(new Date(), { days: 2 }), endDate: add(new Date(), { days: 4 }) };
        const itemC = { startDate: add(new Date(), { days: 3 }), endDate: add(new Date(), { days: 4 }) };

        expect(addItemsToRows([itemA, itemB, itemC])).toIncludeSameMembers([[itemA, itemB], [itemC]]);
    });
});

describe("add items to existing rows", () => {
    test("later items are inserted into existing rows", () => {
        const itemA = { startDate: new Date(), endDate: add(new Date(), { days: 1 }) };
        const itemB = { startDate: add(new Date(), { days: 2 }), endDate: add(new Date(), { days: 6 }) };
        const itemC = { startDate: add(new Date(), { days: 3 }), endDate: add(new Date(), { days: 4 }) };
        const itemD = { startDate: add(new Date(), { days: 5 }), endDate: add(new Date(), { days: 9 }) };
        const itemE = { startDate: add(new Date(), { days: 7 }), endDate: add(new Date(), { days: 8 }) };

        const itemRows = [[itemA, itemB], [itemC]];

        expect(addItemsToRows([itemD, itemE], itemRows)).toEqual([
            [itemA, itemB, itemE],
            [itemC, itemD],
        ]);
    });

    test("earlier items are inserted into existing rows", () => {
        const itemA = { startDate: new Date(), endDate: add(new Date(), { days: 1 }) };
        const itemB = { startDate: add(new Date(), { days: 2 }), endDate: add(new Date(), { days: 6 }) };
        const itemC = { startDate: add(new Date(), { days: 3 }), endDate: add(new Date(), { days: 4 }) };
        const itemD = { startDate: sub(new Date(), { days: 3 }), endDate: sub(new Date(), { days: 1 }) };
        const itemE = { startDate: sub(new Date(), { days: 1 }), endDate: add(new Date(), { days: 2 }) };

        const itemRows = [[itemA, itemB], [itemC]];

        expect(addItemsToRows([itemD, itemE], itemRows)).toEqual([
            [itemD, itemA, itemB],
            [itemE, itemC],
        ]);
    });

    test("inbetween items are inserted into existing rows", () => {
        const itemA = { startDate: sub(new Date(), { days: 3 }), endDate: sub(new Date(), { days: 1 }) };
        const itemB = { startDate: new Date(), endDate: add(new Date(), { days: 1 }) };
        const itemC = { startDate: add(new Date(), { days: 2 }), endDate: add(new Date(), { days: 6 }) };

        const itemRows = [[itemA, itemC]];

        expect(addItemsToRows([itemB], itemRows)).toEqual([[itemA, itemB, itemC]]);
    });

    test("later, earlier, and inbetween items are inserted into existing rows", () => {
        const itemA = { startDate: new Date(), endDate: add(new Date(), { days: 1 }) };
        const itemB = { startDate: add(new Date(), { days: 2 }), endDate: add(new Date(), { days: 3 }) };
        const itemC = { startDate: add(new Date(), { days: 4 }), endDate: add(new Date(), { days: 5 }) };
        const itemD = { startDate: add(new Date(), { days: 6 }), endDate: add(new Date(), { days: 8 }) };

        expect(addItemsToRows([itemA, itemC, itemA, itemC], [[itemB, itemD], [itemB]])).toEqual([
            [itemA, itemB, itemC, itemD],
            [itemA, itemB, itemC],
        ]);
    });

    test("order of rows stays the same after insertion", () => {
        const itemA = { startDate: new Date(), endDate: add(new Date(), { days: 1 }) };
        const itemB = { startDate: new Date(), endDate: add(new Date(), { days: 1 }) };
        const itemC = { startDate: new Date(), endDate: add(new Date(), { days: 1 }) };
        const itemD = { startDate: add(new Date(), { days: 2 }), endDate: add(new Date(), { days: 3 }) };

        expect(addItemsToRows([itemD], [[itemA], [itemB], [itemC]])).toEqual([[itemA, itemD], [itemB], [itemC]]);
    });

    test("items are inserted into a new row if existing rows are conflicting", () => {
        const itemA = { startDate: new Date(), endDate: add(new Date(), { days: 1 }) };
        const itemB = { startDate: add(new Date(), { days: 2 }), endDate: add(new Date(), { days: 6 }) };
        const itemC = { startDate: add(new Date(), { days: 3 }), endDate: add(new Date(), { days: 4 }) };
        const itemD = { startDate: add(new Date(), { days: 3 }), endDate: add(new Date(), { days: 6 }) };

        const itemRows = [[itemA, itemB], [itemC]];

        expect(addItemsToRows([itemD], itemRows)).toEqual([[itemA, itemB], [itemC], [itemD]]);
    });
});

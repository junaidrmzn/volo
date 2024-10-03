import { renderHook } from "@testing-library/react-hooks";
import { add } from "date-fns";
import { useItemRows } from "./useItemRows";

test("Persists order of item rows", () => {
    const itemA = { id: "1", startDate: new Date(), endDate: add(new Date(), { days: 2 }) };
    const itemB = { id: "2", startDate: new Date(), endDate: add(new Date(), { days: 3 }) };
    const itemC = { id: "3", startDate: add(new Date(), { days: 1 }), endDate: add(new Date(), { days: 3 }) };
    const itemD = { id: "4", startDate: add(new Date(), { days: 3 }), endDate: add(new Date(), { days: 4 }) };
    const { result, rerender } = renderHook((props) => useItemRows(props), {
        initialProps: { items: [itemA, itemB, itemC] },
    });

    expect(result.current).toEqual([[itemA], [itemB], [itemC]]);

    rerender({ items: [itemD] });

    expect(result.current).toEqual([[itemD], [], []]);

    rerender({ items: [itemA, itemB, itemC, itemD] });

    expect(result.current).toEqual([[itemA, itemD], [itemB], [itemC]]);
});

test("Adds new row if existing rows are conflicting", async () => {
    const itemA = { id: "1", startDate: new Date(), endDate: add(new Date(), { days: 2 }) };
    const itemB = { id: "2", startDate: new Date(), endDate: add(new Date(), { days: 3 }) };
    const itemC = { id: "3", startDate: add(new Date(), { days: 1 }), endDate: add(new Date(), { days: 3 }) };
    const itemD = { id: "4", startDate: add(new Date(), { days: 1 }), endDate: add(new Date(), { days: 4 }) };
    const { result, rerender } = renderHook((props) => useItemRows(props), {
        initialProps: { items: [itemA, itemB, itemC] },
    });

    expect(result.current).toEqual([[itemA], [itemB], [itemC]]);

    rerender({ items: [itemD] });

    expect(result.current).toEqual([[], [], [], [itemD]]);

    rerender({ items: [itemA, itemB, itemC, itemD] });

    expect(result.current).toEqual([[itemA], [itemB], [itemC], [itemD]]);
});

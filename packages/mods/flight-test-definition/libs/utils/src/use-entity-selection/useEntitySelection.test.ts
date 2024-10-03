import { act, renderHook } from "@voloiq/testing";
import { useEntitySelection } from "./useEntitySelection";

test("useEntitySelection returns selected entities", () => {
    const entities = [{ id: "1" }, { id: "2" }, { id: "3" }];
    const { result } = renderHook(() => useEntitySelection({ entities }));

    expect(result.current.entitiesWithSelection).toEqual([
        { id: "1", isSelected: false },
        { id: "2", isSelected: false },
        { id: "3", isSelected: false },
    ]);

    act(() => result.current.onSelect("1", true));
    expect(result.current.entitiesWithSelection).toEqual([
        { id: "1", isSelected: true },
        { id: "2", isSelected: false },
        { id: "3", isSelected: false },
    ]);

    act(() => result.current.selectAll());
    expect(result.current.entitiesWithSelection).toEqual([
        { id: "1", isSelected: true },
        { id: "2", isSelected: true },
        { id: "3", isSelected: true },
    ]);

    act(() => result.current.clearAll());
    expect(result.current.entitiesWithSelection).toEqual([
        { id: "1", isSelected: false },
        { id: "2", isSelected: false },
        { id: "3", isSelected: false },
    ]);
});

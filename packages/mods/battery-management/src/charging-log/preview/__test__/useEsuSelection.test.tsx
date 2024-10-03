import { act, renderHook } from "@testing-library/react-hooks";
import { useEsuSelection } from "../useEsuSelection";

describe("useEsuSelection hook test", () => {
    it('filters out "NULL" values', () => {
        const esuList = ["NULL", "00001", "00002", "NULL", "00003", "NULL", "NULL", "NULL", "NULL", "NULL", "00004"];
        const { result } = renderHook(() => useEsuSelection(esuList));
        expect(result.current.filteredEsuList).toEqual(["00001", "00002", "00003", "00004"]);
    });

    it("updates the selected value once setSelectedEsu is called", () => {
        const esuList = ["00001", "000002", "00003"];
        const { result } = renderHook(() => useEsuSelection(esuList));
        act(() => {
            result.current.setSelectedEsu("00001");
        });
        expect(result.current.selectedEsu).toBe("00001");
    });
});

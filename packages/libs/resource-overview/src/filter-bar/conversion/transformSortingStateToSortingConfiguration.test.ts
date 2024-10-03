import type { SortingState } from "@volocopter/filter-react";
import { SortingConfiguration } from "@voloiq/sorting-panel";
import { transformSortingStateToSortingConfiguration } from "./transformSortingStateToSortingConfiguration";

describe("transformSortingStateToSortingConfiguration", () => {
    it("transforms sortingState to Sorting Configuration", () => {
        const sortingState: SortingState = {
            value: { value: "name", label: "Name" },
            comparisonOperator: "asc",
        };
        const sortingConfiguration: SortingConfiguration = {
            selectedOption: "name",
            selectedOrder: "ASC",
        };
        expect(transformSortingStateToSortingConfiguration(sortingState)).toMatchObject(sortingConfiguration);
    });
});

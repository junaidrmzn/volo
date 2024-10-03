import { ParameterValue } from "../LocalStorageParameters";
import { getSortingParameterFromSortingState } from "./getSortingParameterFromSortingState";

describe("getSortingParameterFromSortingState", () => {
    it("assigns the value correctly and desc comparison operator", () => {
        const selectedOption = { value: "name", label: "Name" };

        const result = getSortingParameterFromSortingState({
            value: selectedOption,
            comparisonOperator: "desc",
        });
        const filterObject: ParameterValue = {
            value: "name",
            comparisonOperator: "desc",
        };
        expect(result).toMatchObject({ orderBy: JSON.stringify(filterObject) });
    });
});

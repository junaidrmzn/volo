import type { SortingConfig } from "@volocopter/filter-react";
import { getSortingConfigWithValueFromParameters } from "./getSortingConfigValuesFromParameters";

describe("getSortingConfigValuesFromParameters", () => {
    const firstOption = { value: "name", label: "Name" };
    const secondOption = { value: "createdBy", label: "Created BY" };
    const sortingConfig: SortingConfig = {
        options: [firstOption, secondOption],
    };

    it("assigns the value and comparisonOperator correctly", () => {
        const comparisonOperator = "desc";
        const parameters = { orderBy: JSON.stringify({ value: "createdBy", comparisonOperator }) };
        const result = getSortingConfigWithValueFromParameters(parameters, sortingConfig);
        expect(result).toMatchObject({ ...sortingConfig, value: secondOption, comparisonOperator });
    });
});

import { useMemo } from "react";
import { TestPointSequenceTestPointAssociation } from "@voloiq/flight-test-definition-api/v1";
import { filterTestPointParameters } from "./filterTestPointParameters";

export const useFilteredTestPointParameters = (testPointAssociations?: TestPointSequenceTestPointAssociation[]) => {
    const testPointParameters = useMemo(
        () => filterTestPointParameters(testPointAssociations),
        [testPointAssociations]
    );

    return {
        testPointParameters,
    };
};

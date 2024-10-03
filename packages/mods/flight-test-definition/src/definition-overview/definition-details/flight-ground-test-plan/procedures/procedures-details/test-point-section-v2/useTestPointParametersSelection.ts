import { useState } from "react";
import { useGetProcedureQuery } from "@voloiq/flight-test-definition-api/v1";

export type UseTestPointParametersSelectionOptions = {
    definitionId: string;
    procedureId: string;
};

export const useTestPointParametersSelection = (options: UseTestPointParametersSelectionOptions) => {
    const { definitionId, procedureId } = options;
    const { procedure } = useGetProcedureQuery({ definitionId, procedureId });

    const [selectedTestPointParameters, setSelectedTestPointParameters] = useState(
        procedure?.testPointParameters ?? []
    );

    return {
        selectedTestPointParameters,
        selectTestPointParameters: setSelectedTestPointParameters,
    };
};

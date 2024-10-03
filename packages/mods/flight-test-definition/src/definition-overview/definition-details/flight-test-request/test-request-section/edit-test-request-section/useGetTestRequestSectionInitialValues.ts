import type { FlightTestDefinitionResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { useMasterModelOptions, useMsnOptions, useTestTypeOptions } from "@voloiq/flight-test-definition-forms";

export const useGetTestRequestSectionInitialValues = () => {
    const { masterModelOptions } = useMasterModelOptions();
    const { msnOptions } = useMsnOptions();
    const { testTypeOptions } = useTestTypeOptions();

    const getInitialValues = (definition: FlightTestDefinitionResponseBody) => {
        const { testType, masterModel, msn } = definition;
        return {
            ...definition,
            testType: testTypeOptions?.find((testTypeOption) => testTypeOption.value === testType),
            masterModel: masterModelOptions?.find((masterModelOption) => masterModelOption.value === masterModel),
            msn: msnOptions[masterModel]?.find((msnOption) => msnOption.value === msn),
        };
    };

    return { getInitialValues };
};

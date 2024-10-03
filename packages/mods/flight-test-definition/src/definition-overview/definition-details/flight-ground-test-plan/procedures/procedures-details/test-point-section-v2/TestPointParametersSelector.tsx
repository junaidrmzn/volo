import { FormControl, FormLabel, Select } from "@volocopter/design-library-react";
import type { TestPointParameter } from "@voloiq-typescript-api/ftd-types";
import { useGetAllTestPointParametersQuery } from "@voloiq/flight-test-definition-api/v1";
import { useTestPointSectionTranslation } from "./translations/useTestPointSectionTranslation";

type TestPointParametersSelectorProps = {
    onSelectTestPointParameters: (testPointParameters: TestPointParameter[]) => void;
    selectedTestPointParameters: TestPointParameter[];
};

export const TestPointParametersSelector = (props: TestPointParametersSelectorProps) => {
    const { onSelectTestPointParameters, selectedTestPointParameters } = props;
    const { t } = useTestPointSectionTranslation();
    const { testPointParameters } = useGetAllTestPointParametersQuery({ manual: false });

    return (
        <FormControl>
            <FormLabel>
                {t("Test Point Parameters {testPointParametersCount}", {
                    testPointParametersCount: `(${testPointParameters?.length || 0} parameter(s))`,
                })}
            </FormLabel>
            <Select<TestPointParameter, true>
                value={selectedTestPointParameters}
                onChange={(newState) => onSelectTestPointParameters([...newState])}
                options={testPointParameters}
                closeMenuOnSelect={false}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                isMulti
            />
        </FormControl>
    );
};

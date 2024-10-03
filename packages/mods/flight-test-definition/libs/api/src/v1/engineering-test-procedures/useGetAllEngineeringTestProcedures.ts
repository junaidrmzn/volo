import { useGetAllService } from "@voloiq/service";
import { EngineeringTestProcedure } from "./apiModels";

export type UseGetAllEngineeringTestProceduresOptions = {
    definitionId: string;
    manual?: boolean;
};

export const useGetAllEngineeringTestProcedures = (props: UseGetAllEngineeringTestProceduresOptions) => {
    const { definitionId, manual = true } = props;
    const { data: engineeringTestProcedures, sendRequest: getAllEngineeringTestProcedures } =
        useGetAllService<EngineeringTestProcedure>({
            route: `/ftd/v1/definitions/${definitionId}/engineering-test-procedures`,
            options: {
                manual,
            },
        });

    return { engineeringTestProcedures, getAllEngineeringTestProcedures };
};

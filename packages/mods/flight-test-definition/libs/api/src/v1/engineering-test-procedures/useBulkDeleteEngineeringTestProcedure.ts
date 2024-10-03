import { useDeleteService } from "@voloiq/service";

export type UseBulkDeleteEngineeringTestProcedureProps = {
    definitionId: string;
};
export const useBulkDeleteEngineeringTestProcedure = (props: UseBulkDeleteEngineeringTestProcedureProps) => {
    const { definitionId } = props;

    const { sendRequest: bulkDeleteEngineeringTestProcedures } = useDeleteService<{}, string[]>({
        route: `/ftd/v1/definitions/${definitionId}/engineering-test-procedures`,
    });

    return { bulkDeleteEngineeringTestProcedures };
};

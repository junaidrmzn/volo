import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@volocopter/design-library-react";
import type { TestPointParameter } from "@voloiq-typescript-api/ftd-types";
import { getProcedureQueryKey, useEditProcedure } from "@voloiq/flight-test-definition-api/v2";
import { useProcedureEditSessionId } from "../procedure-edit-session-id-context/useProcedureEditSessionId";
import { useTestPointSectionTranslation } from "./translations/useTestPointSectionTranslation";

export type UseUpdateTestPointParametersOptions = {
    definitionId: string;
    procedureId: string;
    testPointParameters: TestPointParameter[];
};

export const useUpdateTestPointParameters = (options: UseUpdateTestPointParametersOptions) => {
    const { definitionId, procedureId, testPointParameters } = options;

    const { editProcedure } = useEditProcedure({ definitionId, procedureId });
    const { procedureEditSessionId: editSessionId } = useProcedureEditSessionId();

    const queryClient = useQueryClient();
    const sendToast = useToast();
    const { t } = useTestPointSectionTranslation();

    const updateTestPointParameters = async () => {
        await editProcedure({
            data: { testPointParameters: testPointParameters.map((testPointParameter) => testPointParameter.id) },
            params: { editSessionId },
        })
            .then(() => {
                queryClient.invalidateQueries(getProcedureQueryKey(procedureId));
            })
            .catch(() => {
                sendToast({
                    status: "error",
                    title: t("Uh-oh!"),
                    description: t("Something went wrong while updating the test point parameters"),
                });
            });
    };

    return { updateTestPointParameters };
};

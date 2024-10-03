import { useAuthentication } from "@voloiq/auth";
import type { FlightTestDefinitionInsert } from "@voloiq/flight-test-definition-api/v2";
import { useAddDefinition } from "@voloiq/flight-test-definition-api/v2";
import type { DefinitionFormSchema } from "@voloiq/flight-test-definition-forms";
import { useEditSessionId } from "@voloiq/flight-test-definition-utils";
import type { OnCreateHandler } from "@voloiq/form";

export const useOnCreateDefinition = () => {
    const { addDefinition } = useAddDefinition();
    const { name: requesterName } = useAuthentication();
    const { editSessionId } = useEditSessionId();
    const onCreate: OnCreateHandler<DefinitionFormSchema> = async (formData, reset) => {
        const data: FlightTestDefinitionInsert = {
            ...formData,
            msn: formData.msn.value,
            masterModel: formData.masterModel.value,
            requesterName,
            testType: formData.testType.value,
        };
        await addDefinition({ data, params: { editSessionId } });
        reset();
    };

    return { onCreate };
};

import { useMemo, useState } from "react";
import type { MSNModel, MasterModel } from "@voloiq/flight-test-definition-api/v2";
import { isMasterModel } from "@voloiq/flight-test-definition-api/v2";
import type { SelectOption } from "@voloiq/form";
import { createFormControl, isSelectOption } from "@voloiq/form";
import { useMasterModelOptions } from "../master-model/useMasterModelOptions";
import { useMsnOptions } from "../msn/useMsnOptions";
import type { DefinitionFormSchema } from "./definitionFormSchema";
import { createDefinitionFormSchema } from "./definitionFormSchema";
import { useDefinitionFormTranslation } from "./translations/useDefinitionFormTranslation";

export type useDefinitionFormProps = {
    selectedMasterModel?: MasterModel;
};

export const useDefinitionForm = (props: useDefinitionFormProps = {}) => {
    const { selectedMasterModel } = props;
    const { t } = useDefinitionFormTranslation();
    const { msnOptions } = useMsnOptions();
    const { masterModelOptions } = useMasterModelOptions();
    const [msnOptionsList, setMsnOptionsList] = useState<SelectOption<MSNModel>[]>(
        selectedMasterModel ? msnOptions[selectedMasterModel] : []
    );
    const onChangeMasterModelOption = (element: unknown) => {
        if (isSelectOption(element)) {
            const masterModel = element.value;
            if (isMasterModel(masterModel)) {
                setMsnOptionsList(msnOptions[masterModel]);
            }
        }
    };
    const schema = useMemo(
        () => createDefinitionFormSchema({ t, msnOptions: msnOptionsList, masterModelOptions }),
        [t, msnOptionsList, masterModelOptions]
    );
    const FormControl = createFormControl<DefinitionFormSchema>();

    return { schema, FormControl, onChangeMasterModelOption };
};

import { useMemo } from "react";
import { createFormControl } from "@voloiq/form";
import { useMasterModelOptions } from "../master-model/useMasterModelOptions";
import type { FlightTestOrderFormSchema } from "./flightTestOrderFormSchema";
import { createFlightTestOrderFormSchema } from "./flightTestOrderFormSchema";
import { useFlightTestOrderFormTranslation } from "./translations/useFlightTestOrderFormTranslation";

export const useFlightTestOrderForm = () => {
    const { t } = useFlightTestOrderFormTranslation();
    const { masterModelOptions } = useMasterModelOptions();
    const schema = useMemo(() => createFlightTestOrderFormSchema({ t, masterModelOptions }), [t, masterModelOptions]);
    const FormControl = createFormControl<FlightTestOrderFormSchema>();

    return { schema, FormControl };
};

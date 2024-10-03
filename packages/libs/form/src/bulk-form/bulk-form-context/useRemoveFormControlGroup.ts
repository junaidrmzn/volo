import { useContext } from "react";
import { ArrayFormControlContext } from "../array-form-control/ArrayFormControlContext";
import { BulkFormContext } from "./BulkFormContext";

export const useRemoveFormControlGroup = () => {
    const bulkFormContext = useContext(BulkFormContext);
    const arrayFormControlContext = useContext(ArrayFormControlContext);

    if (bulkFormContext === undefined || arrayFormControlContext === undefined) {
        throw new Error("useAddFormControlGroup must be used within BulkForm's render props");
    }

    const { removeFormControlGroup: _removeFormControlGroup } = bulkFormContext;
    const { formControlFieldIndex } = arrayFormControlContext;

    const removeFormControlGroup = () => _removeFormControlGroup(formControlFieldIndex);

    return { removeFormControlGroup };
};

import { useContext } from "react";
import { BulkFormContext } from "./BulkFormContext";

export const useAddFormControlGroup = () => {
    const context = useContext(BulkFormContext);

    if (context === undefined) {
        throw new Error("useAddFormControlGroup must be used within BulkForm");
    }

    const { addFormControlGroup } = context;

    return { addFormControlGroup };
};

import type { ChangeEventHandler, KeyboardEventHandler } from "react";
import { parameterIdTokenizer } from "../ExportMapping";
import type { FtiCodeWithStatus } from "./useFtiCodesValidation";

const getValueList = (valueString: string) => {
    const valuesWithSpaces = parameterIdTokenizer(valueString);
    const values = valuesWithSpaces.filter((element) => element !== "");
    return { valuesWithSpaces, values };
};

export const useParameterInputOld = (options: {
    ftiCodesWithStatus: FtiCodeWithStatus[];
    addFtiCodesWithStatus: (ftiCodesWithStatus: string[]) => void;
    deleteLastFtiCodeWithStatus: () => void;
}) => {
    const { addFtiCodesWithStatus, deleteLastFtiCodeWithStatus, ftiCodesWithStatus } = options;
    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (props) => {
        const { currentTarget, key } = props;
        if (key === "Enter") {
            const { values } = getValueList(currentTarget.value);
            if (values.length > 0) {
                addFtiCodesWithStatus(values);
                currentTarget.value = "";
            }
        }
        if (key === "Backspace" && currentTarget.value === "" && ftiCodesWithStatus.length > 0) {
            deleteLastFtiCodeWithStatus();
        }
    };

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (props) => {
        const { target } = props;
        const { valuesWithSpaces, values } = getValueList(target.value);
        // add while typing
        if (valuesWithSpaces.length > 1 && !(values.length > 1)) {
            addFtiCodesWithStatus(values);
            target.value = "";
        }

        // add pasted string
        if (values.length > 1) {
            addFtiCodesWithStatus(values);
            target.value = "";
        }
    };

    return {
        handleInputChange,
        handleKeyDown,
    };
};

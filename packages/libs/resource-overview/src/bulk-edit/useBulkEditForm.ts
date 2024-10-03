import { useMemo, useState } from "react";
import { useFormatDateTime } from "@voloiq/dates";
import { SelectOption } from "@voloiq/form";
import { BulkEditData } from "./BulkEditModal";

export type EditType = "editProperties" | "archive";
export type EditableProperty = { fieldType: string; newValue: string };
export type ExtractValue = Date | string | SelectOption | SelectOption[];
export type ExtractKeyValue = { [key: string]: ExtractValue };

export const useBulkEditForm = () => {
    const [selectedProperty, setSelectedProperty] = useState<SelectOption>();
    const [selectedChangeTo, setSelectedChangeTo] = useState<ExtractValue>();
    const [formData, setFormData] = useState<BulkEditData>();
    const [type, setType] = useState<EditType>("editProperties");
    const { formatDateTime } = useFormatDateTime();

    const formatEditableProperty: EditableProperty = useMemo(() => {
        if (type === "archive") return { fieldType: "Valid to", newValue: formatDateTime(new Date()) };

        if (type === "editProperties" && selectedProperty?.label && selectedChangeTo) {
            let newValue: string;

            if (Array.isArray(selectedChangeTo)) {
                newValue = selectedChangeTo.map((option) => option.label).join(", ");
            } else if (selectedChangeTo instanceof Date) {
                newValue = formatDateTime(selectedChangeTo);
            } else if (typeof selectedChangeTo === "object" && "label" in selectedChangeTo) {
                newValue = selectedChangeTo.label || "";
            } else {
                newValue = String(selectedChangeTo);
            }

            return { fieldType: selectedProperty.label, newValue };
        }

        return { fieldType: selectedProperty?.label || "N/A", newValue: "N/A" };
    }, [formatDateTime, selectedChangeTo, selectedProperty?.label, type]);

    const extractValue = (data: ExtractKeyValue): string | SelectOption[] | null => {
        const newValue = data[selectedProperty?.value ?? ""];

        if (!newValue) return null;

        if (Array.isArray(newValue)) return newValue;

        if (newValue instanceof Date) return newValue.toISOString();

        if (typeof newValue === "object" && "value" in newValue) return newValue.value;

        return String(newValue);
    };

    return {
        selectedProperty,
        setSelectedProperty,
        selectedChangeTo,
        setSelectedChangeTo,
        formData,
        setFormData,
        type,
        setType,
        formatEditableProperty,
        extractValue,
    };
};

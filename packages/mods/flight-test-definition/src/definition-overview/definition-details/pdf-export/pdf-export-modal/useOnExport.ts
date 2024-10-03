import { useState } from "react";

export type UseOnExportOptions = {
    procedureIds: string[];
    generatePdfExport: (procedureIds: string[]) => Promise<void>;
    onExportSuccess: () => void;
};

export const useOnExport = (options: UseOnExportOptions) => {
    const { procedureIds, generatePdfExport, onExportSuccess } = options;

    const [isExporting, setIsExporting] = useState(false);

    const onExport = () => {
        setIsExporting(true);
        generatePdfExport(procedureIds)
            .then(() => {
                onExportSuccess();
            })
            .finally(() => {
                setIsExporting(false);
            });
    };

    return { onExport, isExporting };
};

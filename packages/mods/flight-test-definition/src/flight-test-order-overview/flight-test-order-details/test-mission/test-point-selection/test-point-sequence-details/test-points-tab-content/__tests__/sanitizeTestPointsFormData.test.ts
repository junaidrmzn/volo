import { FormValues } from "@voloiq/form";
import { extractParameterFormFields } from "../sanitizeTestPointsFormData";
import { TestPointsTabContentFormSchema } from "../useTestPointTabContentFormSchema";

describe("extractParameterFormFields", () => {
    it("should return an empty array if no test point parameters are provided", () => {
        const manualRow: FormValues<TestPointsTabContentFormSchema> & { isManual: boolean } = {
            notes: "notes",
            procedureTitle: "procedureTitle",
            sequenceIndex: 1,
            testPointId: "testPointId",
            isManual: true,
        };
        const result = extractParameterFormFields(manualRow);
        expect(result).toEqual([]);
    });

    it("should parse test point parameters from the manual row", () => {
        const manualRow: FormValues<TestPointsTabContentFormSchema> & { isManual: boolean } = {
            notes: "notes",
            procedureTitle: "procedureTitle",
            sequenceIndex: 1,
            testPointId: "testPointId",
            isManual: true,
            "testPointParameter-6e930aa9-b68c-4aa4-bd02-fa0363188e16-param1": "value1",
            "testPointParameter-187e8b7d-220c-4a70-967a-1ee9d60fc6db-param2": "value2",
            "testPointParameter-cfd94d77-24e7-419a-b0bf-bf7cf7e216d1-param3": "value3",
        };
        const result = extractParameterFormFields(manualRow);
        expect(result).toEqual([
            { id: "6e930aa9-b68c-4aa4-bd02-fa0363188e16", name: "param1", value: "value1" },
            { id: "187e8b7d-220c-4a70-967a-1ee9d60fc6db", name: "param2", value: "value2" },
            { id: "cfd94d77-24e7-419a-b0bf-bf7cf7e216d1", name: "param3", value: "value3" },
        ]);
    });

    it("should handle missing values correctly", () => {
        const manualRow: FormValues<TestPointsTabContentFormSchema> & { isManual: boolean } = {
            notes: "notes",
            procedureTitle: "procedureTitle",
            sequenceIndex: 1,
            testPointId: "testPointId",
            isManual: true,
            "testPointParameter-6e930aa9-b68c-4aa4-bd02-fa0363188e16-param1": "value1",
            "testPointParameter-187e8b7d-220c-4a70-967a-1ee9d60fc6db-param2": "",
            "testPointParameter-cfd94d77-24e7-419a-b0bf-bf7cf7e216d1-param3": "",
        };
        const result = extractParameterFormFields(manualRow);
        expect(result).toEqual([{ id: "6e930aa9-b68c-4aa4-bd02-fa0363188e16", name: "param1", value: "value1" }]);
    });
});

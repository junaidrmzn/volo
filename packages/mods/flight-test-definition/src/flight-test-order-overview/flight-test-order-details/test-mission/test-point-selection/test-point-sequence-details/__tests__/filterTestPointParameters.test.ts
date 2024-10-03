import {
    TestPointSequenceTestPointAssociation,
    anyTestPointSequenceTestPointAssociation,
} from "@voloiq/flight-test-definition-api/v1";
import { filterTestPointParameters } from "../filterTestPointParameters";

describe("filterTestPointParameters", () => {
    it("should return an empty array if no test point associations are provided", () => {
        const result = filterTestPointParameters();
        expect(result).toEqual([]);
    });

    it("should return an array of unique test point parameter descriptions", () => {
        const testPointAssociations: TestPointSequenceTestPointAssociation[] = [
            anyTestPointSequenceTestPointAssociation({
                testPointParameters: [
                    { id: "1", name: "param1", unit: "unit1", value: "1" },
                    { id: "2", name: "param2", unit: "unit2", value: "2" },
                ],
            }),
            anyTestPointSequenceTestPointAssociation({
                testPointParameters: [
                    { id: "2", name: "param2", unit: "unit2", value: "1" },
                    { id: "3", name: "param3", unit: "unit3", value: "3" },
                ],
            }),
            anyTestPointSequenceTestPointAssociation({
                testPointParameters: [
                    { id: "1", name: "param1", value: "note field" },
                    { id: "4", name: "some-additional-field", value: "some notes" },
                ],
            }),
        ];
        const result = filterTestPointParameters(testPointAssociations);
        expect(result).toEqual([
            { id: "1", name: "param1", unit: "unit1" },
            { id: "2", name: "param2", unit: "unit2" },
            { id: "3", name: "param3", unit: "unit3" },
            { id: "4", name: "some-additional-field" },
        ]);
    });
});

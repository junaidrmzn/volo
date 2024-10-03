import { getInitialFormValues } from "../getInitialFormValues";

describe("getInitialFormValues", () => {
    it("should return an empty array if no test point associations are provided", () => {
        const result = getInitialFormValues();
        expect(result).toEqual([]);
    });

    it("should return initial form values for each test point association", () => {
        const testPointAssociations = [
            {
                id: "1",
                sequenceIndex: 1,
                procedureTitle: "Test Procedure 1",
                testPointId: "TestPoint1",
                notes: "Test Notes 1",
                testPointParameters: [
                    { id: "b86b3421-9bb7-4a6f-8281-10d25c911bc5", name: "param1", value: "value1", unit: "unit1" },
                ],
                isManual: false,
            },
            {
                id: "2",
                sequenceIndex: 2,
                procedureTitle: "Test Procedure 2",
                testPointId: "TestPoint2",
                notes: "Test Notes 2",
                testPointParameters: [{ id: "b86b3421-9bb7-4a6f-8281-10d25c911bc5", name: "param2", value: "value2" }],
                isManual: false,
            },
        ];
        const result = getInitialFormValues(testPointAssociations);
        expect(result).toEqual([
            {
                id: "1",
                readOnly: true,
                sequenceIndex: 1,
                procedureTitle: "Test Procedure 1",
                testPointId: "TestPoint1",
                notes: "Test Notes 1",
                "testPointParameter-b86b3421-9bb7-4a6f-8281-10d25c911bc5-param1": "value1",
                isManual: false,
            },
            {
                id: "2",
                readOnly: false,
                sequenceIndex: 2,
                procedureTitle: "Test Procedure 2",
                testPointId: "TestPoint2",
                notes: "Test Notes 2",
                "testPointParameter-b86b3421-9bb7-4a6f-8281-10d25c911bc5-param2": "value2",
                isManual: false,
            },
        ]);
    });
});

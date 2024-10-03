import { v4 as uuidV4 } from "uuid";
import { TestPointSequenceTestPointAssociation } from "./apiModels";

export const anyTestPointSequenceTestPointAssociation = (
    overwrites: Partial<TestPointSequenceTestPointAssociation> = {}
): TestPointSequenceTestPointAssociation => ({
    id: uuidV4(),
    sequenceIndex: 1,
    procedureTitle: "Test Procedure Title",
    testPointId: "FTD-V21-01-001-A11-01-D01",
    notes: "Test Note",
    isManual: false,
    testPointParameters: [
        {
            id: "39d33d1f-f3fd-4218-b5f0-3869d79de901",
            name: "Above Ground Level",
            unit: "ft",
            value: "0",
        },
        {
            id: "8affff43-888f-475d-9181-834f4cbdea10",
            name: "AirSpeed",
            unit: "kt",
            value: "10",
        },
        {
            id: "ff5d80e5-2950-4d70-8949-03ef26a5d126",
            name: "ROC/D",
            unit: "ft/min",
            value: "0",
        },
        {
            id: "1e30cf77-e01d-466a-8bd2-e8f5378b5338",
            name: "Wind Azimuth",
            unit: "deg",
            value: "5",
        },
        {
            id: "0e30cf77-e01d-466a-8bd2-e8f5378b5338",
            name: "Target Emergency Power Unit",
            unit: "s",
            value: "18",
        },
    ],
    ...overwrites,
});

export const anyTestPointSequenceManualRow = (overwrites: Partial<TestPointSequenceTestPointAssociation> = {}) =>
    anyTestPointSequenceTestPointAssociation({
        procedureTitle: "this is a test",
        sequenceIndex: 5,
        testPointId: "test point id notes",
        notes: "some more notes",
        isManual: true,
        testPointParameters: [
            {
                id: "39d33d1f-f3fd-4218-b5f0-3869d79de901",
                name: "Above Ground Level",
                value: "1",
            },
            {
                id: "8affff43-888f-475d-9181-834f4cbdea10",
                name: "AirSpeed",
                value: "2",
            },
            {
                id: "ff5d80e5-2950-4d70-8949-03ef26a5d126",
                name: "ROC/D",
                value: "3",
            },
            {
                id: "1e30cf77-e01d-466a-8bd2-e8f5378b5338",
                name: "Wind Azimuth",
                value: "4",
            },
            {
                id: "0e30cf77-e01d-466a-8bd2-e8f5378b5338",
                name: "Target Emergency Power Unit",
                value: "5",
            },
        ],
        ...overwrites,
    });

export const anyTestPointSequenceTestPointAssociations = (
    testPointAssociations: TestPointSequenceTestPointAssociation[] = []
) => [
    anyTestPointSequenceTestPointAssociation({
        procedureTitle: "Starting Here",
        sequenceIndex: 1,
        testPointId: "FTD-V21-01-001-A11-01-D03",
        isManual: true,
        testPointParameters: [],
    }),
    anyTestPointSequenceTestPointAssociation({
        procedureTitle: "Test Point 1",
        sequenceIndex: 2,
        testPointId: "FTD-V21-01-001-A11-01-D01",
    }),
    anyTestPointSequenceTestPointAssociation({
        procedureTitle: "Test Point 2",
        sequenceIndex: 3,
        testPointId: "FTD-V21-01-001-A11-01-D02",
    }),
    anyTestPointSequenceTestPointAssociation({
        procedureTitle: "Test Point 3",
        sequenceIndex: 4,
        testPointId: "FTD-V21-01-001-A11-01-D03",
    }),
    anyTestPointSequenceTestPointAssociation({
        procedureTitle: "Test Point 4",
        sequenceIndex: 5,
        testPointId: "FTD-V21-01-001-A11-01-D04",
    }),
    ...testPointAssociations,
];

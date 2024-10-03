import type { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { WorkOrder } from "@voloiq/aircraft-management-api/v1";
import { I18nProvider } from "@voloiq/i18n";
import { WorkOrdersTable } from "./WorkOrdersTable";

const meta: Meta = {
    title: "Aircraft Management/Components/Work Orders Table",
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

const workOrders: WorkOrder[] = [
    {
        number: 1223,
        aircraftId: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
        state: "OPEN",
        dueDate: "2023-09-01T06:01:00.000Z",
        defectClassification: "Z",
        ataChapterNumber: "00-00",
        aogClassification: "TEST aog_classification",
        priority: "2",
        issueSign: "WWWGUEST",
        packageName: "test package",
        workSteps: [
            {
                description: "AOG DUE TO DAMAGED PAINT",
                headline: "TEST headline",
                sequence: 1,
                workOrderNumber: 4236,
            },
            {
                sequence: 2,
                workOrderNumber: 4236,
                description: "AOG DUE TO DAMAGED SEAT",
            },
        ],
    },
    {
        number: 1234,
        aircraftId: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
        state: "OPEN",
        dueDate: "2023-09-01T06:01:00.000Z",
        defectClassification: "Z",
        ataChapterNumber: "00-00",
        aogClassification: "TEST aog_classification",
        priority: "2",
        issueSign: "WWWGUEST",
        packageName: "test package",
        workSteps: [
            {
                description: "AOG DUE TO DAMAGED PAINT",
                headline: "TEST headline",
                sequence: 1,
                workOrderNumber: 4236,
            },
            {
                sequence: 2,
                workOrderNumber: 4236,
                description: "AOG DUE TO DAMAGED SEAT",
            },
        ],
    },
];

export const Basic: StoryFn = () => <WorkOrdersTable workOrders={workOrders} />;

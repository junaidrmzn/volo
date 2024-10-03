import type { Meta } from "@storybook/react";
import { CardList } from "@volocopter/design-library-react";
import { I18nProvider } from "@voloiq/i18n";
import { ParameterListItem } from "./list/ParameterListItem";

const meta: Meta = {
    title: "Flight Test Instrumentation/Parameter List Item",
    decorators: [
        (Story) => (
            <I18nProvider>
                <CardList>
                    <Story />
                </CardList>
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic = () => (
    <>
        <ParameterListItem
            parameter={{
                id: "123",
                inactive: false,
                status: "DRAFT",
                shortDescription: "Cabin Noise",
                createTime: "2021-09-01T12:00:00Z",
                updateTime: "2021-09-01T12:00:00Z",
                requesterEmail: "",
                requesterName: "",
                aircraftZone: { id: "", createTime: "", updateTime: "", label: "Cockpit & Cabin" },
                workgroup: { id: "", createTime: "", updateTime: "", label: "Flight Test" },
                aircrafts: [
                    {
                        id: "123",
                        aircraftType: "VC2-1",
                        msn: "MSN 001",
                        productLine: "VOLOCITY",
                        status: "CANCELLED",
                    },
                    {
                        id: "234",
                        aircraftType: "VC2-1",
                        msn: "MSN 001",
                        productLine: "VOLOCITY",
                        status: "DRAFT",
                    },
                ],
            }}
        />
        <ParameterListItem
            parameter={{
                id: "123",
                inactive: false,
                status: "DRAFT",
                shortDescription: "A",
                createTime: "2021-09-01T12:00:00Z",
                updateTime: "2021-09-01T12:00:00Z",
                requesterEmail: "",
                requesterName: "",
                aircraftZone: { id: "", createTime: "", updateTime: "", label: "Cockpit & Cabin" },
                workgroup: { id: "", createTime: "", updateTime: "", label: "Flight Test" },
                aircrafts: [
                    {
                        id: "453",
                        aircraftType: "VC2-1",
                        msn: "01",
                        productLine: "VOLOCONNECT",
                        status: "CANCELLED",
                    },
                ],
            }}
        />
        <ParameterListItem
            parameter={{
                id: "123",
                inactive: false,
                status: "DRAFT",
                shortDescription: "B",
                createTime: "2021-09-01T12:00:00Z",
                updateTime: "2021-09-01T12:00:00Z",
                requesterEmail: "",
                requesterName: "",
                aircraftZone: { id: "", createTime: "", updateTime: "", label: "Cockpit & Cabin" },
                workgroup: { id: "", createTime: "", updateTime: "", label: "Flight Test" },
                aircrafts: [
                    {
                        id: "453",
                        aircraftType: "VC2-1",
                        msn: "01",
                        productLine: "VOLOCONNECT",
                        status: "CANCELLED",
                    },
                ],
            }}
        />
    </>
);

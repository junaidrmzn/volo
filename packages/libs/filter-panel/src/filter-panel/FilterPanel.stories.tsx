import type { Meta, StoryFn } from "@storybook/react";
import { Box, Button, Header, HeaderLayout, SideMenuLayout } from "@volocopter/design-library-react";
import { useState } from "react";
import { FilterTags } from "../filter-tags";
import type { FilterPanelProps } from "./FilterPanel";
import { FilterPanel } from "./FilterPanel";
import type { FilterProps, FilterSet } from "./FilterPanelTypes";

const meta: Meta = {
    title: "Filter Panel/Filter Panel",
    component: FilterPanel,
};
export default meta;

type Log = {
    id: string;
    date: string;
    fcSoftware: string;
    remarks?: string;
    isBenchTest: boolean;
    createdOn: string;
    modifiedOn: string;
};

type MainPageContentDummyProps = {
    filters: FilterSet<Log>;
    setFilterObject: (filter: FilterSet<Log>) => void;
};

const MainPageContentDummy: FCC<MainPageContentDummyProps> = (props) => {
    const { children, filters, setFilterObject } = props;
    return (
        <HeaderLayout variant="primary">
            <HeaderLayout.Header>
                <Header.Title parentTitle="Battery" title="EVTOL Battery Creation" />
                <Header.Controls>{children}</Header.Controls>
            </HeaderLayout.Header>
            <HeaderLayout.Content>
                <FilterTags
                    filterSet={filters}
                    onFilterDelete={(filterSet) => setFilterObject(filterSet)}
                    allowDelete
                    listAriaLabel="Filter Tag List"
                />
            </HeaderLayout.Content>
        </HeaderLayout>
    );
};

export const Basic: StoryFn<FilterPanelProps<Log>> = () => {
    const [filterSet, setFilterSet] = useState<FilterSet<Log>>({ filters: [] });
    const [isOpen, setIsOpen] = useState(true);

    const filters: FilterProps<Log>[] = [
        {
            type: "range",
            propertyName: "date",
            fromLabel: "from",
            toLabel: "to",
            displayName: "Flight Date",
            useUtcTime: true,
        },
        {
            type: "numberRange",
            propertyName: "numberRange",
            fromLabel: "min",
            toLabel: "max",
            displayName: "Flight height",
        },
        {
            type: "number",
            propertyName: "pilotAge",
            displayName: "Main pilot age",
        },
        {
            type: "multiSelect",
            propertyName: "fcSoftware",
            options: [
                { label: "VC", value: "VC" },
                { label: "VD", value: "VD" },
            ],
            displayName: "FC Software",
        },
        {
            type: "select",
            propertyName: "remarks",
            options: [
                { label: "VC", value: "VC" },
                { label: "VD", value: "VD" },
            ],
            displayName: "Select Test",
        },
        {
            type: "boolean",
            propertyName: "isBenchTest",
            falseLabel: "False",
            trueLabel: "True",
            neutralLabel: "Neutral",
            displayName: "Is Benchtest",
        },
        {
            type: "boolean",
            propertyName: "isBenchTest2",
            falseLabel: "Flight test",
            trueLabel: "Bench test",
            neutralLabel: "All",
            displayName: "Is Benchtest",
        },
    ];

    return (
        <Box height="90vh">
            <SideMenuLayout openMenuKey={isOpen ? "main" : undefined}>
                <SideMenuLayout.Content>
                    <MainPageContentDummy filters={filterSet} setFilterObject={setFilterSet}>
                        <Button onClick={() => setIsOpen((open) => !open)}>Toggle filter panel</Button>
                    </MainPageContentDummy>
                </SideMenuLayout.Content>
                <SideMenuLayout.Menu menuKey="main">
                    <FilterPanel
                        filters={filters}
                        onChange={setFilterSet}
                        applyButtonLabel="Apply"
                        cancelButtonLabel="Cancel"
                        title="Filter"
                        onCancel={() => setIsOpen(false)}
                        onClose={() => setIsOpen(false)}
                        backButtonAriaLabel="Back"
                        activeFilterSet={filterSet}
                        filterTagListAriaLabel="Filter Tag List"
                    />
                </SideMenuLayout.Menu>
            </SideMenuLayout>
        </Box>
    );
};

export const WithAsyncSelect: StoryFn<FilterPanelProps<Log>> = () => {
    const [filterSet, setFilterSet] = useState<FilterSet<Log>>({ filters: [] });
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        { label: "VC", value: "VC" },
        { label: "VD", value: "VD" },
    ];

    const filters: FilterProps<Log>[] = [
        {
            type: "select",
            propertyName: "fcSoftware",
            asyncSelectCallback: (inputValue, callback) => {
                setTimeout(() => {
                    const values = options.filter((option) =>
                        option.label.toLowerCase().includes(inputValue.toLowerCase())
                    );

                    callback(values);
                }, 2000);
            },
            displayName: "Async Select",
        },
        {
            type: "multiSelect",
            propertyName: "id",
            asyncSelectCallback: (inputValue, callback) => {
                setTimeout(() => {
                    const values = options.filter((option) =>
                        option.label.toLowerCase().includes(inputValue.toLowerCase())
                    );

                    callback(values);
                }, 2000);
            },
            displayName: "Async Multiselect",
        },
    ];

    return (
        <Box height="90vh">
            <SideMenuLayout openMenuKey={isOpen ? "main" : undefined}>
                <SideMenuLayout.Content>
                    <MainPageContentDummy filters={filterSet} setFilterObject={setFilterSet}>
                        <Button onClick={() => setIsOpen(true)}>Open filter panel</Button>
                    </MainPageContentDummy>
                </SideMenuLayout.Content>
                <SideMenuLayout.Menu menuKey="main">
                    <FilterPanel
                        filters={filters}
                        onChange={setFilterSet}
                        applyButtonLabel="Apply"
                        cancelButtonLabel="Cancel"
                        title="Filter"
                        onCancel={() => setIsOpen(false)}
                        onClose={() => setIsOpen(false)}
                        backButtonAriaLabel="Back"
                        activeFilterSet={filterSet}
                        filterTagListAriaLabel="Filter Tag List"
                    />
                </SideMenuLayout.Menu>
            </SideMenuLayout>
        </Box>
    );
};

export const WithInitialValues: StoryFn<FilterPanelProps<Log>> = () => {
    const init: FilterSet<Log> = {
        filters: [
            {
                type: "range",
                fromDate: "",
                toDate: "2022-04-07T10:00:00.000Z",
                propertyName: "date",
                isActive: true,
                displayName: "Fight Date",
            },
            {
                propertyName: "fcSoftware",
                type: "multiSelect",
                values: [
                    {
                        label: "VC",
                        value: "VC",
                    },
                ],
                isActive: true,
                displayName: "FC Software",
            },
            {
                propertyName: "remarks",
                type: "select",
                value: {
                    label: "VC",
                    value: "VC",
                },
                isActive: true,
                displayName: "Select Test",
            },
            {
                type: "boolean",
                propertyName: "isBenchTest",
                value: true,
                isActive: true,
                displayName: "Is Benchtest",
                trueLabel: "True",
                falseLabel: "False",
            },
        ],
    };

    const [filterSet, setFilterSet] = useState<FilterSet<Log>>(init);
    const [isOpen, setIsOpen] = useState(false);

    const filters: FilterProps<Log>[] = [
        {
            type: "range",
            propertyName: "date",
            fromLabel: "from",
            toLabel: "to",
            displayName: "Fight Date",
            useUtcTime: true,
        },
        {
            type: "multiSelect",
            propertyName: "fcSoftware",
            options: [
                { label: "VC", value: "VC" },
                { label: "VD", value: "VD" },
            ],
            displayName: "FC Software",
        },
        {
            type: "select",
            propertyName: "remarks",
            options: [
                { label: "VC", value: "VC" },
                { label: "VD", value: "VD" },
            ],
            displayName: "Select Test",
        },
        {
            type: "boolean",
            propertyName: "isBenchTest",
            falseLabel: "False",
            trueLabel: "True",
            neutralLabel: "Neutral",
            displayName: "Is Benchtest",
        },
        {
            type: "boolean",
            propertyName: "isBenchTest2",
            falseLabel: "Flight test",
            trueLabel: "Bench test",
            neutralLabel: "All",
            displayName: "Is Benchtest",
        },
    ];

    return (
        <Box height="90vh">
            <SideMenuLayout openMenuKey={isOpen ? "main" : undefined}>
                <SideMenuLayout.Content>
                    <MainPageContentDummy filters={filterSet} setFilterObject={setFilterSet}>
                        <Button onClick={() => setIsOpen(true)}>Open filter panel</Button>
                    </MainPageContentDummy>
                </SideMenuLayout.Content>
                <SideMenuLayout.Menu menuKey="main">
                    <FilterPanel
                        filters={filters}
                        onChange={setFilterSet}
                        applyButtonLabel="Apply"
                        cancelButtonLabel="Cancel"
                        title="Filter"
                        onCancel={() => setIsOpen(false)}
                        onClose={() => setIsOpen(false)}
                        backButtonAriaLabel="Back"
                        activeFilterSet={filterSet}
                        filterTagListAriaLabel="Filter Tag List"
                    />
                </SideMenuLayout.Menu>
            </SideMenuLayout>
        </Box>
    );
};

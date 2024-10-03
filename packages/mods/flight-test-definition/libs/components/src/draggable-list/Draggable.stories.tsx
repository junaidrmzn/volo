// eslint-disable-next-line no-restricted-imports
import type { Meta, StoryFn } from "@storybook/react";
import { Box, HStack, Icon } from "@volocopter/design-library-react";
import React from "react";
import { I18nProvider } from "@voloiq/i18n";
import { DraggableList, DraggableListProps } from "./DraggableList";

const meta: Meta = {
    title: "Flight Test Definition/Components/DraggableList",
    component: DraggableList,
    parameters: { actions: { argTypesRegex: "^on.*" } },
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<DraggableListProps<{ id: string }>> = (props) => {
    const [items] = React.useState([{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }]);
    return (
        <DraggableList
            {...props}
            items={items}
            renderListItem={(item, index) => <Box key={index}>{item.id}</Box>}
            onDragEnd={() => {}}
        />
    );
};

export const CustomDragArea: StoryFn<DraggableListProps<{ id: string }>> = (props) => {
    const [items] = React.useState([{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }]);
    return (
        <DraggableList
            {...props}
            items={items}
            onDragEnd={() => {}}
            customDragArea
            renderListItem={(item, index, onDragElement) => (
                <HStack>
                    <Box onPointerDown={onDragElement} cursor="grab">
                        <Icon icon="dragHandle" />
                    </Box>
                    <Box key={index}>{item.id}</Box>
                </HStack>
            )}
        />
    );
};

export const WithVariants: StoryFn<DraggableListProps<{ id: string }>> = (props) => <Basic {...props} />;
WithVariants.args = {
    variants: {
        notDragging: {
            zIndex: 0,
            boxShadow: "none",
        },
        dragging: {
            zIndex: 1,
            boxShadow: "0 5px 25px rgba(0, 0, 0, 0.2)",
        },
    },
};

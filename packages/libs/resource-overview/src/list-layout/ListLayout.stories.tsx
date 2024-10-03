import type { Meta } from "@storybook/react";
import { Box, Button } from "@volocopter/design-library-react";
import { ListLayout } from "./ListLayout";

const meta: Meta = {
    title: "Resource Overview/List Layout",
    component: ListLayout,
};
export default meta;

export const Basic = () => (
    <ListLayout
        title="Flight Test Orders (FTO)"
        description="In this module you find all the Missions for your Regions. You can add new ones or dive deeper into extisting ones. You will see whether your missions are on track or whether they need some action to be taken."
    >
        <ListLayout.ActionButtons>
            <Button>Create new Order</Button>
        </ListLayout.ActionButtons>
        <ListLayout.Body>
            <Box height="500px" width="100%" background="white" />
        </ListLayout.Body>
    </ListLayout>
);

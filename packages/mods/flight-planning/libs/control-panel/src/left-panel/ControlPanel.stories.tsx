import type { Meta } from "@storybook/react";
import { ControlPanel } from "./ControlPanel";
import { routeOption, routes, waypoints } from "./defaultControlPanelProps";

const meta: Meta = {
    title: "Flight Planning/Control Panel/Control Panel",
    component: ControlPanel,
};
export default meta;

const ControlPanelStory = () => {
    return <ControlPanel waypoints={waypoints} routeOption={routeOption} routes={routes} />;
};

export const Basic = () => <ControlPanelStory />;

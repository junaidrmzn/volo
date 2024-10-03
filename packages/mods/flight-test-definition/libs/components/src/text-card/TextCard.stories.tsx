import type { Meta, StoryFn } from "@storybook/react";
import type { TextCardProps } from "./TextCard";
import { TextCard } from "./TextCard";

const meta: Meta = {
    title: "Flight Test Definition/Components/Text Card",
    component: TextCard,
    args: {
        label: "Procedure Detail: Failure Injection",
        text: `- Inject motor(s) failure using FTI's Remote OCP.
- Allow FCS to recover from the failure (<1 sec).
- Following transient recovery from the FCS or a maximum 3 sec delay, the pilot is to re-establish the original flight condition for 10 sec.`,
    },
};
export default meta;

export const Basic: StoryFn<TextCardProps> = (props) => <TextCard {...props} />;

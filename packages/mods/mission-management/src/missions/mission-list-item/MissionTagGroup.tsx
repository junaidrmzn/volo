import { Icon, Tag, TagGroup } from "@volocopter/design-library-react";

export type MissionTagGroupProps = {
    title: string;
    state: boolean | undefined;
};
export const MissionTagGroup = (props: MissionTagGroupProps) => {
    const { title, state } = props;
    return (
        <TagGroup isAttached>
            <Tag colorScheme={state ? "blue" : "warning-subtle"}>{title}</Tag>
            <Tag colorScheme={state ? "blue" : "warning-subtle"}>
                <Icon icon={state ? "check" : "warning"} color={state ? "blue" : "orange"} size={4} />
            </Tag>
        </TagGroup>
    );
};

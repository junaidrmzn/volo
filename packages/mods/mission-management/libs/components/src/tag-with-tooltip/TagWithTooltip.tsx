import { Box, Tag, TagProps, Tooltip, TooltipProps } from "@volocopter/design-library-react";

type PlacementProps = Pick<TooltipProps, "placement">;
type ColorSchemeProps = Pick<TagProps, "colorScheme">;

export type TagWithTooltipProps = {
    tagContent: string;
    tooltipLabel?: string;
} & PlacementProps &
    ColorSchemeProps;

export const TagWithTooltip = (props: TagWithTooltipProps) => {
    const { colorScheme, tooltipLabel, tagContent, placement } = props;

    if (!tooltipLabel) return <Tag colorScheme={colorScheme}>{tagContent}</Tag>;

    return (
        <Tooltip label={tooltipLabel} placement={placement}>
            <Box width="fit-content">
                <Tag colorScheme={colorScheme}>{tagContent}</Tag>
            </Box>
        </Tooltip>
    );
};

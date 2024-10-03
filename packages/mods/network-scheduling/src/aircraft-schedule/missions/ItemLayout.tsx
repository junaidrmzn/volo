import type { FlexProps } from "@volocopter/design-library-react";
import { Box, HStack, Spacer, VStack } from "@volocopter/design-library-react";
import type { PropsWithChildren, ReactElement } from "react";
import { Children, isValidElement } from "react";
import { useScheduleColors } from "../useScheduleColors";

const Header: FCC = () => null;
const Body: FCC = () => null;
const FooterLeft: FCC = () => null;
const FooterRight: FCC = () => null;

export type ItemLayoutProps = PropsWithChildren<{
    widthInPx: number;
}> &
    Pick<FlexProps, "borderWidth" | "borderColor">;

export const ItemLayoutTemplate = (props: ItemLayoutProps) => {
    const { children, widthInPx, borderColor, borderWidth } = props;
    const childrenArray = Children.toArray(children).filter<ReactElement>(isValidElement);
    const header = childrenArray.find((element) => element.type === Header)?.props.children;
    const body = childrenArray.find((element) => element.type === Body)?.props.children;
    const footerLeft = childrenArray.find((element) => element.type === FooterLeft)?.props.children;
    const footerRight = childrenArray.find((element) => element.type === FooterRight)?.props.children;

    const { missionBackgroundColor } = useScheduleColors();

    return (
        <VStack
            backgroundColor={missionBackgroundColor}
            width={`${widthInPx}px`}
            fontSize="xs"
            lineHeight="shorter"
            borderRadius="sm"
            spacing={0.5}
            p={1}
            borderWidth={borderWidth}
            boxSizing="border-box"
            borderColor={borderColor}
            alignItems="stretch"
            height="3.625rem"
        >
            {widthInPx > 32 && (
                <Box fontWeight="medium" width="100%" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                    {header}
                </Box>
            )}
            {widthInPx > 44 && (
                <Box width="100%" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                    {body}
                </Box>
            )}
            <HStack justifyContent="center">
                {widthInPx > 55 && (
                    <>
                        {footerLeft}
                        <Spacer flex={1} />
                    </>
                )}
                {widthInPx > 44 && footerRight}
            </HStack>
        </VStack>
    );
};

export const ItemLayout = Object.assign(ItemLayoutTemplate, { Header, Body, FooterLeft, FooterRight });

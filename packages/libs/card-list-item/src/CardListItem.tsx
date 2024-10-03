import type { CardListItemProps as DLCardListItemProps } from "@volocopter/design-library-react";
import { Card, Grid, GridItem } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import { Children, isValidElement } from "react";
import { useContainerQuery } from "@voloiq/utils";
import type { LayoutPresets } from "./layoutPresets";
import { useGridPropsQuery } from "./useGridPropsQuery";

const Identifier: FCC = () => null;
const AdditionalContent: FCC = () => null;
const Status: FCC = () => null;

export type CardListItemProps = DLCardListItemProps & { layout?: LayoutPresets };
const CardListItemTemplate = (props: CardListItemProps) => {
    const { children, layout = "original", ...cardListItemProps } = props;

    const childrenArray = Children.toArray(children).filter<ReactElement>(isValidElement);
    const identifier = childrenArray.find((child) => child.type === Identifier)?.props.children;
    const additionalContent = childrenArray.find((child) => child.type === AdditionalContent)?.props.children;
    const status = childrenArray.find((child) => child.type === Status)?.props.children;

    const query = useGridPropsQuery(additionalContent !== undefined, layout);
    const [ref, { gridProps, additionalContentProps }] = useContainerQuery(query);

    return (
        <Card as="li" ref={ref} {...cardListItemProps}>
            <Grid rowGap={3} {...gridProps}>
                <GridItem gridArea="identifier">{identifier}</GridItem>
                {additionalContent && (
                    <GridItem
                        gridArea="additional-content"
                        alignSelf="flex-end"
                        display="flex"
                        {...additionalContentProps}
                    >
                        {additionalContent}
                    </GridItem>
                )}
                <GridItem gridArea="status">{status}</GridItem>
            </Grid>
        </Card>
    );
};

export const CardListItem = Object.assign(CardListItemTemplate, {
    Identifier,
    AdditionalContent,
    Status,
});

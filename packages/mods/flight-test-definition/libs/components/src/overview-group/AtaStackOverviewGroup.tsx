import { Accordion, Box } from "@volocopter/design-library-react";
import type { ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";
import { useOverviewGroupTranslation } from "./translations/useOverviewGroupTranslation";

export type AtaStackOverviewGroupProps = {
    groupName?: string;
    children: ReactNode;
    level?: number;
};
export const AtaStackOverviewGroup = (props: AtaStackOverviewGroupProps) => {
    const { children, groupName, level = 1 } = props;
    const { t } = useOverviewGroupTranslation();

    const childrenWithInferredLevel = Children.toArray(children)
        .filter<ReactElement>(isValidElement)
        .map((child) => {
            if (child.type === AtaStackOverviewGroup) {
                return cloneElement(child, {
                    level: level + 1,
                });
            }
            return child;
        });

    return (
        <Box aria-label={t("accordion-box-label")}>
            <Accordion allowMultiple>
                <Accordion.Item>
                    <Accordion.Title title={groupName ?? t("Unknown")} />
                    <Accordion.Content variant="stacked">{childrenWithInferredLevel}</Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </Box>
    );
};

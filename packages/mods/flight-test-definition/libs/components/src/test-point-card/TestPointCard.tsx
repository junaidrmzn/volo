import { Card, ExpandableCard } from "@volocopter/design-library-react";
import type { PropsWithChildren } from "react";
import { TestPointCardGrid, TestPointCardGridProps } from "./TestPointCardGrid";
import { useTestPointCardTranslation } from "./translations/useTestPointCardTranslation";

export type TestPointCardProps = {
    variant?: "solid" | "subtle" | undefined;
    width?: string;
} & TestPointCardGridProps;

export const TestPointCard = (props: PropsWithChildren<TestPointCardProps>) => {
    const { children, width, variant = "solid", ...testPointProps } = props;
    const { t } = useTestPointCardTranslation();

    return children ? (
        <ExpandableCard cardLabel={t("Expand test point card button")} variant="gray">
            <ExpandableCard.Title>
                <TestPointCardGrid {...testPointProps} />
            </ExpandableCard.Title>
            <ExpandableCard.Content>{children}</ExpandableCard.Content>
        </ExpandableCard>
    ) : (
        <Card variant={variant} width={width} py={2} px={4}>
            <TestPointCardGrid {...testPointProps} />
        </Card>
    );
};

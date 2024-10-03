import type { TestPointCardProps } from "@voloiq/flight-test-definition-components";
import { TestPointCard } from "@voloiq/flight-test-definition-components";
import { useSynchronizedScrollElement } from "@voloiq/flight-test-definition-utils";

export type SynchronizedScrollTestPointCardProps = TestPointCardProps;

export const SynchronizedScrollTestPointCard = (props: TestPointCardProps) => {
    const { onScroll, ref } = useSynchronizedScrollElement();

    return (
        <TestPointCard
            variant="subtle"
            width="full"
            {...props}
            testPointParameterContainerRef={ref}
            onScrollTestPointParameterContainer={onScroll}
        />
    );
};

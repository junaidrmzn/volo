import { VStack } from "@volocopter/design-library-react";
import type { TestPoint } from "@voloiq/flight-test-definition-api/v1";
import { SynchronizedScrollProvider } from "@voloiq/flight-test-definition-utils";
import { SynchronizedScrollTestPointCard } from "./SynchronizedScrollTestPointCard";

export type TestPointSectionContentProps = {
    testPoints: TestPoint[];
};

export const TestPointSectionContent = (props: TestPointSectionContentProps) => {
    const { testPoints } = props;

    return (
        <VStack spacing={2}>
            <SynchronizedScrollProvider>
                {testPoints.map((testPoint) => {
                    // TODO: Remove this ugly code (the series of ifs) once the V1 TestPoint model and endpoints are deprecated.
                    const {
                        applicability,
                        id,
                        testPointParameters,
                        centerOfGravity,
                        testPointId,
                        comments,
                        grossWeight,
                        status,
                    } = testPoint;

                    return (
                        <SynchronizedScrollTestPointCard
                            key={id}
                            testPointParameters={testPointParameters}
                            centerOfGravity={centerOfGravity}
                            testPointId={testPointId.split("-").pop() ?? "-"}
                            comments={comments}
                            grossWeight={grossWeight}
                            status={status ?? "IN WORK"}
                            applicabilities={[applicability]}
                        />
                    );
                })}
            </SynchronizedScrollProvider>
        </VStack>
    );
};

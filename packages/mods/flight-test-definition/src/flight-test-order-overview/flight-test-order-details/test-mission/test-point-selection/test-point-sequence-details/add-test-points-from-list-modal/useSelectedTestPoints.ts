import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
    TestPoint,
    getAllTestPointSequenceTestPointAssociationsQueryKey,
    useBulkAssociateTestPointsById,
    useBulkDisassociateTestPointsById,
    useGetAllAssociatedTestPointsQuery,
} from "@voloiq/flight-test-definition-api/v1";

type SelectableTestPoints = {
    [k: string]: TestPoint;
};

export type UseSelectedTestPointsOptions = {
    flightTestOrderId: string;
    testPointSequenceId: string;
};

const getHashmapFromTestPoints = (testPoints: TestPoint[] = []) =>
    Object.fromEntries(testPoints.map((testPoint) => [testPoint.id, testPoint]));

export const useSelectedTestPoints = (options: UseSelectedTestPointsOptions) => {
    const { testPointSequenceId, flightTestOrderId } = options;

    const queryClient = useQueryClient();
    const { associatedTestPoints } = useGetAllAssociatedTestPointsQuery(options);
    const { bulkAssociateTestPointsById, isLoading: isAddAssociationLoading } = useBulkAssociateTestPointsById(options);
    const { bulkDisassociateTestPointsById, isLoading: isDeleteAssociationLoading } =
        useBulkDisassociateTestPointsById(options);
    const [selectedTestPoints, setSelectedTestPoints] = useState<SelectableTestPoints>({});
    const [removedTestPointIds, setRemovedTestPointIds] = useState<Set<string>>(new Set());
    const [addedTestPointIds, setAddedTestPointIds] = useState<Set<string>>(new Set());

    const onSelectTestPoint = (testPoint: TestPoint, isChecked: boolean) => {
        if (isChecked) {
            setAddedTestPointIds((previousState) => new Set([...previousState, testPoint.id]));
            setRemovedTestPointIds((previousState) => new Set([...previousState].filter((id) => id !== testPoint.id)));
        } else {
            setRemovedTestPointIds((previousState) => new Set([...previousState, testPoint.id]));
            setAddedTestPointIds((previousState) => new Set([...previousState].filter((id) => id !== testPoint.id)));
        }

        setSelectedTestPoints((previousState) => {
            if (isChecked) {
                return {
                    ...previousState,
                    [testPoint.id]: testPoint,
                };
            }

            const { [testPoint.id]: _, ...rest } = selectedTestPoints;
            return rest;
        });
    };

    const onSubmitSelectedTestPoints = async () => {
        const operations = [];

        if (addedTestPointIds.size > 0) {
            operations.push(
                bulkAssociateTestPointsById({
                    data: [...addedTestPointIds],
                })
            );
        }

        if (removedTestPointIds.size > 0) {
            operations.push(
                bulkDisassociateTestPointsById({
                    data: [...removedTestPointIds],
                })
            );
        }

        if (operations.length > 0) {
            await Promise.allSettled(operations);
            queryClient.invalidateQueries(
                getAllTestPointSequenceTestPointAssociationsQueryKey(flightTestOrderId, testPointSequenceId)
            );
        }
    };

    useEffect(() => {
        setSelectedTestPoints(getHashmapFromTestPoints(associatedTestPoints));
    }, [associatedTestPoints]);

    return {
        selectedTestPoints: Object.values(selectedTestPoints),
        selectedTestPointIds: Object.keys(selectedTestPoints),
        onSelectTestPoint,
        onSubmitSelectedTestPoints,
        isSubmitLoading: isAddAssociationLoading || isDeleteAssociationLoading,
    };
};

import type { DesirabilityEnum, FTILink, FTILinkInsertBulk } from "@voloiq/flight-test-definition-api/v1";

type SelectedFtiParameter = {
    ftiParameterId: string;
    ftiLinkId?: string;
    isEssential: boolean;
};
type FtiParameterId = string;
export type SelectedFtiParameterMap = Record<FtiParameterId, SelectedFtiParameter>;

export type CalculateFtiLinkSelectionOptions = {
    initialFtiLinks: FTILink[];
    selectedFtiParameterMap: SelectedFtiParameterMap;
};

const getDesirability = (isEssential: boolean): DesirabilityEnum => (isEssential ? "ESSENTIAL" : "DESIRABLE");

export const getDeletedIds = (options: CalculateFtiLinkSelectionOptions) => {
    const { initialFtiLinks, selectedFtiParameterMap } = options;

    const selectedIds: string[] = Object.values(selectedFtiParameterMap)
        .map((selectedFtiParameter) => selectedFtiParameter.ftiParameterId)
        .filter((ftiLinkId): ftiLinkId is string => typeof ftiLinkId === "string");

    const deletedIds = initialFtiLinks
        .filter((initialFtiLink) => !selectedIds?.includes(initialFtiLink.instrumentationId))
        .map((initialFtiLink) => initialFtiLink.id);

    return deletedIds;
};

export const getAddedEntities = (options: CalculateFtiLinkSelectionOptions) => {
    const { selectedFtiParameterMap, initialFtiLinks } = options;
    const initialIds: Set<string> = new Set(initialFtiLinks.map((initialFtiLink) => initialFtiLink.instrumentationId));
    const addedEntities: FTILinkInsertBulk[] = Object.values(selectedFtiParameterMap)
        .filter((selectedFtiParameter) => !initialIds.has(selectedFtiParameter.ftiParameterId))
        .map((selectedFtiParameter) => ({
            instrumentationId: selectedFtiParameter.ftiParameterId,
            desirability: getDesirability(selectedFtiParameter.isEssential),
        }));

    return addedEntities;
};

export const getEditedEntities = (options: CalculateFtiLinkSelectionOptions) => {
    const { initialFtiLinks, selectedFtiParameterMap } = options;

    return Object.values(selectedFtiParameterMap)
        .filter((selectedFtiParameter): selectedFtiParameter is Required<SelectedFtiParameter> => {
            const initialFtiLink = initialFtiLinks.find(
                (initialFtiLink) => initialFtiLink.instrumentationId === selectedFtiParameter.ftiParameterId
            );
            if (initialFtiLink === undefined) {
                return false;
            }
            const wasInitiallyEssential = initialFtiLink.desirability === "ESSENTIAL";
            return wasInitiallyEssential !== selectedFtiParameter.isEssential;
        })
        .map((selectedFtiParameter) => {
            const initialFtiLink = initialFtiLinks.find(
                (initialFtiLink) => initialFtiLink.instrumentationId === selectedFtiParameter.ftiParameterId
            );
            return {
                id: initialFtiLink?.id || "",
                desirability: getDesirability(selectedFtiParameter.isEssential),
            };
        });
};

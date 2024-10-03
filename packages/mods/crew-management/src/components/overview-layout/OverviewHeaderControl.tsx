import { Button } from "@volocopter/design-library-react";
import { useNavigate } from "@voloiq/routing";
import { useIdSelectionContext } from "../../hooks";
import { useFilteringPanelContext } from "../../hooks/filtering";
import { useSortingContext } from "../../hooks/sorting";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";

export type OverviewHeaderControlProps = {
    addButtonLabel?: string;
    editButtonLabel?: string;
    deleteButtonLabel?: string;
    filterButtonLabel?: string;
};

// OverviewHeaderProps are passed via OverviewPageLayout, but the delete property is added in OverviewPageLayoutContent
// if this would be in OverviewHeaderProps, we would need to pass an empty function when rendering OverviewPageLayout
export type OverviewHeaderWithDeleteProps = {
    hideDeleteButton: boolean;
    onDelete: () => void;
    isSortingEnabled?: boolean;
    isFilteringEnabled?: boolean;
} & OverviewHeaderControlProps;

export const OverviewHeaderControl: FCC<OverviewHeaderWithDeleteProps> = (props) => {
    const {
        deleteButtonLabel,
        editButtonLabel,
        addButtonLabel,
        hideDeleteButton = true,
        onDelete,
        isSortingEnabled = false,
        isFilteringEnabled = false,
    } = props;
    const { selectedId } = useIdSelectionContext();
    const { t } = useCrewApiTranslation();
    const navigation = useNavigate();
    const { isSortingPanelShown, setIsSortingPanelShown } = useSortingContext();
    const { isFilteringPanelShown, setIsFilteringPanelShown } = useFilteringPanelContext();

    const selectedHeaderButtons = (
        <>
            {!hideDeleteButton && (
                <Button variant="secondary" onClick={onDelete}>
                    {deleteButtonLabel ?? t("generic.delete button")}
                </Button>
            )}
            <Button
                variant="primary"
                title="Edit chosen crew member"
                onClick={() => {
                    navigation(`edit/${selectedId}`);
                }}
            >
                {editButtonLabel ?? t("generic.edit button")}
            </Button>
        </>
    );

    const defaultHeaderButtons = (
        <>
            <Button
                variant="primary"
                onClick={() => {
                    navigation("create");
                }}
            >
                {addButtonLabel ?? t("generic.add button")}
            </Button>
            {isSortingEnabled && (
                <Button
                    variant="secondary"
                    onClick={() => {
                        setIsSortingPanelShown(!isSortingPanelShown);
                        setIsFilteringPanelShown(false);
                    }}
                >
                    {t("generic.sort button")}
                </Button>
            )}
            {isFilteringEnabled && (
                <Button
                    variant="secondary"
                    onClick={() => {
                        setIsFilteringPanelShown(!isFilteringPanelShown);
                        setIsSortingPanelShown(false);
                    }}
                >
                    {t("generic.filter button")}
                </Button>
            )}
        </>
    );

    return selectedId !== undefined ? selectedHeaderButtons : defaultHeaderButtons;
};

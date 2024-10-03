import { Button } from "@volocopter/design-library-react";
import type { Resource } from "@voloiq/auth";
import { RequirePermissions } from "@voloiq/auth";
import { useNavigate } from "@voloiq/routing";
import { useIdSelectionContext } from "../../hooks";
import { useFilteringPanelContext } from "../../hooks/filtering";
import { useSortingContext } from "../../hooks/sorting";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";

export type OverviewHeaderControlProps = {
    addButtonLabel?: string;
    editButtonLabel?: string;
    deleteButtonLabel?: string;
    isSortingEnabled?: boolean;
    filterButtonLabel?: string;
};

// OverviewHeaderProps are passed via OverviewPageLayout, but the delete property is added in OverviewPageLayoutContent
// if this would be in OverviewHeaderProps, we would need to pass an empty function when rendering OverviewPageLayout
export type OverviewHeaderWithDeleteProps = {
    hideDeleteButton: boolean;
    onDelete: () => void;
    resourceName: Resource;
    isFilteringEnabled?: boolean;
    isSortingEnabled?: boolean;
} & OverviewHeaderControlProps;

export const OverviewHeaderControl: FCC<OverviewHeaderWithDeleteProps> = (props) => {
    const {
        deleteButtonLabel,
        editButtonLabel,
        addButtonLabel,
        hideDeleteButton = false,
        onDelete,
        isFilteringEnabled = false,
        isSortingEnabled = false,
        resourceName,
    } = props;
    const { selectedId } = useIdSelectionContext();
    const { t } = useVertiportTranslation();
    const { isFilteringPanelShown, setIsFilteringPanelShown } = useFilteringPanelContext();
    const navigation = useNavigate();
    const { isSortingPanelShown, setIsSortingPanelShown } = useSortingContext();

    const selectedHeaderButtons = (
        <RequirePermissions resources={[resourceName]} actions={["create", "read", "update", "delete"]}>
            {!hideDeleteButton && (
                <Button variant="secondary" onClick={onDelete}>
                    {deleteButtonLabel ?? t("generic.delete button")}
                </Button>
            )}
            <Button
                variant="primary"
                onClick={() => {
                    navigation(`edit/${selectedId}`);
                }}
            >
                {editButtonLabel ?? t("generic.edit button")}
            </Button>
        </RequirePermissions>
    );

    const defaultHeaderButtons = (
        <RequirePermissions resources={[resourceName]} actions={["create"]}>
            <Button
                variant="primary"
                onClick={() => {
                    navigation("create");
                }}
            >
                {addButtonLabel ?? t("generic.add button")}
            </Button>
            <>
                {resourceName === "Region" ? (
                    <>
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
                ) : null}
            </>
        </RequirePermissions>
    );

    return selectedId !== undefined ? selectedHeaderButtons : defaultHeaderButtons;
};

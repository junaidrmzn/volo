import { AlertStatusIcon } from "@volocopter/design-library-react";
import { CheckList, CheckListCategory } from "@voloiq/network-schedule-management-api/v1";

export type AlertStatusIconWithCategoryProps = {
    checkLists: CheckList[];
    categoryName: CheckListCategory;
};

export const AlertStatusIconWithCategory = (props: AlertStatusIconWithCategoryProps) => {
    const { checkLists, categoryName } = props;

    const itemSeverity = checkLists.find((checkListItem) => checkListItem.name === categoryName)?.severity;
    return (
        <AlertStatusIcon
            variant={
                itemSeverity === "INFO"
                    ? "info"
                    : itemSeverity === "WARNING"
                    ? "warning"
                    : itemSeverity === "ERROR"
                    ? "error"
                    : "neutralSuccess"
            }
            size={4}
        />
    );
};

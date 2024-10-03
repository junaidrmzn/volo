import { Button } from "@volocopter/design-library-react";
import { useGlobalState } from "../global-state/useGlobalState";
import { useResourceSortTranslations } from "./translations/useResourceSortTranslations";

export const SortButton = () => {
    const [state, send] = useGlobalState();
    const { matches } = state;
    const { t } = useResourceSortTranslations();

    const onClick = () =>
        matches({ sort: "closed" })
            ? send([{ type: "UNSELECT" }, { type: "OPEN_SORT" }, { type: "CLOSE_MULTI_PREVIEW" }])
            : send({ type: "CLOSE_SORT" });

    return <Button onClick={onClick}>{t("Sort")}</Button>;
};

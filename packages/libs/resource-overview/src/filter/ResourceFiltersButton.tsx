import { Button } from "@volocopter/design-library-react";
import { useGlobalState } from "../global-state/useGlobalState";
import { useResourceFilterTranslations } from "./translations/useResourceFilterTranslations";

export const FilterButton = () => {
    const [state, send] = useGlobalState();
    const { matches } = state;
    const { t } = useResourceFilterTranslations();

    const onClick = () =>
        matches({ filter: "closed" })
            ? send([{ type: "UNSELECT" }, { type: "OPEN_FILTERS" }, { type: "CLOSE_MULTI_PREVIEW" }])
            : send({ type: "CLOSE_FILTERS" });

    return <Button onClick={onClick}>{t("Filter")}</Button>;
};

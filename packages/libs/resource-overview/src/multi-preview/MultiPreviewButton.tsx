import { Button } from "@volocopter/design-library-react";
import { useGlobalState } from "../global-state/useGlobalState";
import { useResourceMultiPreviewTranslations } from "./translations/useResourceMultiPreviewTranslations";

export const MultiPreviewButton = () => {
    const [state, send] = useGlobalState();
    const {
        matches,
        meta: {
            multiPreview: { getMultiPreviewButtonTitle },
        },
    } = state;

    const { t } = useResourceMultiPreviewTranslations();

    const onClick = () =>
        matches({ multiPreview: "closed" })
            ? send([
                  { type: "OPEN_MULTI_PREVIEW" },
                  { type: "CLOSE_FILTERS" },
                  { type: "CLOSE_PREVIEW" },
                  { type: "UNSELECT" },
              ])
            : send({ type: "CLOSE_MULTI_PREVIEW" });

    return (
        <Button onClick={onClick}>{getMultiPreviewButtonTitle ? getMultiPreviewButtonTitle() : t("Select all")}</Button>
    );
};

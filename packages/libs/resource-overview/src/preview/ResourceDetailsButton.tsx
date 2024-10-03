import { Icon } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useGlobalState } from "../global-state/useGlobalState";
import { PreviewActionButton } from "./PreviewActionButtons";
import { useResourcePreviewTranslations } from "./translations/useResourcePreviewTranslations";

type DetailsButtonProps = {
    variant?: "primary" | "ghost";
};
export const DetailsButton = (props: DetailsButtonProps) => {
    const { variant = "primary" } = props;
    const [state, send] = useGlobalState();
    const { t } = useResourcePreviewTranslations();
    const onClick = () => send({ type: "DETAILS", selectedResourceId: state.context.selectedResourceId });

    return match(variant)
        .with("primary", () => (
            <PreviewActionButton variant="primary" onClick={onClick}>
                {t("Details")}
            </PreviewActionButton>
        ))
        .with("ghost", () => (
            <PreviewActionButton variant="ghost" icon={<Icon icon="infoLight" />} onClick={onClick}>
                {t("Details")}
            </PreviewActionButton>
        ))
        .exhaustive();
};

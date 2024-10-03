import { Button, Icon } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useGlobalState } from "../global-state/useGlobalState";
import { useResourceEditTranslations } from "./translations/useResourceEditTranslations";

type EditButtonProps = {
    variant?: "primary" | "ghost";
};
export const EditButton = (props: EditButtonProps) => {
    const { variant = "ghost" } = props;
    const [state, send] = useGlobalState();
    const { t } = useResourceEditTranslations();
    const onClick = () => send({ type: "EDIT", selectedResourceId: state.context.selectedResourceId });

    return match(variant)
        .with("primary", () => (
            <Button variant="primary" size="md" leftIcon={<Icon icon="edit" size={4} />} onClick={onClick}>
                {t("Edit")}
            </Button>
        ))
        .with("ghost", () => (
            <Button variant="ghost" size="lg" leftIcon={<Icon icon="edit" />} onClick={onClick}>
                {t("Edit")}
            </Button>
        ))
        .exhaustive();
};

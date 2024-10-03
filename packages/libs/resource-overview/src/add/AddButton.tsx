import { Button } from "@volocopter/design-library-react";
import { useGlobalState } from "../global-state/useGlobalState";
import { useResourceAddTranslations } from "./translations/useResourceAddTranslations";

export const AddButton = () => {
    const [state, send] = useGlobalState();
    const { t } = useResourceAddTranslations();
    const {
        meta: {
            add: { getAddTitle },
        },
    } = state;

    const title = getAddTitle ? getAddTitle() : "";

    const onClick = () => send([{ type: "ADD" }, { type: "UNSELECT" }, { type: "CLOSE_PREVIEW" }]);

    return (
        <Button variant="primary" onClick={onClick}>
            {title || t("Add")}
        </Button>
    );
};

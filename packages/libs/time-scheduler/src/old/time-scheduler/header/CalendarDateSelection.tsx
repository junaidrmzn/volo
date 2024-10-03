import { Button, Divider, Icon, Popover, Portal } from "@volocopter/design-library-react";
import { useTranslations } from "../translations/useTranslations";
import { CalendarDateSelectionForm } from "./CalendarDateSelectionForm";

const CalendarDateSelection = () => {
    const { t } = useTranslations();

    return (
        <Popover closeOnBlur={false} placement="auto">
            <Popover.Trigger>
                <Button>
                    <Icon icon="calendar" />
                </Button>
            </Popover.Trigger>
            <Popover.Overlay />
            <Portal>
                <Popover.Content>
                    <Popover.Header title={t("title")} closeButtonAriaLabel={t("closeButton")} />
                    <Divider mb={4} />
                    <CalendarDateSelectionForm />
                </Popover.Content>
            </Portal>
        </Popover>
    );
};

export { CalendarDateSelection };

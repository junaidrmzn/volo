import { PadEventType } from "@voloiq-typescript-api/vertiport-management-types";
import { useMemo } from "react";
import { datetime, object, select, string } from "@voloiq/form";
import { useVertiportTranslation } from "../../../../../../../translations/useVertiportTranslation";

export const usePadEventFormSchema = () => {
    const { t } = useVertiportTranslation();

    const padEventFormSchema = useMemo(
        () =>
            object({
                title: string().required().label(t("fatoStandEvent.model.title")),
                subTitle: string().label(t("fatoStandEvent.model.subTitle")),
                type: select({
                    placeholder: t("generic.dropdown placeholder"),
                    options: [
                        { label: t("fatoStandEvent.types.ACParking"), value: PadEventType.ACPARKING },
                        { label: t("fatoStandEvent.types.General"), value: PadEventType.GENERAL },
                        { label: t("fatoStandEvent.types.PostBuffer"), value: PadEventType.POSTBUFFER },
                        { label: t("fatoStandEvent.types.PreBuffer"), value: PadEventType.PREBUFFER },
                        { label: t("fatoStandEvent.types.Weather"), value: PadEventType.WEATHER },
                    ],
                    errorMessage: t("generic.dropdown error"),
                })
                    .required(t("generic.required error"))
                    .label(t("fatoStandEvent.model.eventType")),
                startTime: datetime()
                    .required(t("generic.required error"))
                    .label(t("fatoStandEvent.model.startDateTime")),
                endTime: datetime()
                    .when("startTime", (startTime, yup) =>
                        yup.min(
                            startTime,
                            t("generic.minDate error", {
                                label: t("fatoStandEvent.model.endDateTime"),
                                minDateLabel: t("fatoStandEvent.model.startDateTime"),
                            })
                        )
                    )
                    .required(t("generic.required error"))
                    .label(t("fatoStandEvent.model.endDateTime")),
            }),
        [t]
    );
    return { padEventFormSchema };
};

export type PadEventFormSchema = ReturnType<typeof usePadEventFormSchema>["padEventFormSchema"];

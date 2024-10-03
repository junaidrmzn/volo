import { match } from "ts-pattern";
import { AnyObjectSchema, ErrorMessageMap, FieldName } from "@voloiq/form";
import { ConnectionTranslationFunction } from "../translations/useConnectionTranslation";
import {
    ARV_VERT_CODE_INCONSISTENT,
    ARV_VERT_NOT_FOUND,
    ARV_VERT_NO_PASSENGER_SERVICE,
    ARV_VERT_NO_SERVICE,
    ARV_VERT_REGION,
    ARV_VERT_VALID_FROM,
    ARV_VERT_VALID_TO,
    CONN_UNQ_NAME,
    DEP_VERT_CODE_INCONSISTENT,
    DEP_VERT_NOT_FOUND,
    DEP_VERT_NO_PASSENGER_SERVICE,
    DEP_VERT_NO_SERVICE,
    DEP_VERT_REGION,
    DEP_VERT_VALID_FROM,
    DEP_VERT_VALID_TO,
    DetailedError,
    UNQ_CONN_VALID_FROM_TO_CATEGORY_DEP_ARV_VERT,
} from "./detailedError";

export type CreateErrorMessageMap<Schema extends AnyObjectSchema> = {
    detailedErrors: DetailedError[];
    isFieldName: (fieldName: unknown) => fieldName is FieldName<Schema>;
    t: ConnectionTranslationFunction;
};

const mapAttribute = (attribute: string) => {
    return match(attribute)
        .with("arrivalVertiportCode", () => "arrivalVertiport")
        .with("departureVertiportCode", () => "departureVertiport")
        .otherwise(() => attribute);
};

export const createErrorMessageMap = <Schema extends AnyObjectSchema>(options: CreateErrorMessageMap<Schema>) => {
    const { detailedErrors, isFieldName, t } = options;
    const errorMessageMap: ErrorMessageMap<Schema> = {};
    const toastErrorMessages = { isUniqueConnectionValidFromToError: false };

    for (const detailedError of detailedErrors) {
        const { attribute: att, key, value } = detailedError;

        const attribute = mapAttribute(att);

        match(key)
            .with(DEP_VERT_NOT_FOUND, () => {
                if (isFieldName(attribute)) {
                    errorMessageMap[attribute] = "";
                }
            })
            .with(ARV_VERT_NOT_FOUND, () => {
                if (isFieldName(attribute)) {
                    errorMessageMap[attribute] = "";
                }
            })
            .with(DEP_VERT_CODE_INCONSISTENT, () => {
                if (isFieldName(attribute)) {
                    errorMessageMap[attribute] = "";
                }
            })
            .with(ARV_VERT_CODE_INCONSISTENT, () => {
                if (isFieldName(attribute)) {
                    errorMessageMap[attribute] = "";
                }
            })
            .with(DEP_VERT_REGION, () => {
                if (isFieldName(attribute)) {
                    const [connection, vertiport, x] = value.split(", ");
                    errorMessageMap[attribute] = t("errorMessages.unspecifiedVertiportRegion", {
                        connection,
                        vertiport,
                        x,
                    });
                }
            })
            .with(ARV_VERT_REGION, () => {
                if (isFieldName(attribute)) {
                    const [connection, vertiport, x] = value.split(", ");
                    errorMessageMap[attribute] = t("errorMessages.unspecifiedVertiportRegion", {
                        connection,
                        vertiport,
                        x,
                    });
                }
            })
            .with(DEP_VERT_VALID_FROM, () => {
                if (isFieldName(attribute)) {
                    const [connection, vertiport, x] = value.split(", ");
                    errorMessageMap[attribute] = t("errorMessages.inconsistentDepArrValidFrom", {
                        connection,
                        vertiport,
                        x,
                    });
                }
            })
            .with(DEP_VERT_VALID_TO, () => {
                if (isFieldName(attribute)) {
                    const [connection, vertiport, x] = value.split(", ");
                    errorMessageMap[attribute] = t("errorMessages.inconsistentDepArrValidTo", {
                        connection,
                        vertiport,
                        x,
                    });
                }
            })
            .with(ARV_VERT_VALID_FROM, () => {
                if (isFieldName(attribute)) {
                    const [connection, vertiport, x] = value.split(", ");
                    errorMessageMap[attribute] = t("errorMessages.inconsistentDepArrValidFrom", {
                        connection,
                        vertiport,
                        x,
                    });
                }
            })
            .with(ARV_VERT_VALID_TO, () => {
                if (isFieldName(attribute)) {
                    const [connection, vertiport, x] = value.split(", ");
                    errorMessageMap[attribute] = t("errorMessages.inconsistentDepArrValidTo", {
                        connection,
                        vertiport,
                        x,
                    });
                }
            })
            .with(DEP_VERT_NO_PASSENGER_SERVICE, () => {
                if (isFieldName(attribute)) {
                    errorMessageMap[attribute] = t("errorMessages.departureVertiportNoPassengerService", {
                        id: value,
                    });
                }
            })
            .with(ARV_VERT_NO_PASSENGER_SERVICE, () => {
                if (isFieldName(attribute)) {
                    errorMessageMap[attribute] = t("errorMessages.arrivalVertiportNoPassengerService", {
                        id: value,
                    });
                }
            })
            .with(CONN_UNQ_NAME, () => {
                if (isFieldName(attribute)) {
                    errorMessageMap[attribute] = t("errorMessages.connectionUniqueName", {
                        name: value,
                    });
                }
            })
            .with(DEP_VERT_NO_SERVICE, () => {
                if (isFieldName(attribute)) {
                    errorMessageMap[attribute] = t("errorMessages.noServiceDepArv", {
                        name: value,
                    });
                }
            })
            .with(ARV_VERT_NO_SERVICE, () => {
                if (isFieldName(attribute)) {
                    errorMessageMap[attribute] = t("errorMessages.noServiceDepArv", {
                        name: value,
                    });
                }
            })
            .with(UNQ_CONN_VALID_FROM_TO_CATEGORY_DEP_ARV_VERT, () => {
                toastErrorMessages.isUniqueConnectionValidFromToError = true;
            })
            .exhaustive();
    }
    return { errorMessageMap, toastErrorMessages };
};

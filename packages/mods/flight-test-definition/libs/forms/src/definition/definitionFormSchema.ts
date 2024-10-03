import { TestTypeEnum } from "@voloiq-typescript-api/ftd-types";
import type { MSNModel, MasterModel } from "@voloiq/flight-test-definition-api/v2";
import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import type { SelectOption } from "@voloiq/form";
import { number, object, select, string, textEditor } from "@voloiq/form";
import type { DefinitionFormTranslationFunction } from "./translations/useDefinitionFormTranslation";

export type CreateDefinitionFormSchemaOptions = {
    t: DefinitionFormTranslationFunction;
    msnOptions: SelectOption<MSNModel>[];
    masterModelOptions: SelectOption<MasterModel>[];
};
export const createDefinitionFormSchema = (options: CreateDefinitionFormSchemaOptions) => {
    const { t, msnOptions, masterModelOptions } = options;
    return object({
        title: string().required().label(t("Title")),
        summary: textEditor({ createImageSource: fileToBase64 }).required().label(t("Summary")),
        scope: textEditor({ createImageSource: fileToBase64 }).required().label(t("Scope")),
        testArticle: textEditor({ createImageSource: fileToBase64 }).label(
            `${t("Test Article.Name")} (${t("Test Article.Subtitle")})`
        ),
        revision: string()
            .required()
            .min(3, t("This value must be x characters", { value: 3 }))
            .max(3, t("This value must be x characters", { value: 3 }))
            .matches(
                /^[A-Z]\d{2}$/,
                t("Invalid Value Error", {
                    field: t("Revision"),
                    pattern: "Should be an uppercase letter followed by two digits!",
                })
            )
            .label(t("Revision")),
        ata: number()
            .required()
            .min(0, t("Minimum Value Error", { field: t("Ata"), min: 0 }))
            .max(999, t("Maximum Value Error", { field: t("Ata"), max: 999 }))
            .label(t("Ata")),
        msn: select({
            placeholder: t("Select Msn"),
            options: msnOptions,
            errorMessage: t("Dropdown Error", { label: "MSN" }),
        })
            .required()
            .label(t("Msn")),
        masterModel: select({
            placeholder: t("Select Master Model"),
            options: masterModelOptions,
            errorMessage: t("Dropdown Error", { label: "Master Model" }),
        })
            .required()
            .label(t("Master Model.Name")),
        model: string().required().label(t("Model")),
        testNumber: number()
            .required()
            .min(0, t("Minimum Value Error", { field: t("Test Number"), min: 0 }))
            .test(
                "simulatorRange",
                t("Simulator Range Error", { field: "Test Number", min: 200, max: 299 }),
                (value, schema) => {
                    if (value) {
                        const { masterModel } = schema.parent;
                        if (["SIMX", "SIMZERO"].includes(masterModel.value)) {
                            return value >= 200 && value <= 299;
                        }
                        return true;
                    }
                    return false;
                }
            )
            .label(t("Test Number")),
        testType: select({
            placeholder: t("Select Test Type"),
            options: [
                { label: t("Test Type.Ground"), value: TestTypeEnum.GROUND },
                { label: t("Test Type.Flight"), value: TestTypeEnum.FLIGHT },
            ],
            errorMessage: t("Dropdown Error", { label: "Test Type" }),
        })
            .required()
            .label(t("Test Type.Name")),
    });
};

export type DefinitionFormSchema = ReturnType<typeof createDefinitionFormSchema>;

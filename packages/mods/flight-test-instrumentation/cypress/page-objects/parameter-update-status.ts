import type { ParameterStatusEnum } from "@voloiq-typescript-api/fti-types";
import { Select } from "./select";

export const ParameterUpdateStatus = {
    multiPreviewPanel: () => cy.findByTestId("multi-preview-sidepanel"),
    updateButton: () => ParameterUpdateStatus.multiPreviewPanel().findByRole("button", { name: /update/i }),
    cancelButton: () => ParameterUpdateStatus.multiPreviewPanel().findByRole("button", { name: /cancel/i }),
    statusSelect: () => ParameterUpdateStatus.multiPreviewPanel().findByLabelText("Status:*"),
    selectStatusByOptionName: (optionName: ParameterStatusEnum) => Select.selectByOptionName("Status:*", optionName),
    confirmModal: () => cy.findByRole("dialog", { name: /confirmation/i }),
    confirmModalConfirmButton: () => ParameterUpdateStatus.confirmModal().findByRole("button", { name: /confirm/i }),
    confirmModalCancelButton: () => ParameterUpdateStatus.confirmModal().findByRole("button", { name: /cancel/i }),
};

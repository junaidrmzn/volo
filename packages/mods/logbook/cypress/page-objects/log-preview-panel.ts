export const LogPreviewPanel = {
    previewPanel: () => cy.findByTestId("preview-sidepanel"),
    analyticsButton: () => LogPreviewPanel.previewPanel().findByRole("button", { name: /analytics/i }),
    detailsButton: () => LogPreviewPanel.previewPanel().findByRole("button", { name: /details/i }),
    deleteButton: () => LogPreviewPanel.previewPanel().findByRole("button", { name: /delete/i }),
    closeButton: () => LogPreviewPanel.previewPanel().findByRole("button", { name: /close preview/i }),

    deleteModal: () => cy.findByRole("dialog"),
    deleteModalDeleteButton: () => LogPreviewPanel.deleteModal().findByRole("button", { name: /delete/i }),
    deleteModalCancelButton: () => LogPreviewPanel.deleteModal().findByRole("button", { name: /cancel/i }),
};

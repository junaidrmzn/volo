export const SoftwareConfigPreviewPanel = {
    previewPanel: () => cy.findByTestId("preview-sidepanel"),
    downloadButton: () => SoftwareConfigPreviewPanel.previewPanel().findByRole("button", { name: /download/i }),
    closeButton: () => SoftwareConfigPreviewPanel.previewPanel().findByRole("button", { name: /close preview/i }),
};

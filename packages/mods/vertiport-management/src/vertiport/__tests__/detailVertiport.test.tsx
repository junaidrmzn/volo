import React from "react";
import { ServiceProvider } from "@voloiq/service";
import { render, screen, waitFor } from "@voloiq/testing";
import { mockedVertiport } from "../../mocks/MockedVertiport";
import { VERTIPORT_MANAGEMENT } from "../../mocks/serviceUrls";
import { VertiportDetail } from "../detail/VertiportDetailTest";

describe("Vertiport edit test", () => {
    const mr = mockedVertiport;
    window.URL.createObjectURL = jest.fn();

    afterEach(() => {
        window.URL.createObjectURL = jest.fn();
    });

    const VertiportDetailViewComponent = () => {
        return (
            <ServiceProvider baseUrl={VERTIPORT_MANAGEMENT}>
                <VertiportDetail key={mr.id} />
            </ServiceProvider>
        );
    };

    it("should render VertiportDetailView without crashing", () => {
        render(<VertiportDetailViewComponent />);
    });

    it("should render Details for current vertiport", async () => {
        render(<VertiportDetailViewComponent />);
        await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());
        const generalTab = screen.getByRole("tab", { name: "General" });
        expect(generalTab).toBeVisible();
    });

    it("should render Assigned ESUs for current Battery", async () => {
        render(<VertiportDetailViewComponent />);
        await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());
        const locationTab = screen.getByRole("tab", { name: "Location" });
        expect(locationTab).toBeVisible();
    });

    it("should render Unassigned ESUs for current Battery", () => {
        render(<VertiportDetailViewComponent />);
        const tabResources = screen.getByText("Resources");
        expect(tabResources).toBeVisible();
    });
});

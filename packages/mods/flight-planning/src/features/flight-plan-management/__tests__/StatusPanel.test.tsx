import { render, screen } from "@voloiq/testing";
import { StatusPanel } from "../components/StatusPanel";

describe("FlightPlan - StatusPanel", () => {
    it("renders and shows green icon when planStage is accepted", async () => {
        render(<StatusPanel planStage="accepted" conflictStatus="no_conflict" />);
        expect(await screen.findByLabelText("green")).toBeVisible();
    });
    it("renders and shows green icon when planStage is completed", async () => {
        render(<StatusPanel planStage="completed" conflictStatus="no_conflict" />);
        expect(await screen.findByLabelText("green")).toBeVisible();
    });
    it("renders and shows green icon when planStage is activated", async () => {
        render(<StatusPanel planStage="activated" conflictStatus="no_conflict" />);
        expect(await screen.findByLabelText("green")).toBeVisible();
    });
    it("renders and shows red icon when planStage is aborted", async () => {
        render(<StatusPanel planStage="aborted" conflictStatus="no_conflict" />);
        expect(await screen.findByLabelText("red")).toBeVisible();
    });
    it("renders and shows red icon when planStage is canceled", async () => {
        render(<StatusPanel planStage="canceled" conflictStatus="no_conflict" />);
        expect(await screen.findByLabelText("red")).toBeVisible();
    });
    it("renders and shows red icon when planStage is rejected", async () => {
        render(<StatusPanel planStage="rejected" conflictStatus="no_conflict" />);
        expect(await screen.findByLabelText("red")).toBeVisible();
    });
    it("renders and shows yellow icon when conflictStatus is conflicting", async () => {
        render(<StatusPanel planStage="rejected" conflictStatus="conflicting" />);
        expect(await screen.findByLabelText("yellow")).toBeVisible();
    });
    it("renders and shows grey icon when planStage is validation-in-progress", async () => {
        render(<StatusPanel planStage="validation-in-progress" conflictStatus="no_conflict" />);
        expect(await screen.findByLabelText("grey")).toBeVisible();
    });
});

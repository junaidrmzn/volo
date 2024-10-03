import { UIWrapperWithMemoryRouter, render, renderWithoutWrapper, screen, userEvent, waitFor } from "@voloiq/testing";
import { VoloIqNavigationBar } from "./VoloIqNavigationBar";

test("User can open submenu and navigate to a different page", async () => {
    render(<VoloIqNavigationBar />);

    expect(window.location.href).toEqual("http://localhost/");
    userEvent.click(screen.getByRole("button", { name: "Resources" }));
    userEvent.click(await screen.findByRole("link", { name: "Aircraft" }));
    expect(window.location.href).toEqual("http://localhost/aircraft-management/aircraft/overview");
});

test("User with all permissions sees all menu items", () => {
    render(<VoloIqNavigationBar />, undefined, ["*"]);

    expect(screen.getByRole("button", { name: "Planning" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Operations" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Flight Test Suite" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Resources" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Locations" })).toBeVisible();
});

test("User with limited permissions sees only menu items they have permission for", async () => {
    render(<VoloIqNavigationBar />, undefined, ["CommercialPlan.read", "Aircraft.read"]);

    userEvent.click(screen.getByRole("button", { name: "Resources" }));
    await waitFor(() => expect(screen.getByRole("link", { name: "Aircraft" })).toBeVisible());
    expect(screen.queryByRole("link", { name: "Aircraft Types" })).not.toBeInTheDocument();

    expect(screen.queryByRole("button", { name: "Operations" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Flight Test Suite" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Locations" })).not.toBeInTheDocument();
});

test("Clicking on documentation button will append current voloiq url", async () => {
    const windowOpenSpy = jest.spyOn(window, "open");
    windowOpenSpy.mockImplementation(jest.fn());

    renderWithoutWrapper(<VoloIqNavigationBar />, {
        wrapper: (props) => (
            <UIWrapperWithMemoryRouter {...props} initialEntries={["/air-operations/mission-management"]} />
        ),
    });
    const documentationButton = await screen.findByRole("button", { name: "Documentation" });
    documentationButton.click();
    expect(windowOpenSpy).toHaveBeenCalledWith("/documentation/air-operations/mission-management", "_blank");
});
